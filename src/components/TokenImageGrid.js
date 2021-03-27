import React from 'react';
import './TokenImageGrid.css';

const artblocksUrl = "https://api.artblocks.io";

function TokenImageGrid({tokens}) {
  return (
    <div className="image-grid">
      {tokens.map(token => {
        return (
          <img 
            key={token}
            src={`${artblocksUrl}/image/${token}`}
            alt={token}
          />)
      })}
    </div>
  ) 
}

export default TokenImageGrid;
