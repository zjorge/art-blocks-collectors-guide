import projectMap from './projectMap';

export function featureSet(tokens) {
  const featureDescriptions = tokens.map((token) => {
    return projectMap[33].featureScript(token.hash);
  });

  const featureSet = {}

  featureDescriptions.forEach((featureDescription) => {
    Object.keys(featureDescription).forEach((featureName) => {
      if (!featureSet[featureName]) {
        featureSet[featureName] = new Set();
      }
      return featureSet[featureName].add(featureDescription[featureName]);
    });
  });

  return featureSet;
}


