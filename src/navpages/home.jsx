import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScreams } from '../components/redux/actions/dataActions';

import Scream from '../components/scream/scream';
import Profile from '../navpages/profile';

class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    return (
      <div className="row">
        <div className="col-sm-8">
          {!loading ? (
            screams.map((val) => <Scream key={val.screamId} scream={val} />)
          ) : (
            <div>loading .....</div>
          )}
        </div>
        <div className="col-sm-4">
          <Profile />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ data: state.data });
const mapDispatchToProps = (dispatch) => ({
  getScreams: () => dispatch(getScreams()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
