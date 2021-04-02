import React, {useState} from 'react';
import TokenGrid from './TokenGrid';
import ActivePieceDisplay from './ActivePieceDisplay';

function PieceBrowser({tokens, projectId, projectTitle}) {
  const [activeToken, setActiveToken] = useState(null);

  if (!tokens) {
    return null;
  }

  return (
    <div>
      <ActivePieceDisplay activeToken={activeToken} setActiveToken={setActiveToken} projectId={projectId} projectTitle={projectTitle}/>
      <TokenGrid tokens={tokens} setActiveToken={setActiveToken}/>
    </div>
  );

}

export default PieceBrowser;
