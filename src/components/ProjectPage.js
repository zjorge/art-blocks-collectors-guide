import React, {useState, useEffect, useCallback} from 'react';
import ViewAccountHandling from './ViewAccountHandling';
import ProjectView from './ProjectView';
import {urlToProjectId} from './utils/projectMap';
import queryString from 'query-string';
import {
  useParams,
  useHistory,
  useLocation
} from 'react-router-dom';
import abi from '../api.json';
import './ProjectPage.css';
import {artblocksContract} from './consts';

function ProjectPage({web3, userAccount}) {
  const { projectName } = useParams();
  const { search } = useLocation();
  const queryParams = queryString.parse(search);
  const history = useHistory();

  const viewAccount = queryParams.collection;
  const [contract] = useState(new web3.eth.Contract(abi, artblocksContract));

  const setCollectionParam = useCallback((account) => {
      const params = new URLSearchParams();
      if (!account) {
        params.delete(account);
      } else {
        params.append("collection", account);
      }
      history.push({search: params.toString()});
  }, [history]);

  useEffect(() => {
    if (!viewAccount) {
      setCollectionParam(userAccount);
    }
  }, [userAccount, viewAccount, setCollectionParam]);

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
        setViewAccount={setCollectionParam}
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
