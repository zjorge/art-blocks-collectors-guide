class Styles {
  constructor() {
    this.cp = [
      "LAVENDER",
      "OFF(BLACK + WHITE)",
      "REEF",
      "BRICK",
      "DOLPHIN",
      "OAXACA",
      "MERCIA",
      "WHO ATE THE CRANS?",
      "MOSS AGATE",
      "FIREWATER",
      "FAST Ag",
    ];
    this.rd = {
      N: "None",
      PRP: "Perpendicular Lines",
      PAR: "Parallel Lines",
      MLR: "Mixed Lines (Random)",
      MLN: "Mixed Lines (Noise)",
      CH: "Cross Hatch",
      SR: "Specks (Random)",
      SG: "Specks (Grid)",
      RR: "Random (Random)",
      RN: "Random (Noise)",
      G: "Gradient",
    };

    this.cCoh = {
      M: "Mono",
      R: "Random",
      H: "High",
      N: "Normal",
    };

    this.s = {
      N: "None",
      H: "Horizontal",
      V: "Vertical",
      G: "Grid",
      P: "Partition",
    };
  }
}

export function enchiridionFeatures(tokenData) {
  console.log(tokenData);
  const hashPairs = [];
  for (let j = 0; j < 32; j++) {
    hashPairs.push(tokenData.hash.slice(2 + j * 2, 4 + j * 2));
  }
  const decPairs = hashPairs.map((x) => parseInt(x, 16));

  const styles = new Styles();

  let rectangleDecoration = "";
  let k = map_v(1);
  if (k < 0.09) {
    rectangleDecoration += styles.rd.PRP;
  } else if (k < 0.18) {
    rectangleDecoration += styles.rd.PAR;
  } else if (k < 0.27) {
    rectangleDecoration += styles.rd.CH;
  } else if (k < 0.315) {
    rectangleDecoration += styles.rd.MLN;
  } else if (k < 0.36) {
    rectangleDecoration += styles.rd.MLR;
  } else if (k < 0.43) {
    rectangleDecoration += styles.rd.G;
  } else if (k < 0.52) {
    rectangleDecoration += styles.rd.SR;
  } else if (k < 0.61) {
    rectangleDecoration += styles.rd.SG;
  } else if (k < 0.69) {
    rectangleDecoration += styles.rd.RR;
  } else if (k < 0.77) {
    rectangleDecoration += styles.rd.RN;
  } else {
    rectangleDecoration += styles.rd.N;
  }

  let colorPalette = styles.cp[Math.floor(map_v(7, 0, styles.cp.length - 0.000000001))];

  let hasBackground = 'False';
  if (map_v(0) < 0.399) {
    hasBackground = 'True';
  }

  k = map_v(2); // RIP Color Shift :(
  let colorCohesion = "";
  if (k < 0.06) {
    colorCohesion += styles.cCoh.M;
  } else if (k < 0.16) {
    colorCohesion += styles.cCoh.H;
  } else if (k < 0.36) {
    colorCohesion += styles.cCoh.R;
  } else {
    colorCohesion += styles.cCoh.N;
  }

  let hasOuterPartition = false;
  let numCols;
  let numRows;
  k = map_v(3);
  if (k < 0.2) {
    hasOuterPartition = true;
    k = map_v(6);
    numCols = 0;
    numRows = 0;
  } else {
    k = map_v(4);
    if (k < 0.73) {
      numCols = 1;
    } else if (k < 0.82) {
      numCols = 2;
    } else if (k < 0.91) {
      numCols = 3;
    } else {
      numCols = 4;
    }
    k = map_v(5);
    if (k < 0.73) {
      numRows = 1;
    } else if (k < 0.82) {
      numRows = 2;
    } else if (k < 0.91) {
      numRows = 3;
    } else {
      numRows = 4;
    }
  }

  let splitStyle = "";

  if (numCols > 1) {
    if (numRows > 1) {
      splitStyle += styles.s.G;
    } else {
      splitStyle += styles.s.V;
    }
  } else if (numRows > 1) {
    splitStyle += styles.s.H;
  } else if (hasOuterPartition) {
    splitStyle += styles.s.P;
  } else {
    splitStyle += styles.s.N;
  }

  return {
    "Color Palette": colorPalette,
    "Color Cohesion": colorCohesion,
    "Has Background": hasBackground,
    "Rectangle Decoration": rectangleDecoration,
    "Split Style": splitStyle,
  };

  function map_v(index, min = 0, max = 1) {
    return (decPairs[index] / 255) * (max - min) + min;
  }
}
