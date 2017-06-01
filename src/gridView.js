'use strict';

let {
    n, view
} = require('kabanery');

let {
    isItemChosen, connectArea
} = require('./util');

module.exports = view((data, {
    update
}) => {
    let width = data.width || 150,
        height = data.height || 240;

    let chosenPoint1 = null,
        chosenPoint2 = null;

    return () => {
        let {
            value,
            onchange
        } = data;

        let [grid, area] = value;

        let [horizontalGrid, verticalGrid] = grid;

        let unitWidth = width / horizontalGrid,
            unitHeight = height / verticalGrid;

        let grids = [];
        for (let i = 0; i < horizontalGrid; i++) {
            for (let j = 0; j < verticalGrid; j++) {
                let bgcolor = isItemChosen(i, j, area[0], area[1]) ? 'green' : null;

                grids.push(n('div', {
                    style: {
                        width: unitWidth,
                        height: unitHeight,
                        borderLeft: i > 0 ? 0 : '1px solid gray',
                        borderRight: '1px solid gray',
                        borderTop: j > 0 ? 0 : '1px solid gray',
                        borderBottom: '1px solid gray',
                        position: 'absolute',
                        left: unitWidth * i,
                        top: unitHeight * j,
                        backgroundColor: bgcolor,
                        boxSizing: 'border-box'
                    },

                    onclick: () => {
                        if (!chosenPoint1 || chosenPoint2) {
                            area[0] = null;
                            area[1] = null;
                            chosenPoint1 = [i, j];
                            let newArea = connectArea(chosenPoint1, chosenPoint2);
                            update('value.1', newArea);
                            onchange && onchange(value);
                        } else {
                            chosenPoint2 = [i, j];
                            let newArea = connectArea(chosenPoint1, chosenPoint2);
                            update('value.1', newArea);
                            onchange && onchange(value);
                            chosenPoint1 = null;
                            chosenPoint2 = null;
                        }
                    }
                }));
            }
        }

        // draw a n * m grids
        return n('div', [
            n('div', {
                style: {
                    boxSizing: 'border-box',
                    width,
                    height,
                    position: 'relative'
                }
            }, [
                grids
            ]),

            area[0] && n('span', {
                style: {
                    color: 'gray',
                    fontSize: 12,
                    padding: 5
                }
            }, `(${area[0][0]}, ${area[0][1]}) - (${area[1][0]}, ${area[1][1]})`)
        ]);
    };
});
