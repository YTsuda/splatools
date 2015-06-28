'use strict';

var _ = require('underscore');
var keyMirror = require('react/lib/keyMirror');

module.exports = _.extend(
    {
        APP_ELEMENT_ID: 'content'
    },
    keyMirror({
        ACTION_UPDATE_CLOTH_FILTER: null
    })
);
