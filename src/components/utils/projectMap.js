import {empyreanFeatures} from './empyreanFeatureScript';

const projectMap = {
  33: {
    featureScript: empyreanFeatures,
    features: {
      "Size": ["Small", "Medium", "Large"],
      "Line style": ["Loopy", "Neat loopy", "Straight"],
      "Color scheme": ["Grayscale", "Monochromatic", "Full spectrum"],
      "Moves": ["False", "True"],
      "Color Animation": ["N/A", "Random", "Rotate", "Hue shift"],
      "Filled": ["False", "True"],
      "Node style": ["Normal", "Just start point", "just endpoint", "Start point and endpoint"],
      "Start point node style": ["N/A", "Circle", "Square", "Triangle", "Cross", "Asterisk"],
      "Endpoint node style": ["N/A", "Circle", "Square", "Triangle", "Cross", "Asterisk"],
      "Nodes filled": ["False", "True"],
      "Possible node size": ["Small", "Medium", "Large"],
      "Node rotation": ["False", "True"],
      "Border": ["False", "True"],
      "Start point style": ["On circle edge", "Use previous endpoint", "Random"],
      "Random endpoint": ["False", "True"],
      "Noise magnitude": ["Low", "Normal", "High"],
      "Noise resolution": ["Low", "Normal", "High"],
      "Color animation speed": ["N/A", "Very slow", "Slow", "Normal", "Fast"],
      "Max node rotation": ["N/A", "Small", "Medium", "Large"],
    }
  }
}

export default projectMap;
