'use strict';

let PositionView = require('../../src');

let {
    mount
} = require('kabanery');

let log = console.log; // eslint-disable-line

mount(PositionView({
    value: [
        [3, 3],
        [
            [0, 0],
            [1, 1]
        ]
    ],
    onchange: (v) => {
        log(v);
    }
}), document.body);
