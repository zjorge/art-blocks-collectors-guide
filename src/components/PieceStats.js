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
  const numTokenFeatures = Object.keys(tokenFeatures).reduce((accumulator, tokenFeature) => accumulator + tokenFeatures[tokenFeature].size, 0);
  const numFeatures = Object.keys(features).reduce((accumulator, feature) => accumulator + features[feature].length, 0);
  
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
          <tfoot className="table-footer">
            <tr>
              <td className="feature-display-title">Total</td>
              <td className="center-column">{numTokenFeatures}/{numFeatures} ({Math.floor(numTokenFeatures/numFeatures * 100)}%)</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default PieceStats;
