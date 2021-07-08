import React, {useState, useEffect} from 'react';
import PieceBrowser from './PieceBrowser';
import ProjectInformation from './ProjectInformation';
import {fetchProjectTokensForAccount} from './utils/tokens';

function ProjectView({projectId, account, contract}) {

  const [projectInfo, setProjectInfo] = useState(null);
  const [allTokens, setAllTokens] = useState(null);

  useEffect(() => {
    async function fetchProjectDetails() {
      setProjectInfo(await contract.methods.projectDetails(projectId).call());
    }
    fetchProjectDetails();
  }, [projectId, contract]);

  useEffect(() => {
    async function setUserTokens() {
      setAllTokens(await fetchProjectTokensForAccount(contract, account, projectId));
    }

    setUserTokens();

  }, [account, contract, projectId]);

  const projectName = projectInfo?.projectName;

  return (
    <div>
      <ProjectInformation
        projectInfo={projectInfo}
        tokens={allTokens}
        projectId={projectId}
      />
      <PieceBrowser tokens={allTokens} projectId={projectId} projectName={projectName}/>
    </div>
  );
}

export default ProjectView;
