import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Web3 from "web3";
import WorkChain from "./ethereum/build/WorkChain.json";
import Search from "./components/Search";
import CompanySection from "./views/Company";
import PersonSection from "./views/Employee";
import EmployeeDetail from "./views/EmployeeDetail";

const CONTRACT_ADDRESS = "0xCeCAF22e553AB21f60D33108F96f51788C3E6E20";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Search} />
            <Route path="/company/:companyId" component={CompanySection} />
            <Route exact path="/person" component={PersonSection} />
            <Route exact path="/person/:personId" component={EmployeeDetail} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
