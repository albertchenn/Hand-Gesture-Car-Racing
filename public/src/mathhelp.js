let zeroDistance = 0;

export function calculateArea(points) {
    let area = 0;
    for (let i = 0; i < points.length; i++) {
        let j = (i + 1) % points.length;
        area += points[i].x * points[j].y;
        area -= points[j].x * points[i].y;
    }
    return Math.abs(area / 2);
}

export function determineDistance(areas) {
    let averageArea = areas.reduce((a, b) => a + b, 0) / areas.length; 

    let distance = 1 / Math.sqrt(averageArea);

    return distance - zeroDistance;
}

export function setZeroDistance(areas) {
    zeroDistance = 0;

    zeroDistance = determineDistance(areas);
}
