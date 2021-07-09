import React, {useState, useEffect} from 'react';
import {fetchProjectTokensForAccount, getRandomTokenFromProject} from '../utils/tokens';
import {fetchProjectDetails} from '../utils/projects';
import {
  useHistory,
} from 'react-router-dom';
import ArtBlocksImage from '../ArtBlocksImage';
import '../button.css';
import './ProjectPreview.css';

function ProjectPreview({account, contract, projectId, projectUrl}) {
  const [projectDetails, setProjectInfo] = useState(null);
  const [allTokens, setAllTokens] = useState(null);
  const [previewToken, setPreviewToken] = useState(null);

  const history = useHistory();

  const onButtonClick = () => {
    history.push(`/projects/${projectUrl}?collection=${account}`);
  };

  useEffect(() => {
    async function setProjectDetails() {
      setProjectInfo(await fetchProjectDetails(contract, projectId));
    }

    async function setRandomToken() {
      setPreviewToken(await getRandomTokenFromProject(contract, projectId));
    }

    setProjectDetails();
    setRandomToken();
  }, [projectId, contract]);

  useEffect(() => {
    async function setUserTokens() {
      setAllTokens(await fetchProjectTokensForAccount(contract, account, projectId));
    }

    setUserTokens();

  }, [account, contract, projectId]);

  if (!projectDetails) {
    return null;
  }

  return (
    <div>
      <h3>{projectDetails.projectName}</h3>
      {previewToken && <ArtBlocksImage
        cname="preview-image"
        token={previewToken}
      />}
      <div>{projectDetails.description}</div>
      {allTokens && <div>Owned: {allTokens.length}</div>}
      <button 
        className="button" 
        onClick={onButtonClick}
      >
        View Collection
      </button>
    </div>
  );
}

export default ProjectPreview;
