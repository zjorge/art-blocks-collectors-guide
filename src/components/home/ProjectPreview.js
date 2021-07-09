import React, {useState, useEffect} from 'react';
import {fetchProjectTokensForAccount, getRandomTokenFromProject} from '../utils/tokens';
import {fetchProjectDetails} from '../utils/projects';
import {
  useHistory,
} from 'react-router-dom';
import ArtBlocksImage from '../ArtBlocksImage';
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
    <div 
      className="project-preview-container"
      onClick={onButtonClick}
    >
      {previewToken && <ArtBlocksImage
        cname="preview-image"
        token={previewToken}
      />}
      <div className="info-container">
        <div>
          <h3 className="project-title">{projectDetails.projectName}</h3>
          {allTokens && <div>Owned: {allTokens.length}</div>}
        </div>
      </div>
    </div>
  );
}

export default ProjectPreview;
