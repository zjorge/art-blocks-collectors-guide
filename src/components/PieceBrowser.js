import React, {useState, useEffect} from 'react';
import TokenGrid from './TokenGrid';
import ActivePieceDisplay from './ActivePieceDisplay';

function PieceBrowser({tokens}) {
  const [activeToken, setActiveToken] = useState(null);

  return (
    <div>
      <ActivePieceDisplay activeToken={activeToken} setActiveToken={setActiveToken}/>
      <TokenGrid tokens={tokens} setActiveToken={setActiveToken}/>
    </div>
  );

}

export default PieceBrowser;
