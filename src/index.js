'use strict';

let {
    n, view
} = require('kabanery');

let {
    m, RawInput
} = require('kabanery-flow');

let GridView = require('./gridView');

/**
 * chosen a value from n * m view
 *
 * value: [leftTopCoord, rightBottomCoord]
 *
 * coord: [x, y]
 *
 * value = [
 *    [m, n],
 *    [[x1, y1], [x2, y2]]
 * ]
 *
 *
 * TODO
 *  1. only update grid value when change grid number
 *  2. equivalent stretch
 */

module.exports = view(({
    value, onchange, width, height
}) => {
    let gridView = GridView({
        value: value,
        width,
        height,
        onchange
    });

    return m('div', {
        onchange,
        value
    }, (bindValue) => {
        return [
            n('label', 'grid'),

            RawInput(bindValue('0.0', {
                type: 'number',
                style: {
                    width: 100,
                    minWidth: 100,
                    marginRight: 10
                },

                onchange: () => {
                    value[1] = [
                        [0, 0],
                        [0, 0]
                    ];

                    gridView.ctx.update('value', value);
                }
            })),

            RawInput(bindValue('0.1', {
                type: 'number',
                style: {
                    width: 100,
                    minWidth: 100
                },

                onchange: () => {
                    value[1] = [
                        [0, 0],
                        [0, 0]
                    ];

                    gridView.ctx.update('value', value);
                }
            })),

            n('br'),
            n('br'),

            gridView
        ];
    });
});
