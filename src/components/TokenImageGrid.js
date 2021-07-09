import React from 'react';
import './TokenImageGrid.css';
import ArtBlocksImage from './ArtBlocksImage';
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
            <ArtBlocksImage
              cname="token-image"
              token={token}
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
