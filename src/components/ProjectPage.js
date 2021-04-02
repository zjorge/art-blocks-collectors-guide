import React, {useState, useEffect} from 'react';
import ViewAccountHandling from './ViewAccountHandling';
import ProjectView from './ProjectView';
import {urlToProjectId} from './utils/projectMap';
import {
  useParams,
  useHistory
} from 'react-router-dom';
import abi from '../api.json';
import './ProjectPage.css';
const artblocksContract = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";

function ProjectPage({web3, userAccount}) {
  const { projectName } = useParams();
  const history = useHistory();

  const [contract] = useState(new web3.eth.Contract(abi, artblocksContract));
  const [viewAccount, setViewAccount] = useState(null);

  useEffect(() => {
    setViewAccount(userAccount);
  }, [userAccount]);

  useEffect(() => {
    if (viewAccount === null) {
      setViewAccount(userAccount);
    }
  }, [viewAccount, userAccount]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (viewAccount) {
      params.append("collection", viewAccount);
    } else {
      params.delete("collection");
    }
    history.push({search: params.toString()});
  }, [viewAccount]);

  if (!web3._provider) {
    return (<div className="test-net-warning">This site requires MetaMask</div>);
  }

  if (!urlToProjectId[projectName]) {
    return (
      <div className="no-project">
        <div className="bold-error">404</div>
        <div>
          Project {projectName} does not exist...
        </div>
        <div>
          Aren't you sneaky...
        </div>
      </div>
    );
  }
  const projectId = urlToProjectId[projectName];
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
