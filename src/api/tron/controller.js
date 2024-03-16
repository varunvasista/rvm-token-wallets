const TronWeb = require('tronweb');



export const create = ({ body }, res, next) =>{
//const fullNode = 'https://api.shasta.trongrid.io'; //testnet
const fullNode = process.env.TRX_URL;
const solidityNode = process.env.TRX_URL;
const eventServer = process.env.TRX_URL;
const privateKey = "8e6bf90fa653b42001824c40d7bee5ecccf00b7d2a5f076aa6174dae5c0992d9";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
tronWeb.createAccount().then(data => {
  res.status(200).json({
    address: data.address.base58,
    privatekey: data.privateKey
  });
}).catch();


}


export const balance = ({ params }, res, next) =>{
  const privateKey = "8e6bf90fa653b42001824c40d7bee5ecccf00b7d2a5f076aa6174dae5c0992d9";
  const fullNode = process.env.TRX_URL;
  const solidityNode = process.env.TRX_URL;
  const eventServer = process.env.TRX_URL;
  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
  var balance = tronWeb.trx.getBalance(params.address);
  balance.then(function (result) { var bal = tronWeb.fromSun(result);
  res.status(200).json({status: "True","balance":bal}); });
  //tronWeb.toSun(10); //tron to sun
}


export const send = ({ body }, res, next) =>{
  const privateKey = "8e6bf90fa653b42001824c40d7bee5ecccf00b7d2a5f076aa6174dae5c0992d9";
const fullNode = process.env.TRX_URL;
const solidityNode = process.env.TRX_URL;
const eventServer = process.env.TRX_URL;
  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
  const amount = body.amount;
  const amountfinal = tronWeb.toSun(amount);
  const fromAddress = body.from;
  const fromPrivateKey = body.privatekey;
  const toAddress = body.to;
  
  var balance = tronWeb.trx.getBalance(fromAddress);
  balance.then(function (result) { 
      var bal = tronWeb.fromSun(result);
      if (result >= amountfinal) {
          
          //to, amount, privatekey
          var txx = tronWeb.trx.sendTransaction(toAddress, amountfinal, fromPrivateKey);
          txx.then(function (result) { 
            res.status(200).json({status:"success","txhash":result.txid});
           });
  
      } else {
          res.status(201).json({
              status: "error",
              message: "insufficient balance"
          })
      }
  }).catch(function(error){
    console.log(error);
  });
}
