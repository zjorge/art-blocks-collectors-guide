import React, {useState, useEffect} from 'react';
import TokenGrid from './TokenGrid';
import ActivePieceDisplay from './ActivePieceDisplay';

function PieceBrowser({tokens}) {
  const [activeToken, setActiveToken] = useState(null);

  useEffect(() => {
    if (tokens.length === 0) {
      return;
    }
    setActiveToken(tokens[0]);
  }, [tokens]);

  return (
    <div>
      <ActivePieceDisplay activeToken={activeToken}/>
      <TokenGrid tokens={tokens} setActiveToken={setActiveToken}/>
    </div>
  );

}

export default PieceBrowser;
