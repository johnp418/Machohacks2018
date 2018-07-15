import web3 from "./Web3";
import WorkChain from "./ethereum/build/WorkChain.json";

const CONTRACT_ADDRESS = "0x872d200d1587d131f2A10873227a024edf0690b9";

const workChain = new web3.eth.Contract(
  JSON.parse(WorkChain.interface),
  // Deployed contract address
  CONTRACT_ADDRESS
);

export default workChain;
