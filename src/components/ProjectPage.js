import React, {useState} from 'react';
import ViewAccountHandling from './ViewAccountHandling';
import ProjectView from './ProjectView';
import abi from '../api.json';
const artblocksContract = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";

function ProjectPage({web3, userAccount}) {
  const [contract] = useState(new web3.eth.Contract(abi, artblocksContract));
  const [viewAccount, setViewAccount] = useState(null);
  const [projectId] = useState(33);

  if (viewAccount === null && userAccount) {
    setViewAccount(userAccount);
  }

  if (!web3._provider) {
    return (<div className="test-net-warning">This site requires MetaMask</div>);
  }
  return (
    <div>
      <ViewAccountHandling
        contract={contract}
        projectId={projectId}
        setViewAccount={setViewAccount}
        viewAccount={viewAccount}
        userAccount={userAccount}
      />
      
      <ProjectView
        account={viewAccount}
        contract={contract}
        projectId={projectId}
      />
    </div>
  )
}

export default ProjectPage;
