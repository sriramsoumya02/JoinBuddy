import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faLink,
  faCalendar,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import { uploadImage } from '../components/redux/actions/userActions';
import { connect } from 'react-redux';
class Profile extends Component {
  state = {};
  handleSelectImage = (e) => {
    this.refs.fileUploader.click();
  };
  handleImageUpload = ({ target: { files: images } }) => {
    let image = images[0];
    console.log('imageName', image);
    const formdata = new FormData();
    formdata.append('image', image, image.name);
    this.props.uploadImage(formdata);
  };
  render() {
    // const imgWrapper = {
    //   width: '150px',
    //   height: '150px',
    //   position: 'relative',
    // };
    // const imgContainer = {
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   width: '150px',
    //   height: '150px',
    //   zIndex: 2,
    //   backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // };
    const {
      authenticated,
      loading,
      credentials: { handle, createdAt, imageUrl, bio, website, location },
    } = this.props.user;
    if (!authenticated) {
      return (
        <div className="bg-white text-center py-3">
          <div className="m-3">No profile found, please login again</div>
          <NavLink to="/login" className="btn btn-primary mx-2 ">
            Login
          </NavLink>
          <NavLink to="/signUp" className="btn btn-danger mx-2 ">
            SignUp
          </NavLink>
        </div>
      );
    } else if (loading) {
      return <div className="bg-white text-center py-3"> ....loading </div>;
    }
    return (
      <div className="bg-white text-center py-3">
        <div className="rounded-circle border border-dark imgwrapper m-auto">
          <img src={imageUrl} alt="user" className="rounded-circle" />
          <div
            id="editImage"
            className="text-center text-white"
            onClick={this.handleSelectImage}
          >
            <FontAwesomeIcon icon={faCamera} className="mt-3" />
            <br />
            <span>Upload Image</span>
            <input
              type="file"
              name="file"
              id="files"
              hidden="hidden"
              ref="fileUploader"
              onChange={this.handleImageUpload}
            />
          </div>
        </div>
        <div className="text-primary">@{handle}</div>
        {bio && <div className="text-muted">{bio}</div>}
        {location && (
          <div>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary" />{' '}
            &nbsp;
            {location}
          </div>
        )}
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLink} className="text-primary" /> &nbsp;
            {website}
          </a>
        )}
        <div className="d-block">
          <FontAwesomeIcon icon={faCalendar} className="text-primary" /> &nbsp;
          Joined {'  ' + dayjs(createdAt).format('MMM YYYY')}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  uploadImage: (formdata) => dispatch(uploadImage(formdata)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
