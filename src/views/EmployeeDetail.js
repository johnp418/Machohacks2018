import React, { Component } from "react";
import { Link } from "react-router-dom";
import Contract from "../Contract";

const WorkExperience = ({ experience }) => {
  const companyId = experience["0"];
  const title = experience["1"];
  const description = experience["2"];
  const startDate = experience["3"];
  const endDate = experience["4"];

  return (
    <div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Employer ID</label>
        <div className="col-sm-6">
          <div className="form-control">
            <Link to={`/company/${companyId}`}>{companyId}</Link>
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

      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Start Date</label>
        <div className="col-sm-6">
          <div className="form-control">{startDate}</div>
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-2 col-form-label">End Date</label>
        <div className="col-sm-6">
          <div className="form-control">{endDate}</div>
        </div>
      </div>
    </div>
  );
};

class EmployeeDetail extends Component {
  state = { experienceList: [] };
  async componentDidMount() {
    const {
      match: {
        params: { personId }
      }
    } = this.props;

    // Retrieve work experience count
    const experienceCount = await Contract.methods
      .getEmployeeWorkExperienceCount(personId)
      .call();

    const experiencePromises = [];
    for (let i = 0; i < experienceCount; i += 1) {
      experiencePromises.push(
        Contract.methods.getEmployeeWorkExperienceByIndex(personId, i).call()
      );
    }

    const workExperienceList = await Promise.all(experiencePromises);

    this.setState({ experienceList: workExperienceList });
  }

  render() {
    return (
      <div>
        <div>Work Experience</div>
        {this.state.experienceList.length > 0
          ? this.state.experienceList.map((experience, index) => {
              return (
                <WorkExperience key={`we-${index}`} experience={experience} />
              );
            })
          : "No past work experience"}
      </div>
    );
  }
}

export default EmployeeDetail;
