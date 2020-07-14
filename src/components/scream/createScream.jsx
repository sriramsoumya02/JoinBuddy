import React from 'react';
import { Modal, ToolTip, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Form from '../common/form';
class CreateScream extends Component {
  state = { data: { body: '' }, errrors: {}, showHide: false };
  handleShowModalHide = () => {
    this.setState({ showHide: !this.state.showHide });
  };
  render() {
    const toottipCreate = <Tooltip id="toottipCreate">Create Scream</Tooltip>;
    return (
      <div>
        <OverlayTrigger key="createTooltip" overlay={toottipCreate}>
          <FontAwesomeIcon icon={faPlus} onClick={this.handleShowModalHide} />
        </OverlayTrigger>
        <Modal show={this.state.showHide}></Modal>
      </div>
    );
  }
}

export default CreateScream;
