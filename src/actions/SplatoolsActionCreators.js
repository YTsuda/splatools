'use strict';

var SplatoolsAppDispatcher = require('../dispatcher/SplatoolsAppDispatcher');
var SplatoolsConstant = require('../constants/SplatoolsConstant');

var SplatoolsActionCreators = {
    updateClothFilter: function(query){
        SplatoolsAppDispatcher.dispatch({
            actionType: SplatoolsConstant.ACTION_UPDATE_CLOTH_FILTER,
            query: query
        });
    }
};

module.exports = SplatoolsActionCreators; 
