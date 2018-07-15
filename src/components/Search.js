import React, { Component } from "react";
import web3 from "../Web3";
import workChain from "../Contract";

const CompanyProfile = ({ profile, onCompanyClick }) => {
  const companyId = profile["0"];
  return (
    <div
      style={{ background: "red" }}
      onClick={() => onCompanyClick(companyId)}
    >
      <label>ID: {companyId}</label>
      <div>{profile["1"]}</div>
    </div>
  );
};

class search extends Component {
  state = {
    searchValue: "",
    searchOption: "Company",
    result: [],
    companyIds: []
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    console.log("Accounts ", accounts);

    const companyIds = await workChain.methods.getCompanies().call();

    this.setState({ companyIds });

    // // pre-populate companies
    // await workChain.methods
    //   .createCompanyProfile(accounts[0], "Amazon")
    //   .send({ from: accounts[0], gas: "1000000" });
    // await workChain.methods
    //   .createCompanyProfile(accounts[1], "Google")
    //   .send({ from: accounts[1], gas: "1000000" });
    // await workChain.methods
    //   .createCompanyProfile(accounts[2], "Microsoft")
    //   .send({ from: accounts[2], gas: "1000000" });
    // await workChain.methods
    //   .createCompanyProfile(accounts[3], "Apple")
    //   .send({ from: accounts[3], gas: "1000000" });
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
      const promises = [];

      this.state.companyIds.map(companyId => {
        console.log("Get ", companyId);
        promises.push(workChain.methods.getCompanyProfile(companyId).call());
      });

      Promise.all(promises).then(profiles => {
        this.setState({
          result: profiles.filter(profile => {
            const companyName = profile["1"].toLowerCase();
            return companyName.indexOf(this.state.searchValue) !== -1;
          })
        });
      });
    } else if (this.state.searchOption === "Individual") {
      // DO PERSON SEARCH
    }
  };

  render() {
    console.log("Company Ides ", this.state.companyIds);

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

        {/* Result list */}
        <div>
          {this.state.result.length > 0 && this.state.searchValue !== ""
            ? this.state.result.map((profile, index) => {
                return (
                  <CompanyProfile
                    key={`profile-${index}`}
                    onCompanyClick={id => {
                      this.props.history.push(`/company/${id}`);
                    }}
                    profile={profile}
                  />
                );
              })
            : "No companies found"}
        </div>
      </div>
    );
  }
}

export default search;
