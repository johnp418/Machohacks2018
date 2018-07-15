import React, { Component } from 'react'
import workChain from '../Web3';

class search extends Component {
  state = {
    searchValue: '',
    searchOption: 'Company',
    result: []
  }

  onChange = (e) => {
    if (e.target.getAttribute('id') === 'searchValue') {
      this.setState({ searchValue: e.target.value });
    } else if (e.target.getAttribute('id') === 'searchOption') {
      this.setState({ searchOption: e.target.value });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchOption === 'Company') {
      // DO COMPANY SEARCH
      
    } else if (this.state.searchOption === 'Individual') {
      // DO PERSON SEARCH
    }
  }

  render() {
    workChain.methods.getCompanies().call().then(data => console.log(data));
    return (
      <div>
        <form onSubmit={e => this.onSubmit(e)}>
          <input id="searchValue" onChange={e => this.onChange(e)} type="text" placeholder="search by company name" />
            <select name="" id="searchOption" onChange={e => this.onChange(e)}>
              <option>Company</option>
              <option>Individual</option>
            </select>
        </form>
      </div>
    )
  }
}

export default search
