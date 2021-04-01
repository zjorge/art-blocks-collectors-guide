import React, {useEffect, useRef} from 'react';
import {artblocksUrl, artblocksApiUrl} from './consts';
import {formatTokenId} from './utils/tokenId';
import './ActivePieceDisplay.css';
import projectMap from './utils/projectMap';
import FeaturesDisplay from './FeaturesDisplay';

function ActivePieceDisplay({activeToken, setActiveToken, projectId}) {
  const node = useRef();

  // Check if click was inside of the piece card
  const handleClick = e => {
    if (node.current?.contains(e.target)) {
      return;
    }
    setActiveToken(null);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  if (!activeToken) {
    return null;
  }
  
  return (
    <div className="active-piece-container"
    >
      <div className="active-piece-card"
        ref={node}
      >
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
          <h3>Empyrean #{formatTokenId(activeToken.id)}</h3>
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
