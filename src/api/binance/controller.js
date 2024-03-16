const { Web3 } = require('web3');
const { setupLoader } = require('@openzeppelin/contract-loader');


export const create = async ({ body }, res, next) =>{
      //mainnet
      const web3 = new Web3(process.env.BSC_URL);
      const loader = setupLoader({ provider: web3 }).web3;
  
      const account = web3.eth.accounts.create();
      res.status(200).json(account);
}


export const balance = async ({ params }, res, next) =>{
  //mainnet
  const web3 = new Web3(process.env.BSC_URL_TESTNET);

  const loader = setupLoader({ provider: web3 }).web3;

  const address = params.address;

  // Get Balance
  let bal = await web3.eth.getBalance(address);
  let balance = web3.utils.fromWei(bal, 'ether');

  res.status(200).json({ balance: balance });
}


export const send = async ({ body }, res, next) =>{

    //mainnet
    const web3 = new Web3(process.env.BSC_URL_TESTNET);

    const loader = setupLoader({ provider: web3 }).web3;

    let fromAddress = body.from;
    let fromPrivateKey = body.privatekey;
    let toAddress = body.to;
    let amount = body.amount;
    let wallet = web3.eth.accounts.wallet.add(fromPrivateKey);

      //balance check

  // Get Balance
  let bal = await web3.eth.getBalance(fromAddress);
  //console.log(bal);
  let balance = web3.utils.fromWei(bal, 'ether');
  //console.log(balance);
  if (balance >= amount) {
      var finalamount = web3.utils.toWei(amount.toString(),'ether');
      const txObject = {
        from: fromAddress,
        to: toAddress,
        value: finalamount
      };
      // The gas price is determined by the last few blocks median gas price.
      const gas = await web3.eth.estimateGas(txObject);
      const gasprice = await web3.eth.getGasPrice();
      const nonce = await web3.eth.getTransactionCount(fromAddress);
      txObject.gas = web3.utils.toHex(gas);
      txObject.gasPrice = web3.utils.toHex(gasprice);
      txObject.nonce = nonce;
      const txfee = txObject.gasPrice * txObject.gas;
      txObject.value = finalamount - txfee;

      const createTransaction = await web3.eth.accounts.signTransaction(
          txObject,
          wallet[0].privateKey
      );

      //console.log(createTransaction);

      // Deploy transaction
      const createReceipt = await web3.eth.sendSignedTransaction(
          createTransaction.rawTransaction
      );

      res.status(200).json({
          "status":"success",
          "txhash":createReceipt.transactionHash
      });

      return createReceipt.transactionHash;

  } else {
      res.status(201).json({
        status:"error",
        message:"Insufficient funds"
      });
  }
}