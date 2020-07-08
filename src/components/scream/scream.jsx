import React, { Component } from 'react';
class Scream extends Component {
  state = {};

  render() {
    const {
      body,
      screamId,
      commentCount,
      likeCount,
      userImage,
      createdAt,
      userHandled,
    } = this.props.scream;
    return (
      <div className="row bg-white py-2 mb-2">
        <div className="col-sm-2">
          <img src={userImage} alt="UserImage" className="img-fluid" />
        </div>
        <div className="col-sm-10">
          <h4 className="text-primary m-0 p-0">{userHandled}</h4>
          <small className="text-muted">{createdAt}</small>
          <p>{body}</p>
        </div>
      </div>
    );
  }
}

export default Scream;
