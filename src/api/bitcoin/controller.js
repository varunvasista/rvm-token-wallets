var bitcore = require('bitcore-lib');
const axios = require('axios');

//create bitcoin address
export const create = ({ body }, res, next) => {
  console.log("HELLO");
  var network = bitcore.Networks.mainnet;
  var rand_buffer = bitcore.crypto.Random.getRandomBuffer(32);
  var hash = bitcore.crypto.Hash.sha256(rand_buffer);
  var bn = bitcore.crypto.BN.fromBuffer(hash);
  var add = new bitcore.PrivateKey(bn, network).toAddress();
  var pk = new bitcore.PrivateKey(bn, network);
  var wif = pk.toWIF().toString();
  var address = add.toString();
  var privateKey = pk.toString();

  res.status(200).json({
      Address: address,
      PrivateKey: privateKey,
      WIF: wif,
      Network: network.name
  });
}

//check bitcoin balance
export const balance = ({params}, res, next) => {
  var address = params.address;

  console.log(address);

var url = "https://api.blockcypher.com/v1/btc/main/addrs/" + address + "/balance";

axios.get(url)
    .then((response) => {
        res.status(200).json({
            "address": response.data.address,
            "balance": (response.data.final_balance) / 1e8,

        });
    });
}

//send bitcoin

export const send = ({ body }, res, next) => {

  const fromAddress = body.from;
  const fromPrivateKey = body.privatekey;
  const toAddress = body.to;
  const amount = body.amount;
  

  const sendBTC = async (fromAddress, privatekey, recieverAddress, amountToSend) => {
    const coin = "btc";
    const network = "main" //main or test3
    const privateKey = privatekey;
    const sourceAddress = fromAddress;
    const satoshiToSend = Math.floor(Number(amountToSend * 100000000));
    let fee = 0;
    let inputCount = 0;
    let outputCount = 2;
    const utxos = await axios.get(
        `https://api.blockcypher.com/v1/${coin}/${network}/addrs/${sourceAddress}?unspentOnly=true&includeScript=true`
    );

    const transaction = new bitcore.Transaction();
      let totalAmountAvailable = 0;

      let inputs = [];

      if (utxos.data.txrefs == undefined || utxos.data.final_balance < satoshiToSend) {

          // if unspent outputs are not available

          res.status(201).json({
              status: "error",
              message: "Insufficient funds or please try again later"
          })

      } else {

          // if unspent outputs are available

          utxos.data.txrefs.forEach(async (element) => {
              let utxo = {};
              utxo.satoshis = Math.floor(Number(element.value));
              utxo.script = element.script;
              utxo.address = utxos.data.address;
              utxo.txId = element.tx_hash;
              utxo.outputIndex = element.tx_output_n;
              totalAmountAvailable += utxo.satoshis;
              inputCount += 1;
              inputs.push(utxo);
          });


          var transactionSize = inputCount * 148 + outputCount * 34 + 10 - inputCount;
          // Check if we have enough funds to cover the transaction and the fees assuming we want to pay 20 satoshis per byte


          const bodyfee = await axios.get(`http://api.blockcypher.com/v1/${coin}/${network}`);

          const feeperbyte = bodyfee.data.low_fee_per_kb / 1024;

          //console.log(feeperbyte)

          fee = Math.floor(Number(transactionSize * feeperbyte));

          //console.log(fee + "   " + transactionSize)
          var finalamount = satoshiToSend - fee;

          //console.log(finalamount)
          if (totalAmountAvailable - satoshiToSend < 0) {
            res.status(201).json({
              status: "error",
              message: "Insufficient funds"
            });
          } else {

              //Set transaction input
              transaction.from(inputs);

              // set the recieving address and the amount to send
              transaction.to(recieverAddress, finalamount);

              // Set change address - Address to receive the left over funds after transfer
              transaction.change(sourceAddress);

              //manually set transaction fees: 20 satoshis per byte
              transaction.fee(fee);

              // Sign transaction with your private key
              transaction.sign(privateKey);

              // serialize Transactions
              const serializedTransaction = transaction.serialize();
              // Send transaction
              const result = await axios({
                  method: "POST",
                  url: `https://api.blockcypher.com/v1/btc/${network}/txs/push`,
                  data: {
                      tx: serializedTransaction,
                  },
              });

              res.status(200).json({ status: "success","txhash": result.data.tx.hash })
              return result.data.tx.hash;
          }

      }

};


sendBTC(fromAddress, fromPrivateKey, toAddress, amount);



}