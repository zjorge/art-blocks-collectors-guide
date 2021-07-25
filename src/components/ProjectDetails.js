import React from 'react';
import './ProjectDetails.css';
import Accordion from './utils/Accordion';

function ProjectDetails({projectInfo}) {
  if (!projectInfo) {
    return null;
  }
  const {projectName, artist, description, website, printedPieces} = projectInfo
  return (
    <div className="project-details-container">
      <h2>Piece Info</h2>
      <h3>{projectName} by {artist}</h3>
      <a href={website}>Artist Website</a>
      <p><span className="bold-text">Description: </span>{description}</p>
      {printedPieces &&
        <Accordion
          title="Printed Pieces"
        >
          <ul className="printed-pieces-ul">
            {printedPieces.map((printedPiece) => {
              return <li key={printedPiece}>#{printedPiece}</li>
            })}
          </ul>
        </Accordion>
      }
    </div>
  );
}

export default ProjectDetails;
