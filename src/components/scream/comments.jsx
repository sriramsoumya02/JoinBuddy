import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
const Comments = ({ screamId, numberofComments }) => {
  const tooltip = <Tooltip id="tooltip">Comments</Tooltip>;
  return (
    <div className="text-primary">
      <OverlayTrigger key={screamId} overlay={tooltip}>
        <FontAwesomeIcon icon={faComment} />
      </OverlayTrigger>
      &nbsp;&nbsp;
      {numberofComments} Comments
    </div>
  );
};

export default Comments;
