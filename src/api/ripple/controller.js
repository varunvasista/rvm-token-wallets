const xrpl = require("xrpl");

export const create = async ({ body }, res, next) =>{

    const wallet = xrpl.Wallet.generate();
    res.status(200).json({
      'address': wallet.classicAddress,
      'secret': wallet.seed
  });

}


export const balance = async ({ params }, res, next) =>{
  const myAddress = params.address;
  // Define the network client
  const client = new xrpl.Client(process.env.XRP_URL);
  await client.connect();

    // Get info from the ledger about the address
    await client.request({
      "command": "account_info",
      "account": myAddress,
      "ledger_index": "current"
    }).then((info)=>{
      
      const xrpBalance = xrpl.dropsToXrp(info.result.account_data.Balance);
      if (xrpBalance > 10) {

        console.log(info);
        const basexrpreserve = 10;
        const baseincxrp = 2;
        const totalreserve = basexrpreserve + (info.result.account_data.OwnerCount * baseincxrp);
        const finalbalance = xrpBalance - totalreserve;
        res.status(200).json({ "status": "success", "reserve":totalreserve,"amount": finalbalance });
        
      } else if(xrpBalance <= 10){
          res.status(200).json({ "status": "success", "reserve":Math.round(xrpBalance), "amount": 0 });
      }else{
          res.status(200).json({ "status": "success", "reserve":0, "amount": xrpBalance });
      }
    })
    .catch((error)=>{
      if (error.data.error == 'actNotFound') {
        const xrpBalance = 0;
        res.status(200).json({ "status": "success", "reserve":0, "amount": xrpBalance });
      } else if(error.data.error == 'actMalformed'){
        res.status(201).json({ "status": "error", "message": "Invalid XRP Account"});
      }else{
        res.status(201).json({ "status": "error", "message": "Something went wrong! try again"});
      }
    });

  // Disconnect when done (If you omit this, Node.js won't end the process)
  await client.disconnect()
}


export const send = async ({ body }, res, next) =>{
//address and secret key

let address = body.from;
let secret = body.privatekey;
let toAddress = body.to;
let amount = body.amount;

// Define the network client
const client = new xrpl.Client(process.env.XRP_URL);
await client.connect();


    // Get info from the ledger about the address 
    await client.request({
      "command": "account_info",
      "account": address,
      "ledger_index": "current"
    }).then(async (info)=>{
      const xrpBalance = xrpl.dropsToXrp(info.result.account_data.Balance);
      //console.log(xrpBalance);
      var balance;

      if (xrpBalance > 10) {
        const basexrpreserve = 10;
        const baseincxrp = 2;
        const totalreserve = basexrpreserve + (info.result.account_data.OwnerCount * baseincxrp);
        const finalbalance = xrpBalance - totalreserve;
        balance = finalbalance;
      } else{
          balance = 0;
      }
      if (balance >= amount) {
        const wallet1 = xrpl.Wallet.fromSeed(secret);
        //console.log(wallet);

          // Prepare transaction -------------------------------------------------------
  const prepared = await client.autofill({
    "TransactionType": "Payment",
    "Account": wallet1.classicAddress,
    "Amount": xrpl.xrpToDrops(amount),
    "Destination": toAddress
  });
  const max_ledger = prepared.LastLedgerSequence;
  //console.log("Prepared transaction instructions:", prepared);
  // console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP");
  // console.log("Transaction expires after ledger:", max_ledger);
  
  // Sign prepared instructions ------------------------------------------------
  const signed = wallet1.sign(prepared);
  //console.log("Identifying hash:", signed.hash)
  // console.log("Signed blob:", signed.tx_blob)

    // Submit signed blob --------------------------------------------------------
    const tx = await client.submitAndWait(signed.tx_blob);
    console.log(tx);
    if (tx.result.meta.TransactionResult == "tesSUCCESS") {
      res.status(200).json({ "status": "success", "txhash": tx.result.hash })
    } else {
      res.status(201).json({ "status": "error", "message": "Something went wrong! try again"});
    }


      } else {
        res.status(201).json({
          status:"error",
          message:"Insufficient funds"
      });
      }
      
    })
    .catch((error)=>{
      if (error.data.error == 'actNotFound') {
        const xrpBalance = 0;
        res.status(200).json({ "status": "success", "amount": xrpBalance });
      } else if(error.data.error == 'actMalformed'){
        res.status(201).json({ "status": "error", "message": "Invalid XRP Account"});
      }else{
        res.status(201).json({ "status": "error", "message": "Something went wrong! try again"});
      }
    });

  // Disconnect when done (If you omit this, Node.js won't end the process)
  await client.disconnect();


}
