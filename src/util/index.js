'use strict';

let isItemChosen = (i, j, lt, rb) => {
    if (!lt || !rb) return false;
    let [x1, y1] = lt, [x2, y2] = rb;
    return (x1 <= i && i <= x2) && (y1 <= j && j <= y2);
};

let connectArea = (point1, point2) => {
    if (!point2) return [
        point1,
        point1
    ];

    return [
        [
            Math.min(point1[0], point2[0]),
            Math.min(point1[1], point2[1]),
        ],
        [
            Math.max(point1[0], point2[0]),
            Math.max(point1[1], point2[1]),
        ]
    ];
};

module.exports = {
    isItemChosen,
    connectArea
};
