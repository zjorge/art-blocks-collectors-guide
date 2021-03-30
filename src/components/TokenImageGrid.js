import React from 'react';
import './TokenImageGrid.css';
import {artblocksApiUrl} from './consts';
import {formatTokenId} from './utils/tokenId';


function TokenImageGrid({tokens, setActiveToken}) {
  const onTokenClick = (token) => {
    return () => {
      setActiveToken(token);
    }
  }
  
  return (
    <div className="image-grid">
      {tokens.map(token => {
        return (
          <div 
            className="token-image-container"
            onClick={onTokenClick(token)}
            key={token.id}
          >
            <img 
              className="token-image"
              src={`${artblocksApiUrl}/image/${token.id}`}
              alt={token.id}
            />
            <div className="hover-container">
              <div className="hover-text">
              #{formatTokenId(token.id)}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  ) 
}

export default TokenImageGrid;
