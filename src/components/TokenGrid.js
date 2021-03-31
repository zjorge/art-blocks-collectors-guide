import React from 'react';
import TokenImageGrid from './TokenImageGrid';
import './TokenGrid.css';

function TokenGrid({tokens, setActiveToken}) {
  return (
    <div>
      <h2 className="piece-header">Pieces Owned:</h2>
      <TokenImageGrid tokens={tokens} setActiveToken={setActiveToken}/>
    </div>
  ) 
}

export default TokenGrid;
