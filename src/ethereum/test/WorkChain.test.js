const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../build/WorkChain.json");

let accounts;
let workChain;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  workChain = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("WorkChain", () => {
  it("deploys a contract", () => {
    assert.ok(workChain.options.address);
  });

  //createCompanyProfile function
  it("Create compnay profile with ID and NAME", async () => {
    const acc = accounts[0];

    await workChain.methods
      //create dummy companyProfile
      .createCompanyProfile(acc, "Amazon")
      .send({ from: accounts[0], gas: "1000000" });
    //check companies
    const companies = await workChain.methods.getCompanies().call();
    assert.equal(companies.length, 1);
    //check companyProfiles
    const companyProfile = await workChain.methods.getCompanyProfile().call();
    assert.equal(companyProfile, acc, "Amazon");
  });

  //addWorkExperience function
  //   it("Add work experience and employer informations", async () => {
  //     const acc = accounts[0];
  //     await workChain.methods
  //       //create dummy companyProfile
  //       .addWorkExperience(
  //         acc,
  //         1,
  //         "Web Developer",
  //         "Senior Developer",
  //         "2015",
  //         "2018"
  //       )
  //       .send({ from: accounts[0] });
  //     const companyProfile = await workChain.methods.addWorkExperience().call();
  //     assert.equal(1, 1, "Web Developer", "Senior Developer", "2015", "2018");
  //   });
});
