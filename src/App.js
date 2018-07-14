import React, { Component } from "react";
import "./App.css";

import Web3 from "web3";
import WorkChain from "./ethereum/build/WorkChain.json";

const CONTRACT_ADDRESS = "0x09d118BC732f1d1E43B8292B021bDA1271F1870e";

class App extends Component {
  async componentDidMount() {
    const web3 = new Web3(window.web3.currentProvider);
    console.log("Web3 ", window.web3.currentProvider);

    const workChain = new web3.eth.Contract(
      JSON.parse(WorkChain.interface),
      // Deployed contract address
      CONTRACT_ADDRESS
    );
    console.log("WorkChain ", workChain);

    const companies = await workChain.methods.companyProfiles.call();
    console.log("companies ", companies);
  }

  render() {
    return <div className="App" />;
  }
}

export default App;
