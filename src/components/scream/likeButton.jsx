import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';
const Like = ({ screamId, numberofLikes }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLiked = user.authenticated
    ? user.likes
        .filter((like) => screamId === like.screamId)
        .filter((like) => like.userHandle === user.credentials.handle).length >
      0
      ? true
      : false
    : false;
  let history = useHistory();
  const tooltip = <Tooltip id="tooltip">Likes</Tooltip>;
  return (
    <div className="text-primary">
      <OverlayTrigger key={screamId + 'like'} overlay={tooltip}>
        <FontAwesomeIcon
          icon={isLiked ? faHeartSolid : faHeartRegular}
          onClick={() => {
            !user.authenticated
              ? history.push('/login')
              : isLiked
              ? dispatch(unlikeScream(screamId))
              : dispatch(likeScream(screamId));
          }}
        />
      </OverlayTrigger>
      &nbsp;&nbsp;
      {numberofLikes} Likes
    </div>
  );
};

export default Like;
