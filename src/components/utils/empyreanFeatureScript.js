export function empyreanFeatures(tokenData) {
  const hashPairs = [];
  for (let j = 0; j < 32; j++) {
    hashPairs.push(tokenData.slice(2 + j * 2, 4 + j * 2));
  }

  const decPairs = hashPairs.map((x) => parseInt(x, 16));

  let lineStyle = 'Straight';
  const styleNum = Math.floor(map_v(2, 1, 4));
  switch (styleNum) {
    case 1:
      lineStyle = 'Loopy'
      break;
    case 2:
      lineStyle = 'Neat loopy'
      break;
    default:
      lineStyle = 'Straight'
  }

  let lineAmount = 'Normal';
  const lineNum = map_v(0, 20, 200);
  if (lineNum < 56) {
    lineAmount = 'Low';
  } else if (lineNum > 164) {
    lineAmount = 'High';
  }

  let pointAmount = 'Normal';
  const pointNum = map_v(1, 10, 500);
  if (pointNum < 59) {
    pointAmount = 'Very low';
  } else if (pointNum < 151) {
    pointAmount = 'Low';
  } else if (pointNum > 451) {
    pointAmount = 'Very high';
  } else if (pointNum > 353) {
    pointAmount = 'High';
  }

  let randomEndpoints = map_v(3) < 0.2 ? 'True' : 'False';
  let hasBorder = map_v(4) < 0.38 ? 'True' : 'False';
  let isFill = map_v(5) < 0.15 ? 'True' : 'False';

  let size = 'Normal';
  const sizeNum = map_v(6, 2.1, 3);
  if (sizeNum < 2.3) {
    size = 'Large';
  } else if (sizeNum > 2.8) {
    size = 'Small';
  }

  let doesMove = 'False';
  if (map_v(7) < 0.05) {
    doesMove = 'True';
  }

  let startpointStyle = 'On circle edge'
  const startpointPercent = map_v(11);
  if (startpointPercent <= 0.2) {
    startpointStyle = 'Use previous endpoint';
  } else if (startpointPercent <= 0.4) {
    startpointStyle = 'Random';
  }

  let colorScheme = 'Grayscale'
  const colorSchemePercent = map_v(12);
  if (colorSchemePercent <= 0.35) {
    colorScheme = 'Monochromatic';
  } else if (colorSchemePercent <= 0.5) {
    colorScheme = 'Full spectrum';
  }

  let nodeStyle = 'Normal';
  if (map_v(13) <= .25 && map_v(14) <= .25) {
    nodeStyle = 'Start point and endpoint';
  } else if (map_v(13) <= .25) {
    nodeStyle = 'Just start point';
  } else if (map_v(14) <= .25) {
    nodeStyle = 'Just endpoint';
  }

  let startpointNodeStyle = getNodeStyle(13);
  let endpointNodeStyle = getNodeStyle(14);

  let nodeFill = 'N/A';
  let nodeRatio = 'N/A';
  let nodeRotationStyle = 'N/A'
  let maxNodeRotation = 'N/A';
  if (map_v(13) <= .25 || map_v(14) <= .25) {
    const nodeRotationStyleBool = map_v(15) < .3;
    nodeRotationStyle = nodeRotationStyleBool ? 'True': 'False';
    let maxNodeRotationNum = map_v(16, Math.PI, 4 * Math.PI);
    if (nodeRotationStyleBool) {
      if (maxNodeRotationNum > 3 * Math.PI) {
        maxNodeRotation = 'Large';
      } else if (maxNodeRotation < 2 * Math.PI) {
        maxNodeRotation = 'Small';
      } else {
        maxNodeRotation = 'Medium';
      }
    }
    nodeFill = map_v(17) < 0.5 ? 'True' : 'False';
    let nodeRatioNum = map_v(18, 3, 25);
    if (nodeRatioNum < 10) {
      nodeRatio = 'Large';
    } else if (nodeRatioNum > 18) {
      nodeRatio = 'Small';
    } else {
      nodeRatio = 'Medium';
    }
  }

  let noiseMagnitude = 'N/A';
  let noiseResolution = 'N/A';
  if (((map_v(13) < .25 || map_v(14) < .25) && map_v(15) < .3) || map_v(7) < 0.05) {
    let noiseMagnitudeNum = map_v(9, 25, 35);
    if (noiseMagnitudeNum < 28) {
      noiseMagnitude = 'High';
    } else if (noiseMagnitudeNum > 32) {
      noiseMagnitude = 'Low';
    } else {
      noiseMagnitude = 'Normal';
    }
    
    let noiseResolutionNum = map_v(10, 1, 10);
    if (noiseResolutionNum < 4) {
      noiseResolution = 'High'
    } else if (noiseResolutionNum > 7) {
      noiseResolution = 'Low'
    } else {
      noiseResolution = 'Normal'
    }
  }


  let colorAnimation = 'N/A';
  const colorAnimationPercent = map_v(19);
  if (colorAnimationPercent <= 0.05) {
    colorAnimation = 'Hue shift';
  } else if (colorAnimationPercent <= 0.1) {
    colorAnimation = 'Random';
  } else if (colorAnimationPercent <= 0.15) {
    colorAnimation = 'Rotate';
  }


  let colorAnimationSpeed = 'N/A';
  if (colorAnimationPercent <= .05) {
    const colorAnimationSpeedPercent = map_v(20, 0.8, 1.2); 
    if (colorAnimationSpeedPercent < .9) {
      colorAnimationSpeed = 'Fast';
    } else if (colorAnimationSpeedPercent > 1.1) {
      colorAnimationSpeed = 'Slow';
    } else {
      colorAnimationSpeed = 'Normal';
    }
  } else if (colorAnimationPercent <= .15) {
    const framesBetweenColorChange = Math.floor(map_v(21, 3, 10));
    if (framesBetweenColorChange < 5) {
      colorAnimationSpeed = 'Fast';
    } else if (framesBetweenColorChange < 8) {
      colorAnimationSpeed = 'Normal';
    } else if (framesBetweenColorChange < 10) {
      colorAnimationSpeed = 'Slow';
    } else {
      colorAnimationSpeed = 'Very slow';
    }
  }

  return {
      "Size": size,
      "Line amount": lineAmount,
      "Point amount": pointAmount,
      "Line style": lineStyle,
      "Color scheme": colorScheme,
      "Moves": doesMove,
      "Color Animation": colorAnimation,
      "Filled": isFill,
      "Node style": nodeStyle,
      "Start point node style": startpointNodeStyle,
      "Endpoint node style": endpointNodeStyle,
      "Nodes filled": nodeFill,
      "Possible node size": nodeRatio,
      "Node rotation": nodeRotationStyle,
      "Border": hasBorder,
      "Start point style": startpointStyle,
      "Random endpoint": randomEndpoints,
      "Noise magnitude": noiseMagnitude,
      "Noise resolution": noiseResolution,
      "Color animation speed": colorAnimationSpeed,
      "Max node rotation": maxNodeRotation
  };

  function getNodeStyle(pairPos) {
    const nodeStyleProb = map_v(pairPos);
    if (nodeStyleProb <= 0.05) {
      return 'Circle';
    } else if (nodeStyleProb <= 0.1) {
      return 'Square';
    } else if (nodeStyleProb <= 0.15) {
      return 'Triangle';
    } else if (nodeStyleProb <= 0.2) {
      return 'Cross';
    } else if (nodeStyleProb <= 0.25) {
      return 'Asterisk';
    }
    return 'N/A';
  }

  function map_v(index, min = 0, max = 1) {
      return decPairs[index]/255 * (max - min) + min
  }
}


