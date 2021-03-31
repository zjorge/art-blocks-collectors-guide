import React, {useState, useEffect} from 'react';
import PieceBrowser from './PieceBrowser';
import ProjectInformation from './ProjectInformation';

function ProjectView({projectId, account, contract}) {

  const [projectInfo, setProjectInfo] = useState(null);
  const [allTokens, setAllTokens] = useState([]);

  useEffect(() => {
    async function fetchProjectDetails() {
      setProjectInfo(await contract.methods.projectDetails(projectId).call());
    }
    fetchProjectDetails();
  }, [projectId, contract]);

  useEffect(() => {
    if (!account) {
      return; 
    }

    async function fetchTokens() {
      const ids = await contract.methods.tokensOfOwner(account).call();
      const tokens = await Promise.all(ids.map(async (id) => {
        return {
          id,
          hash: await contract.methods.tokenIdToHash(id).call()
        };
      }));
      setAllTokens(tokens);
    }
    
    fetchTokens();

   }, [account, contract]);

  const regex = new RegExp(`^${projectId}\\d+`, 'g');
  const tokens = allTokens.filter(token => token.id.match(regex));

  return (
    <div>
      <ProjectInformation 
        projectInfo={projectInfo}
        tokens={tokens}
        projectId={projectId}
      />
      <PieceBrowser tokens={tokens} projectId={projectId}/>
    </div>
  );
}

export default ProjectView;
