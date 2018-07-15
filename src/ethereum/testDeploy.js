const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const compiledFactory = require("./build/WorkChain.json");

const web3 = new Web3(ganache.provider());

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();
