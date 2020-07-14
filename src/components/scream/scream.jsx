import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Like from './likeButton';
import Comments from './comments';
import Delete from './delete';
class Scream extends Component {
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
    const isDeletable = userHandled === this.props.handle ? true : false;
    return (
      <div className="row bg-white py-2 mb-2">
        <div className="col-sm-2">
          <img src={userImage} alt="UserImage" className="img-fluid" />
        </div>
        <div className="col-sm-10">
          <h4 className="text-primary m-0 p-0">{userHandled}</h4>
          <small className="text-muted">{createdAt}</small>
          <p>{body}</p>
          <div className="d-flex">
            <Like screamId={screamId} numberofLikes={likeCount} />
            &nbsp;&nbsp;&nbsp;
            <Comments screamId={screamId} numberofComments={commentCount} />
            {isDeletable && (
              <Fragment>
                <span>&nbsp;&nbsp;&nbsp;</span> <Delete screamId={screamId} />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ handle: state.user.credentials.handle });
export default connect(mapStateToProps)(Scream);
