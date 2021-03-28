import React from 'react';
import {artblocksUrl} from './consts';
import './ActivePieceDisplay.css';
import {empyreanFeatures} from './empyreanFeatureScript';
import FeaturesDisplay from './FeaturesDisplay';

function ActivePieceDisplay({activeToken}) {
  if (!activeToken) {
    return null;
  }
  
  console.log(empyreanFeatures(activeToken.hash));

  return (
    <div className="active-piece-container">
      <div className="active-piece-card">
        <div className="iframe-container">
          <iframe
            title={activeToken.id}
            src={`${artblocksUrl}/generator/${activeToken.id}`}
          />
        </div>
        <FeaturesDisplay
          features={empyreanFeatures(activeToken.hash)}
        />
      </div>
    </div>
  );

}

export default ActivePieceDisplay;
