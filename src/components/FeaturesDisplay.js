import React from 'react';
import './FeaturesDisplay.css';

function FeaturesDisplay({features}) {
  return(
    <div>
      {Object.keys(features).map((feature) => (
        <div
          className="feature-line"
          key={feature}
        >
          <div className="feature-name">{feature}:&nbsp;</div>
          <div>{features[feature]}</div>
        </div>
      ))}
    </div>
  );
}

export default FeaturesDisplay;
