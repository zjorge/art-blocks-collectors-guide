import React from 'react';
import PieceStats from './PieceStats';
import ProjectDetails from './ProjectDetails';
import './ProjectInformation.css';

function ProjectInformation({projectInfo, tokens, projectId}) {
  return (
    <div className="project-information-container">
      <ProjectDetails projectInfo={projectInfo}/>
      <PieceStats tokens={tokens} projectId={projectId}/>
    </div>
  ) 
}

export default ProjectInformation;
