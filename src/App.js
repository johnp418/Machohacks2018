import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Web3 from "web3";
import WorkChain from "./ethereum/build/WorkChain.json";
import Search from "./components/Search";

const CONTRACT_ADDRESS = "0xCeCAF22e553AB21f60D33108F96f51788C3E6E20";

const CompanyPage = ({ match }) => {
  const {
    params: { companyId }
  } = match;
  console.log("Match ", match);
  return <div>Company ({companyId}) page</div>;
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route path="/" component={Search} />
            <Route path="/:companyId" component={CompanyPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
