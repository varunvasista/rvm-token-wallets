const TronWeb = require('tronweb');

export const send = async ({ body }, res, next) => {
  //amount of token to send
  let tokenAmount = body.amount;
  let from_Address = body.from;
  let fromPrivatekey = body.privatekey;
  let toAddress = body.to;

  const privateKey = fromPrivatekey;
  const fullNode = process.env.TRX_URL;
  const solidityNode = process.env.TRX_URL;
  const eventServer = process.env.TRX_URL;
  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
  const tokenContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
  try {
    const {abi} = await tronWeb.trx.getContract(tokenContractAddress);
    let contract = await tronWeb.contract(abi.entrys, tokenContractAddress);
    let decimals = await contract.methods.decimals().call();
    //Use call to execute a pure or view smart contract method.
    // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
    let result = await contract.methods.balanceOf(from_Address).call();
    var cbal = result.toString() / 10 ** decimals;
    
    if (cbal >= tokenAmount) {
      var finalAmount = tokenAmount * (10**decimals);

      const rest = await contract.methods.transfer(toAddress, finalAmount).send();
  
      res.status(200).json({ status: "success", txhash: rest })
  
    } else {
  
      res.status(201).json({ status: "error", message: "Insufficient balance" });
  
    }
} catch(error) {
  res.status(200).json({status: "False","error":error});
}



}


export const balance = async ({ params }, res, next) => {

  const privateKey = "8e6bf90fa653b42001824c40d7bee5ecccf00b7d2a5f076aa6174dae5c0992d9";
  const fullNode = process.env.TRX_URL;
  const solidityNode = process.env.TRX_URL;
  const eventServer = process.env.TRX_URL;
  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
  const tokenContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

  try {
    const {
      abi
  } = await tronWeb.trx.getContract(tokenContractAddress);
    let contract = await tronWeb.contract(abi.entrys, tokenContractAddress);
    let decimals = await contract.methods.decimals().call();
    //Use call to execute a pure or view smart contract method.
    // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
    let result = await contract.methods.balanceOf(params.address).call();
    var bal = result.toString() / 10 ** decimals;
    res.status(200).json({status: "True","balance":bal});
} catch(error) {
  res.status(200).json({status: "False","error":error});
}
}

