import React, { Component } from "react";
import Contract from "../Contract";
import web3 from "../Web3";

const a = {
  description: "Hello",
  employeeId: "0xEaADc8eC0F7d7ca7d545D855bf69c2F4e7594725",
  employerId: "0xB87691395887aF38150F62bcE0Eeef4cD7f65355",
  endDate: "2",
  startDate: "1",
  title: "Software Engineer"
};

class EmployeePage extends Component {
  state = { loading: false, creating: false, form: a };
  async componentDidMount() {
    // Retrieve person's profile based on uri
    const {
      params: { personId }
    } = this.props.match;
  }

  showForm = () => {
    this.setState(prevState => ({ creating: !prevState.creating }));
  };

  onSubmit = async e => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const {
      employeeId,
      employerId,
      title,
      description,
      startDate,
      endDate
    } = this.state.form;

    // TOOD: Add loading
    this.setState({ loading: true });

    await Contract.methods
      .addWorkExperience(
        employeeId,
        employerId,
        title,
        description,
        startDate,
        endDate
      )
      .send({ gas: "1000000", from: accounts[0] });

    // Redirect to user page
    this.props.history.push(`/person/${employeeId}`);
  };

  handleChange = e => {
    e.persist();
    this.setState(prevState => ({
      form: { ...prevState.form, [e.target.name]: e.target.value }
    }));
  };

  render() {
    console.log("Form values ", this.state.form);
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    const {
      employeeId,
      employerId,
      title,
      description,
      startDate,
      endDate
    } = this.state.form;
    return (
      <div>
        <button onClick={this.showForm} className="btn btn-primary">
          {this.state.creating ? "Cancel" : "Add"}
        </button>
        {this.state.creating && (
          <form onSubmit={this.onSubmit}>
            <div className="form-group row">
              <label
                htmlFor="employeeLabelId"
                className="col-sm-2 col-form-label"
              >
                Employee ID
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  name="employeeId"
                  value={employeeId}
                  onChange={this.handleChange}
                  className="form-control"
                  id="employeeLabelId"
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="employerId" className="col-sm-2 col-form-label">
                Employer ID
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  name="employerId"
                  value={employerId}
                  onChange={this.handleChange}
                  className="form-control"
                  id="employerId"
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="titleId" className="col-sm-2 col-form-label">
                Title
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  className="form-control"
                  id="titleId"
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                htmlFor="descriptionId"
                className="col-sm-2 col-form-label"
              >
                Description
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  className="form-control"
                  id="descriptionId"
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="startDateId" className="col-sm-2 col-form-label">
                Start Date
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  name="startDate"
                  value={startDate}
                  onChange={this.handleChange}
                  className="form-control"
                  id="startDateId"
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="endDateId" className="col-sm-2 col-form-label">
                End Date
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  name="endDate"
                  value={endDate}
                  onChange={this.handleChange}
                  className="form-control"
                  id="endDateId"
                />
              </div>
            </div>
            <button className="btn btn-success">Send</button>
          </form>
        )}
      </div>
    );
  }
}

export default EmployeePage;
