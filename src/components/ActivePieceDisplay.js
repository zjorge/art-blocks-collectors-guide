import React from 'react';
import {artblocksUrl} from './consts';
import './ActivePieceDisplay.css';
import projectMap from './utils/projectMap';
import FeaturesDisplay from './FeaturesDisplay';

function ActivePieceDisplay({activeToken, setActiveToken}) {
  if (!activeToken) {
    return null;
  }
  
  return (
    <div className="active-piece-container">
      <div className="active-piece-card">
        <div
          onClick={() => setActiveToken(null)}
          className="exit-button"
        >
          X
        </div>
        <div className="iframe-container">
          <iframe
            title={activeToken.id}
            src={`${artblocksUrl}/generator/${activeToken.id}`}
          />
        </div>
        <FeaturesDisplay
          features={projectMap[33].featureScript(activeToken.hash)}
        />
      </div>
    </div>
  );

}

export default ActivePieceDisplay;
