import React, { Component } from "react";
import "./App.css";
import Web3 from "web3";
import WorkChain from "./ethereum/build/WorkChain.json";
import Search from './components/Search';

const CONTRACT_ADDRESS = "0xCeCAF22e553AB21f60D33108F96f51788C3E6E20";

class App extends Component {
  render() {
    return <div className="App">
        <Search />
    </div>;
  }
}

export default App;
