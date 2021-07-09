import React, {useState} from 'react';
import '../Page.css';
import abi from '../../api.json';
import {artblocksContract} from '../consts';
import {urlToProjectId} from '../utils/projectMap';
import ProjectPreview from './ProjectPreview';

function Home({web3, userAccount}) {

  const [contract] = useState(new web3.eth.Contract(abi, artblocksContract));

  return (
    <div className="container">
      <h2>Projects</h2>
      {Object.keys(urlToProjectId).map((project) => {
        return (<ProjectPreview
          key={project}
          projectUrl={project}
          projectId={urlToProjectId[project]}
          contract={contract}
          account={userAccount}
        />)
      })}
    </div>
  );
}

export default Home;
