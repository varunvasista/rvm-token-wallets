const solanaWeb3 = require('@solana/web3.js');
const base58 = require('bs58');


export const create = ({ body }, res, next) => {
//mainnet
const connection = new solanaWeb3.Connection(process.env.SOL_URL); 
//testnet
//const connection = new solanaWeb3.Connection(process.env.SOL_URL_TESTNET); 

var account = solanaWeb3.Keypair.generate();

var address = account.publicKey.toBase58();

var secret = account.secretKey;

var privatekey = base58.encode(secret);



res.status(200).json({
    "address": address,
    "privatekey": privatekey
})
}

export const balance = ({ params }, res, next) =>{
//mainnet
const connection = new solanaWeb3.Connection(process.env.SOL_URL); 

  var pubkey = new solanaWeb3.PublicKey(params.address)
  
  connection.getBalance(pubkey)
      .then(balance => {
          res.status(200).json({status: "true", "balance": (balance / 10 ** 9) })
      })
      .catch(error => {
          res.status(201).json({status:"error",message:error})
      })
}


export const send = ({ body }, res, next) =>{
//mainnet
const connection = new solanaWeb3.Connection(process.env.SOL_URL);

var fromAddress = body.from;
var fromPrivatekey = base58.decode(body.privatekey).toJSON().data;
var toAddress = body.to;

var fromPubkey = new solanaWeb3.PublicKey(fromAddress)
var fromSecretKey = Uint8Array.from(fromPrivatekey)

var toPubkey = new solanaWeb3.PublicKey(toAddress)

var sendingamount = body.amount

var txfee = 0.000005

var amount = (sendingamount - txfee) * (10 ** 9) //fee deduct and convert to sol from lamports

//var account = new solanaWeb3.Account(fromSecretKey);

var account = solanaWeb3.Keypair.fromSecretKey(fromSecretKey)

connection.getBalance(account.publicKey)
    .then(async (balance) => {
        var sols = (balance / 10 ** 9)
        if (sols >= sendingamount) {

            const instruction = solanaWeb3.SystemProgram.transfer({
                fromPubkey: account.publicKey,
                toPubkey: toPubkey,
                lamports: amount
            });

            const transaction = new solanaWeb3.Transaction();
            transaction.add(instruction);
            transaction.feePayer = account.publicKey
            let hash = await connection.getRecentBlockhash();
            //console.log("blockhash", hash);
            transaction.recentBlockhash = hash.blockhash;
            transaction.sign(account);

            await connection.sendRawTransaction(transaction.serialize())
                .then(txhash => {
                    res.status(200).json({status: "success", "txhash": txhash });
                })
                .catch(error => {
                    res.status(201).json({error})
                });
        } else {
            res.status(201).json({message: "Insufficent funds"})
        }
    })
    .catch(error => {
      res.status(201).json(error)
    });
}
