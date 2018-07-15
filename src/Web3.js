import Web3 from "web3";
import WorkChain from "./ethereum/build/WorkChain.json";

const CONTRACT_ADDRESS = "0x6431fd0c29d024c5b04c7dab157fccd329e62e55";

const web3 = new Web3(window.web3.currentProvider);

const workChain = new web3.eth.Contract(
    JSON.parse(WorkChain.interface),
    // Deployed contract address
    CONTRACT_ADDRESS
  );

export default workChain;