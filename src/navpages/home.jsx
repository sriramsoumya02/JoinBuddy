import React, { Component } from 'react';
import { getAllScreams } from '../services/screamsServices';

import Scream from '../components/scream/scream';

class Home extends Component {
  state = {
    screams: [],
  };
  async componentDidMount() {
    const { data: screams } = await getAllScreams();
    this.setState({ screams });
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-8">
          {this.state.screams.map((val) => (
            <Scream key={val.screamId} scream={val} />
          ))}
        </div>
        <div className="col-sm-4">Profile Section.</div>
      </div>
    );
  }
}

export default Home;
