import React from 'react';
import './PieceStats.css';
import {featureSet} from './utils/features';
import projectMap from './utils/projectMap';

function PieceStats({tokens, projectId}) {
  if(tokens.length === 0) {
    return null;
  }

  const tokenFeatures = featureSet(tokens, projectId);

  const features = projectMap[projectId].features;
  
  return (
    <div className="piece-stats-container">
      <h2 className="stats-header">Stats</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Feature name</th>
              <th>Amount collected</th>
            </tr>
          </thead>
          <tbody>
          {Object.keys(features).map((featureName) => {
            return (
              <tr
                key={featureName}
              >
                <td className="feature-display-title">
                  {featureName} 
                </td>
                <td className="center-column tooltip">
                  {tokenFeatures[featureName].size}/{features[featureName].length}
                  <span className="tooltiptext">
                  {features[featureName].map((feature, index) => {
                    return <span key={feature} className={tokenFeatures[featureName].has(feature) ? "has" : "missing"}>{index ? ', ': ''}{feature}</span> 
                  })}
                  </span>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PieceStats;
