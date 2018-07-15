import React, { Component } from "react";
import { Link } from "react-router-dom";
import Contract from "../Contract";
import web3 from "../Web3";

class Request extends Component {
  state = { loading: false };

  onApprove = async (companyId, requestIndex) => {
    this.setState({ loading: true });
    const accounts = await web3.eth.getAccounts();
    await Contract.methods
      .verify(companyId, requestIndex)
      .send({ gas: "1000000", from: accounts[0] });
    this.setState({ loading: false });
  };

  render() {
    const { request, index } = this.props;
    const employeeId = request["0"];
    const companyId = request["1"];
    const title = request["2"];
    const description = request["3"];
    if (this.state.loading) {
      return <div>Loading..</div>;
    }
    return (
      <div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Employee ID</label>
          <div className="col-sm-6">
            <div className="form-control">
              <Link to={`/person/${employeeId}`}>{employeeId}</Link>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-6">
            <div className="form-control">{title}</div>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-6">
            <div className="form-control">{description}</div>
          </div>
        </div>

        <button
          onClick={() => {
            this.onApprove(companyId, index);
          }}
          className="btn btn-success"
        >
          Approve
        </button>
        <button className="btn btn-danger">Reject</button>
      </div>
    );
  }
}

class CompanyPage extends Component {
  state = { name: "", requests: [] };

  async componentDidMount() {
    const {
      params: { companyId }
    } = this.props.match;

    const companyProfile = await Contract.methods
      .getCompanyProfile(companyId)
      .call();

    // Set name of the page
    this.setState({ name: companyProfile["1"] });

    const requestsCount = await Contract.methods
      .getCompanyPendingRequestCount(companyId)
      .call();

    const requestsPromise = [];

    // Retrieve all pending requests for the company
    for (let i = 0; i < requestsCount; i += 1) {
      requestsPromise.push(
        Contract.methods.getCompanyPendingRequestByIndex(companyId, i).call()
      );
    }

    const pendingRequests = await Promise.all(requestsPromise);

    console.log("Pending Req", pendingRequests);
    this.setState({ requests: pendingRequests });
  }

  render() {
    const {
      params: { companyId }
    } = this.props.match;
    console.log("Match ", companyId);

    if (!this.state.name) {
      return <div>There is no company registered</div>;
    }

    return (
      <div>
        <div>Company: {this.state.name}</div>
        {this.state.requests.length > 0 ? (
          this.state.requests.map((request, index) => {
            return (
              <Request
                key={`request-${index}`}
                index={index}
                request={request}
              />
            );
          })
        ) : (
          <div>There are no pending requests for this company</div>
        )}
      </div>
    );
  }
}

export default CompanyPage;
