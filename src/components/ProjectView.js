import React, {useState, useEffect} from 'react';
import PieceBrowser from './PieceBrowser';
import ProjectInformation from './ProjectInformation';
import abi from '../api.json';
const artblocksContract = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";

function ProjectView({projectId, account, web3}) {

  const [projectInfo, setProjectInfo] = useState(null);
  const [allTokens, setAllTokens] = useState([]);

  useEffect(() => {
    async function fetchProjectDetails() {
      let contract = new web3.eth.Contract(abi, artblocksContract);
      setProjectInfo(await contract.methods.projectDetails(projectId).call());
    }
    fetchProjectDetails();
  }, [projectId, web3]);

  useEffect(() => {
    if (!account) {
      return; 
    }

    async function fetchTokens() {
      let contract = new web3.eth.Contract(abi, artblocksContract);
      
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

   }, [account, web3]);

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
