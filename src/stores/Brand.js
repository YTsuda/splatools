"use strict";
var SplatoolsAppDispatcher = require('../dispatcher/SplatoolsAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


// id, name, increase_gear_id, decrease_gear_id
var _brands = [
    ["1","バトロイカ","1","3"],
    ["2","アイロニック","12","10"],
    ["3","クラーゲス","7","2"],
    ["4","ロッケンベルグ","6","7"],
    ["5","エゾッコ","11","8"],
    ["6","フォーリマ","9","4"],
    ["7","ホッコリー","4","5"],
    ["8","ホタックス","10","11"],
    ["9","ジモン","3","6"],
    ["10","シグレニ","2","1"],
    ["11","アロメ","5","12"],
    ["12","ヤコ","8","9"],
    ["13","KOG","",""],
    ["14","アタリメイド","",""],
    ["15","amiibo","",""],
    ["16","侵略！イカ娘","",""],
    ["17","ファミ通","",""]
];

var Brand = assign({}, EventEmitter.prototype, {
    /**
     * Get the entire collection of Brand.
     * @return {object}
     */
    getAll: function() {
        return _brands;
    },

    getHash: function(){
        var hash = {};
        for(var i in _brands){
            hash[_brands[i][0]] = _brands[i];
        }
        return hash;
    }
});

// Register callback to handle all updates
SplatoolsAppDispatcher.register(function(action) {
    switch(action.actionType) {
    }
});

module.exports = Brand;
