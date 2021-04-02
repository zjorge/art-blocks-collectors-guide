import React from 'react';
import {artblocksUrl, artblocksApiUrl} from './consts';
import {formatTokenId} from './utils/tokenId';
import './ActivePieceDisplay.css';
import projectMap from './utils/projectMap';
import FeaturesDisplay from './FeaturesDisplay';

function ActivePieceDisplay({activeToken, setActiveToken, projectId, projectTitle}) {
  if (!activeToken || !projectTitle) {
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
            src={`${artblocksApiUrl}/generator/${activeToken.id}`}
          />
        </div>
        <div className="info">
          <h3>{projectTitle} #{formatTokenId(activeToken.id)}</h3>
          <FeaturesDisplay
            features={projectMap[projectId].featureScript(activeToken.hash)}
          />
          <a href={`${artblocksUrl}/token/${activeToken.id}`}>View on Art Blocks</a>
        </div>
      </div>
    </div>
  );

}

export default ActivePieceDisplay;
