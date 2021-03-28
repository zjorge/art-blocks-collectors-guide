import React, {useState} from 'react';
import TokenGrid from './TokenGrid';
import ActivePieceDisplay from './ActivePieceDisplay';

function PieceBrowser({tokens, projectId}) {
  const [activeToken, setActiveToken] = useState(null);

  return (
    <div>
      <ActivePieceDisplay activeToken={activeToken} setActiveToken={setActiveToken} projectId={projectId}/>
      <TokenGrid tokens={tokens} setActiveToken={setActiveToken}/>
    </div>
  );

}

export default PieceBrowser;
