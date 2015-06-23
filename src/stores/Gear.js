"use strict";
var SplatoolsAppDispatcher = require('../dispatcher/SplatoolsAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

// id, name
var _gears = [
    ["1","攻撃力アップ","16"],
    ["2","防御力アップ","17"],
    ["3","インク効率アップ(メイン)","5"],
    ["4","インク効率アップ(サブ)","6"],
    ["5","インク回復力アップ","7"],
    ["6","ヒト移動速度アップ","8"],
    ["7","イカダッシュ速度アップ","9"],
    ["8","スペシャル増加量アップ","10"],
    ["9","スペシャル時間延長","11"],
    ["10","復活時間短縮","12"],
    ["11","スペシャル減少量ダウン","13"],
    ["12","スーパージャンプ時間短縮","14"],
    ["13","ボム飛距離アップ","15"],
    ["14","スタートダッシュ","18"],
    ["15","ラストスパート","19"],
    ["16","逆境強化","4"],
    ["17","カムバック","20"],
    ["18","マーキングガード","21"],
    ["19","イカニンジャ","3"],
    ["20","うらみ","22"],
    ["21","スタートレーダー","23"],
    ["22","ボムサーチ","24"],
    ["23","安全シューズ","1"],
    ["24","ステルスジャンプ","2"]
];

var Gear = assign({}, EventEmitter.prototype, {
    POSITION_INDEX: 2,
    /**
     * Get the entire collection of Gear.
     * @return {object}
     */
    getAll: function() {
        var g = _gears.sort(function(a, b){
            return a[Gear.POSITION_INDEX] - b[Gear.POSITION_INDEX];
        });
        return _gears;
    },
    getNameHash: function(){
        var hash = {};
        for(var i in _gears){
            hash[_gears[i][0]] = _gears[i][1];
        }
        return hash;
    }
});

// Register callback to handle all updates
SplatoolsAppDispatcher.register(function(action) {
    switch(action.actionType) {
    }
});

module.exports = Gear;
