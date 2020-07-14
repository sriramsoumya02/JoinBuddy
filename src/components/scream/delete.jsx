import React, { Component } from 'react';
import { Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { deleteScream } from '../redux/actions/dataActions';
class DeleteScream extends Component {
  state = { showHide: false };
  handleShowModalHide = () => {
    this.setState({ showHide: !this.state.showHide });
  };
  render() {
    const tooltip1 = <Tooltip id="tooltip1">Delete</Tooltip>;

    return (
      <div className="text-primary">
        <OverlayTrigger key={this.props.screamId + 'Delete'} overlay={tooltip1}>
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={this.handleShowModalHide}
          />
        </OverlayTrigger>
        <span>&nbsp;&nbsp; Delete</span>
        <Modal
          show={this.state.showHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onClick={this.handleShowModalHide}>
            <Modal.Title id="contained-modal-title-vcenter">
              Are you sure you want to delete this scream ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => this.props.deleteScream(this.props.screamId)}
            >
              Delete
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={this.handleShowModalHide}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  deleteScream: (screamId) => dispatch(deleteScream(screamId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DeleteScream);
