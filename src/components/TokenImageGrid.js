import React from 'react';
import './TokenImageGrid.css';
import {artblocksUrl} from './consts';


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
          <img 
            className="token-image"
            onClick={onTokenClick(token)}
            key={token.id}
            src={`${artblocksUrl}/image/${token.id}`}
            alt={token}
          />)
      })}
    </div>
  ) 
}

export default TokenImageGrid;
