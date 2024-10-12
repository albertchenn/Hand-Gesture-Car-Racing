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
export function averagePoint(points) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < points.length; i++) {
        x += points[i].x;
        y += points[i].y;
    }
    var result = [x / points.length, y / points.length];
    //console.log(result);
    return {x: x / points.length, y: y / points.length};
}

export function calculateAngle(points){
    let x = points[0].x - points[1].x;
    let y = points[0].y - points[1].y;
    let angle = Math.atan2(y, x);
    return angle;
}
