import React, {useState} from 'react';
import './Page.css';
import abi from '../api.json';
import {artblocksContract} from './consts';
import {urlToProjectId} from './utils/projectMap';

function Home({web3, userAccount}) {

  const [contract] = useState(new web3.eth.Contract(abi, artblocksContract));

  return (
    <div className="container">
      <h2>Projects</h2>
      <ul>
      {Object.keys(urlToProjectId).map((project) => {
        console.log(project);
        return <li>{project}</li>
      })}
      </ul>
    </div>
  );
}

export default Home;
