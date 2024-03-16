var litecore = require('litecore-lib');
const axios = require('axios')


export const create = ({ body }, res, next) =>{
  var network = litecore.Networks.mainnet;
  var rand_buffer = litecore.crypto.Random.getRandomBuffer(32);
  var hash = litecore.crypto.Hash.sha256(rand_buffer);
  var bn = litecore.crypto.BN.fromBuffer(hash);
  var add = new litecore.PrivateKey(bn, network).toAddress();
  var pk = new litecore.PrivateKey(bn, network);
  var wif = pk.toWIF().toString();
  var address = add.toString();
  var privateKey = pk.toString();
  
  
  res.status(200).json({
      "address": address,
      "privateKey": privateKey,
      "WIF": wif,
      "network": network.name
  });
}


export const balance = ({ params }, res, next) =>{
  var address = params.address;

  var url = "https://api.blockcypher.com/v1/ltc/main/addrs/" + address + "/balance"
  
  axios.get(url)
      .then((response) => {
          res.status(200).json({status:"true",balance:response.data.balance / 1e8});
      });
}


export const send = ({ body }, res, next) =>{

  const fromAddress = body.from;
  const fromPrivateKey = body.privatekey;
  const toAddress = body.to;
  const amount = body.amount;


  const sendLTC = async (fromAddress, fromPrivatekey, recieverAddress, amountToSend) => {
    const coin = "ltc";
    const network = "main" //main or test
    const privateKey = fromPrivatekey;
    const sourceAddress = fromAddress;
    const satoshiToSend = Math.floor(Number(amountToSend * 100000000));
    let fee = 0;
    let inputCount = 0;
    let outputCount = 2;
    const utxos = await axios.get(
        `https://api.blockcypher.com/v1/${coin}/${network}/addrs/${sourceAddress}?unspentOnly=true&includeScript=true`
    );
    const transaction = new litecore.Transaction();
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


        transactionSize = inputCount * 148 + outputCount * 34 + 10 - inputCount;
        // Check if we have enough funds to cover the transaction and the fees assuming we want to pay 20 satoshis per byte


        const bodyfee = await axios.get(`http://api.blockcypher.com/v1/${coin}/${network}`);

        const feeperbyte = bodyfee.data.medium_fee_per_kb / 1024;

        //console.log(feeperbyte)

        fee = Math.floor(Number(transactionSize * feeperbyte));
        //console.log(fee + "   " + transactionSize)
        var finalamount = satoshiToSend - fee;
        //console.log(finalamount)
        if (totalAmountAvailable - satoshiToSend < 0) {
            res.status(201).json({
              status:"error",
              message:"balance too low for this tx"
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
                url: `https://api.blockcypher.com/v1/ltc/main/txs/push`,
                data: {
                    tx: serializedTransaction,
                },
            });

            res.status(200).json({status:"success", "txhash": result.data.tx.hash })
            return result.data.tx.hash;

        }

    }
};


sendLTC(fromAddress, fromPrivateKey, toAddress, amount)
}
