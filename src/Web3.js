import Web3 from "web3";
import WorkChain from "./ethereum/build/WorkChain.json";

const ganache = require("ganache-core");

const CONTRACT_ADDRESS = "0x39C070Ee5D57c0521f1Be53749c8D1024DD3b55a";

const web3 = new Web3(ganache.provider());
// const web3 = new Web3(window.web3.currentProvider);

const workChain = new web3.eth.Contract(
  JSON.parse(WorkChain.interface),
  // Deployed contract address
  CONTRACT_ADDRESS
);
const accounts = 2;

export { workChain, accounts };
