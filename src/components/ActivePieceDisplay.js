import React from 'react';
import {artblocksUrl} from './consts';
import './ActivePieceDisplay.css';

function ActivePieceDisplay({activeToken}) {
  if (!activeToken) {
    return null;
  }

  return (
    <div className="active-piece-container">
      <div className="iframe-container">
        <iframe
          src={`${artblocksUrl}/generator/${activeToken.id}`}
        />
      </div>
      <div>test</div>
    </div>
  );

}

export default ActivePieceDisplay;
