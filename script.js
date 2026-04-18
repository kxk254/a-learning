(function () {
  "use strict";
  const TAU = 2 * Math.PI;
  function buildGearPath(
    toothCount,
    tipRadius,
    rootRadius,
    valleyRadius,
    hubRadius,
    phaseOffset,
  ) {
    const anglePerTooth = TAU / toothCount;
    const toothWidthRatio = 0.42;
    const gapAngle = (anglePerTooth * (1 - toothWidthRatio)) / 2;
    const phase = phaseOffset || 0;
    const points = [];
    for (let tooth = 0; tooth < toothCount; tooth++) {
      const baseAngle = tooth * anglePerTooth - anglePerTooth / 2 + phase;
      points.push([
        valleyRadius * Math.cos(baseAngle),
        valleyRadius * Math.sin(baseAngle),
      ]);
      points.push([
        rootRadius * Math.cos(baseAngle + gapAngle),
        rootRadius * Math.sin(baseAngle + gapAngle),
      ]);
      points.push([
        tipRadius *
          Math.cos(
            baseAngle + gapAngle + anglePerTooth * toothWidthRatio * 0.15,
          ),
        tipRadius *
          Math.sin(
            baseAngle + gapAngle + anglePerTooth * toothWidthRatio * 0.15,
          ),
      ]);
      points.push([
        tipRadius *
          Math.cos(
            baseAngle + gapAngle + anglePerTooth * toothWidthRatio * 0.85,
          ),
        tipRadius *
          Math.sin(
            baseAngle + gapAngle + anglePerTooth * toothWidthRatio * 0.85,
          ),
      ]);
      points.push([
        rootRadius *
          Math.cos(baseAngle + gapAngle + anglePerTooth * toothWidthRatio),
        rootRadius *
          Math.sin(baseAngle + gapAngle + anglePerTooth * toothWidthRatio),
      ]);
    }
    let path =
      points
        .map(function (point, index) {
          return (
            (index ? "L" : "M") +
            point[0].toFixed(1) +
            "," +
            point[1].toFixed(1)
          );
        })
        .join(" ") + " Z";
    path +=
      " M" +
      hubRadius +
      ",0" +
      " A" +
      hubRadius +
      "," +
      hubRadius +
      " 0 0 1 " +
      -hubRadius +
      ",0" +
      " A" +
      hubRadius +
      "," +
      hubRadius +
      " 0 0 1 " +
      hubRadius +
      ",0 Z";
    if (toothCount >= 16) {
      const spokeCount = 6;
      const spokeInnerRadius = hubRadius + 9;
      const spokeOuterRadius = valleyRadius - 12;
      const spokeWidth = 11;
      for (let spoke = 0; spoke < spokeCount; spoke++) {
        const spokeAngle = (spoke * TAU) / spokeCount;
        const spokeMidRadius = (spokeInnerRadius + spokeOuterRadius) / 2;
        const spokeHalfLength = (spokeOuterRadius - spokeInnerRadius) / 2;
        const spokeHalfWidth = spokeWidth / 2;
        const axialCos = Math.cos(spokeAngle);
        const axialSin = Math.sin(spokeAngle);
        const lateralCos = Math.cos(spokeAngle + Math.PI / 2);
        const lateralSin = Math.sin(spokeAngle + Math.PI / 2);
        const centrX = spokeMidRadius * axialCos;
        const centrY = spokeMidRadius * axialSin;
        const corners = [
          [
            centrX + spokeHalfLength * axialCos + spokeHalfWidth * lateralCos,
            centrY + spokeHalfLength * axialSin + spokeHalfWidth * lateralSin,
          ],
          [
            centrX - spokeHalfLength * axialCos + spokeHalfWidth * lateralCos,
            centrY - spokeHalfLength * axialSin + spokeHalfWidth * lateralSin,
          ],
          [
            centrX - spokeHalfLength * axialCos - spokeHalfWidth * lateralCos,
            centrY - spokeHalfLength * axialSin - spokeHalfWidth * lateralSin,
          ],
          [
            centrX + spokeHalfLength * axialCos - spokeHalfWidth * lateralCos,
            centrY + spokeHalfLength * axialSin - spokeHalfWidth * lateralSin,
          ],
        ];
        path +=
          " M" +
          corners[0][0].toFixed(1) +
          "," +
          corners[0][1].toFixed(1) +
          " L" +
          corners[1][0].toFixed(1) +
          "," +
          corners[1][1].toFixed(1) +
          " L" +
          corners[2][0].toFixed(1) +
          "," +
          corners[2][1].toFixed(1) +
          " L" +
          corners[3][0].toFixed(1) +
          "," +
          corners[3][1].toFixed(1) +
          " Z";
      }
    }
    return path;
  }
  const gears = [
    {
      id: "gear-clockwise-path",
      toothCount: 16,
      tipRadius: 126,
      rootRadius: 108,
      valleyRadius: 95,
      hubRadius: 22,
      phaseOffset: 0,
    },
    {
      id: "gear-counter-clockwise-path",
      toothCount: 10,
      tipRadius: 84,
      rootRadius: 70,
      valleyRadius: 53,
      hubRadius: 15,
      phaseOffset: Math.PI / 10,
    },
  ];
  gears.forEach(function (gear) {
    document
      .getElementById(gear.id)
      .setAttribute(
        "d",
        buildGearPath(
          gear.toothCount,
          gear.tipRadius,
          gear.rootRadius,
          gear.valleyRadius,
          gear.hubRadius,
          gear.phaseOffset,
        ),
      );
  });
})();
