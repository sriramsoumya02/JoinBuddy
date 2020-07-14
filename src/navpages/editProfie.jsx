import React from 'react';
import Joi from 'joi';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Form from '../components/common/form';
import { editUserData } from '../components/redux/actions/userActions';
class EditProfile extends Form {
  state = {
    data: { bio: '', location: '', website: '' },
    errors: {},
    showHide: false,
  };
  schema = {
    bio: Joi.string().allow('').label('Bio'),
    location: Joi.string().allow('').label('Location'),
    website: Joi.string().allow('').label('Website'),
  };
  mapUserDetailsToState = (credentials) => {
    this.setState({
      data: {
        bio: credentials.bio ? credentials.bio : '',
        website: credentials.website ? credentials.website : '',
        location: credentials.location ? credentials.location : '',
      },
    });
  };
  componentDidMount() {
    const { credentials } = this.props.user;
    this.mapUserDetailsToState(credentials);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  doSubmit = (e) => {
    console.log(' editProfile request started', this.state.data);
    let data = {};
    Object.keys(this.state.data).forEach((key) => {
      if (this.state.data[key] !== '') data[key] = this.state.data[key];
    });
    console.log('Object.keys(data)', Object.keys(data).length);
    if (Object.keys(data).length > 0) {
      this.props.editUserData(this.state.data);
    } else {
      this.setState({ errors: { general: 'Please Fill Atleast One Value' } });
    }
  };
  handleShowModalHide = () => {
    this.setState({ showHide: !this.state.showHide });
  };
  render() {
    return (
      <div>
        <FontAwesomeIcon
          icon={faPencilAlt}
          onClick={this.handleShowModalHide}
        />
        <Modal
          show={this.state.showHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onClick={this.handleShowModalHide}>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit your details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput(
                'bio',
                'Bio',
                'bio',
                'Write about you',
                'textArea'
              )}
              {this.renderInput(
                'website',
                'Website',
                'website',
                'Enter websitename'
              )}
              {this.renderInput(
                'location',
                'Location',
                'location',
                'Enter location'
              )}
              {this.renderSubmit('Save')}
              <br />
              {this.state.errors.general && (
                <small className="text-danger mt-2">
                  {this.state.errors.general}
                </small>
              )}
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  UI: { loading: false },
});
const mapDispatchToProps = (dispatch) => ({
  editUserData: (userData) => dispatch(editUserData(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
