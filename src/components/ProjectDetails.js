import React from 'react';
import './ProjectDetails.css';

function ProjectDetails({projectInfo}) {
  if (!projectInfo) {
    return null;
  }
  const {projectName, artist, description, website} = projectInfo
  return (
    <div className="project-details-container">
      <h2>Info</h2>
      <h3>{projectName} by {artist}</h3>
      <a href={website}>Artist Website</a>
      <p><span className="bold-text">Description: </span>{description}</p>
    </div>
  );
}

export default ProjectDetails;
