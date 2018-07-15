import React, { Component } from "react";
import { workChain, accounts } from "../Web3";

console.log(workChain, accounts);
class search extends Component {
  state = {
    searchValue: "",
    searchOption: "Company",
    result: []
  };

  async componentDidMount() {
    // pre-populate companies
    await workChain.methods
      .createCompanyProfile(accounts[0], "Amazon")
      .send({ from: accounts[0], gas: "1000000" });
    await workChain.methods
      .createCompanyProfile(accounts[1], "Google")
      .send({ from: accounts[1], gas: "1000000" });
    await workChain.methods
      .createCompanyProfile(accounts[2], "Microsoft")
      .send({ from: accounts[2], gas: "1000000" });
    await workChain.methods
      .createCompanyProfile(accounts[3], "Apple")
      .send({ from: accounts[3], gas: "1000000" });
  }

  onChange = e => {
    if (e.target.getAttribute("id") === "searchValue") {
      this.setState({ searchValue: e.target.value });
    } else if (e.target.getAttribute("id") === "searchOption") {
      this.setState({ searchOption: e.target.value });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.searchOption === "Company") {
      // DO COMPANY SEARCH
    } else if (this.state.searchOption === "Individual") {
      // DO PERSON SEARCH
    }
  };

  render() {
    workChain.methods
      .getCompanies()
      .call()
      .then(data => console.log(data));
    return (
      <div>
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            id="searchValue"
            onChange={e => this.onChange(e)}
            type="text"
            placeholder="search by company name"
          />
          <select name="" id="searchOption" onChange={e => this.onChange(e)}>
            <option>Company</option>
            <option>Individual</option>
          </select>
        </form>
      </div>
    );
  }
}

export default search;
