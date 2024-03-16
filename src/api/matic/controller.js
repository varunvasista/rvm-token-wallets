const { Web3 } = require('web3');




export const create = ({ body }, res, next) =>{
  //mainnet
  const web3 = new Web3(process.env.POLYGON_URL); // testnet INFURA_URL_TESTNET

  try {

    var new_address = web3.eth.accounts.create();
    res.status(200).json(new_address);
    
  } catch (error) {
    res.status(201).json(error);
  }

}
  

export const balance = ({ params }, res, next) => {
  //mainnet
  const web3 = new Web3(process.env.POLYGON_URL); // testnet INFURA_URL_TESTNET

  const address = params.address;
  web3.eth.getBalance(address)
  .then((balance)=>{
    if (balance > 0) {
      var bal = web3.utils.fromWei(balance,'ether');
      res.status(200).json({
        status: true,
        balance: bal
      });
    } else {
      res.status(200).json({
        status: true,
        balance: "0"
      });
    }

  })
  .catch((err)=>{
    console.log(err);
    res.status(201).json({
      status: false,
      message: 'Invalid Matic Address or Details Not Found'
    });
  });
}
  

export const send = async ({ body }, res, next) => {

  const web3 = new Web3(process.env.POLYGON_URL);
    var fromAddress = body.from;
    var fromPrivateKey = body.privatekey;
    var toAddress = body.to;
    var amount = body.amount;

    web3.eth.getBalance(fromAddress)
    .then(async (balance)=>{
      var bal = web3.utils.fromWei(balance,'ether');
      //console.log(bal);
      if (bal < amount) {
        res.status(201).json({
          status:"error",
          message:"Insufficient funds"
        });
        
      } else {
        var finalamount = web3.utils.toWei(amount,'ether');
        //console.log(finalamount);
        const wallet = web3.eth.accounts.wallet.add(fromPrivateKey);
        const txObject = {
          from: wallet[0].address,
          to: toAddress,
          value: finalamount
        };
    
        const gas = await web3.eth.estimateGas(txObject);
        const gasprice = await web3.eth.getGasPrice();
        const nonce = await web3.eth.getTransactionCount(fromAddress);
    
        txObject.gas = web3.utils.toHex(gas);
        txObject.gasPrice = web3.utils.toHex(gasprice);
        txObject.nonce = nonce;
        const txfee = txObject.gasPrice * txObject.gas;
        txObject.value = finalamount - txfee;
        //console.log(txObject);
        const txReceipt = await web3.eth.sendTransaction(txObject);
    
        const txid = txReceipt.transactionHash;
    
        res.status(200).json({
          status: "success",
          txhash: txid
        });
      }
    })
    .catch((err)=>{
      console.log(err);
      res.status(201).json({
        status: false,
        message: 'Invalid Matic Address or Details Not Found'
      });
    });




  

  }
  