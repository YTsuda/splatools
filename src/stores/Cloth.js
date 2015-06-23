"use strict";
var SplatoolsAppDispatcher = require('../dispatcher/SplatoolsAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

// Stores
var Brand = require('../stores/Brand');
var Gear = require('../stores/Gear');

// id, name, part, gear_id, rare, brand_id
var _clothes = [
    ["1","わかばイカT","body","10","1","1"],
    ["2","イカホワイト","body","4","1","1"],
    ["3","イカノメT ブラック","body","6","1","11"],
    ["4","イカノメT ライトブルー","body","18","1","11"],
    ["5","ロッケンベルグT ブラック","body","1","1","4"],
    ["6","イカブラック","body","9","1","1"],
    ["7","サニーオレンジT","body","8","1","3"],
    ["8","レイニーブルーT","body","3","1","3"],
    ["9","ミントT","body","2","1","8"],
    ["10","グレープT","body","5","1","8"],
    ["11","ベクトルパターン レッド","body","3","1","12"],
    ["12","ベクトルパターン グレー","body","12","1","12"],
    ["13","ヤマビコT ブルー","body","4","1","10"],
    ["14","ヤマビコT アイボリー","body","20","1","10"],
    ["15","パイレーツボーダー","body","9","1","9"],
    ["16","マリンボーダー","body","6","1","9"],
    ["17","ヤキフグ8bit ホワイト","body","21","1","7"],
    ["18","ヤキフグ8bit ブラック","body","2","1","7"],
    ["19","ラインT ホワイト","body","7","1","13"],
    ["20","ドカンT ブラック","body","11","1","13"],
    ["21","エゾッコラグラン","body","2","1","5"],
    ["22","カレッジラグラン","body","21","1","9"],
    ["23","ハラグロラグラン","body","7","1","4"],
    ["24","ハラシロラグラン","body","12","1","4"],
    ["25","ボーダーモスグリーン","body","19","1","10"],
    ["26","イカバッテンロング","body","20","1","1"],
    ["27","アイロニックロング","body","9","1","2"],
    ["28","レイヤード ホワイト","body","11","1","1"],
    ["29","マスタードガサネ","body","12","1","1"],
    ["30","カモガサネ","body","8","1","1"],
    ["31","レイヤード ブラック","body","3","1",""],
    ["32","アイロニックレイヤード","body","1","1","2"],
    ["33","かくれパイレーツ","body","1","1","11"],
    ["34","さくらエビポロ","body","19","1","9"],
    ["35","トリコロールラガー","body","10","1","12"],
    ["36","よもぎポロ","body","18","1","9"],
    ["37","バスケジャージ アウェイ","body","4","1","2"],
    ["38","カレッジスウェット グレー","body","7","1","9"],
    ["39","イカバッテンマスタード","body","13","1","1"],
    ["40","ウーニーズBBシャツ","body","6","1","2"],
    ["41","おどるイカアロハ","body","5","1","6"],
    ["42","シャンブレーシャツ","body","13","1","9"],
    ["43","ロッケンベルグT ホワイト","body","5","2","4"],
    ["44","ガチブラック","body","21","2","1"],
    ["45","ボーダーホワイト","body","10","2","9"],
    ["46","バニーポップ ブラック","body","12","2","5"],
    ["47","ボーダーネイビー","body","1","2","9"],
    ["48","チョコガサネ","body","4","2","12"],
    ["49","ベクトルラインガサネ","body","11","2","12"],
    ["50","オレンジボダーラガー","body","6","2","12"],
    ["51","マウンテンベリー","body","9","2","10"],
    ["52","バスケジャージ ホーム","body","11","2","2"],
    ["53","ホッコリー ネイビー","body","13","2","7"],
    ["54","イカリスウェット","body","18","2","1"],
    ["55","ギンガムチェック ミドリ","body","13","2","5"],
    ["56","シロシャツ","body","5","2","9"],
    ["57","ギンガムチェック アカ","body","3","2","5"],
    ["58","ベイビークラゲシャツ","body","2","2","9"],
    ["59","ブロックストライプシャツ","body","12","2","9"],
    ["60","アーバンベスト イエロー","body","20","2","7"],
    ["61","ジップアップ グリーン","body","9","2","7"],
    ["62","エゾッコパーカー アズキ","body","19","2","5"],
    ["63","スクールブレザー","body","5","2","15"],
    ["64","サムライジャケット","body","8","2","15"],
    ["65","パワードスーツ","body","10","2","15"],
    ["66","ヒーロージャケット レプリカ","body","7","2","14"],
    ["67","タコゾネスプロテクター","body","4","2","14"],
    ["68","ガチホワイト","body","19","3","1"],
    ["69","マウンテンオリーブ","body","21","3","10"],
    ["70","スタジャンロゴマシ","body","1","3","5"],
    ["71","レトロジャッジ","body","2","3","1"],
    ["72","ミスターベースボール","body","8","3","7"],
    ["73","ヴィンテージチェック","body","20","3","4"],
    ["74","マウンテンダウン","body","7","3","10"],
    ["75","アーバンベスト ナイト","body","18","3","7"],
    ["76","ジップアップ カモ","body","10","3","7"],
    ["77","フェスT","body","11","3","1"],
    ["78","ヘッドバンド ホワイト","head","5","1","1"],
    ["79","ウーニーズBBキャップ","head","13","1","8"],
    ["80","キャンプキャップ","head","7","1","10"],
    ["81","ヤコメッシュ","head","2","1","12"],
    ["82","ビバレッジキャップ","head","4","1","8"],
    ["83","エゾッコメッシュ","head","12","1","5"],
    ["84","バックワードキャップ","head","10","1","5"],
    ["85","2ラインメッシュ","head","11","1","3"],
    ["86","ジェットキャップ","head","11","1","7"],
    ["87","ショートビーニー","head","3","1","10"],
    ["88","ウインターボンボン","head","16","1","8"],
    ["89","クロブチ レトロ","head","10","1","9"],
    ["90","イロメガネ","head","15","1","5"],
    ["91","キャンプハット","head","9","1","10"],
    ["92","キャディ サンバイザー","head","6","1","2"],
    ["93","ヤキフグ サンバイザー","head","8","1","7"],
    ["94","バスケバンド","head","14","1","2"],
    ["95","スカッシュバンド","head","1","1","2"],
    ["96","テニスバンド","head","17","1","11"],
    ["97","ランニングバンド","head","4","1","5"],
    ["98","イカベーダーキャップ","head","8","2","8"],
    ["99","カモメッシュ","head","7","2","7"],
    ["100","5パネルキャップ","head","17","2","5"],
    ["101","ボンボンニット","head","12","2","9"],
    ["102","ボーダービーニー","head","14","2","9"],
    ["103","スプラッシュゴーグル","head","2","2","6"],
    ["104","アローバンド ブラック","head","16","2","5"],
    ["105","ダイバーゴーグル","head","1","2","6"],
    ["106","ダテコンタクト","head","8","2","11"],
    ["107","ロブスターブーニー","head","15","2","6"],
    ["108","スタジオヘッドホン","head","3","2","6"],
    ["109","オーロラヘッドホン","head","4","2","6"],
    ["110","スケボーメット","head","11","2","8"],
    ["111","イカパッチン","head","7","2","15"],
    ["112","サムライヘルメット","head","1","2","15"],
    ["113","パワードマスク","head","2","2","15"],
    ["114","ヒーローヘッズ レプリカ","head","6","2","14"],
    ["115","タコゾネススコープ","head","13","2","14"],
    ["116","チドリキャップ","head","14","3","8"],
    ["117","パイロットゴーグル","head","13","3","6"],
    ["118","アローバンド ホワイト","head","9","3","5"],
    ["119","サファリハット","head","3","3","7"],
    ["120","サイクルメット","head","5","3","8"],
    ["121","テンタクルズメット","head","6","3","6"],
    ["122","バイザーメット","head","15","3","8"],
    ["123","タコマスク","head","16","3","6"],
    ["124","フェイスゴーグル","head","17","3","6"],
    ["125","キャンバス ホワイト","foot","11","1","3"],
    ["126","グリッチョ ブルー","foot","2","1","5"],
    ["127","キャンバス バナナ","foot","22","1","3"],
    ["128","シーホース ホワイト","foot","5","1","2"],
    ["129","グリッチョ オレンジ","foot","7","1","5"],
    ["130","キャンバス クマノミ","foot","8","1","3"],
    ["131","キャンバスHi マッシュルーム","foot","24","1","3"],
    ["132","シーホースHi レッド","foot","3","1","2"],
    ["133","シーホースHi ゾンビ","foot","8","1","2"],
    ["134","シーホースHi パープル","foot","9","1","2"],
    ["135","キャンパスHi モロヘイヤ","foot","5","1","3"],
    ["136","ピンクビーンズ","foot","13","1","11"],
    ["137","オレンジアローズ","foot","3","1","12"],
    ["138","ウミウシイエロー","foot","23","1","11"],
    ["139","シアンビーンズ","foot","1","1","11"],
    ["140","ウミウシパープル","foot","6","1","11"],
    ["141","ブラックビーンズ","foot","10","1","11"],
    ["142","オイスタークロッグ","foot","6","1","3"],
    ["143","ブルーベリーコンフォート","foot","4","1","3"],
    ["144","スリッポン ブルー","foot","13","1","3"],
    ["145","スリッポン レッド","foot","12","1","3"],
    ["146","ラバーソール ホワイト","foot","7","1","4"],
    ["147","シーホース ブラックレザー","foot","7","2","2"],
    ["148","シーホース イエロー","foot","22","2","2"],
    ["149","キャンパスHi トマト","foot","23","2","3"],
    ["150","シーホースHi ゴールド","foot","6","2","2"],
    ["151","ホワイトアローズ","foot","9","2","12"],
    ["152","チョコクロッグ","foot","10","2","3"],
    ["153","アケビコンフォート","foot","1","2","3"],
    ["154","トレッキングライト","foot","5","2","10"],
    ["155","モトクロスブーツ","foot","10","2","4"],
    ["156","ヌバックブーツ イエロー","foot","13","2","4"],
    ["157","スリッポン チドリ","foot","2","2","3"],
    ["158","ラバーソール チェリー","foot","24","2","4"],
    ["159","ラバーソール ターコイズ","foot","8","2","4"],
    ["160","スクールローファー","foot","4","2","15"],
    ["161","サムライシューズ","foot","9","2","15"],
    ["162","パワードレッグス","foot","3","2","15"],
    ["163","ヒーローキックス レプリカ","foot","12","2","14"],
    ["164","タコゾネスブーツ","foot","11","2","14"],
    ["165","グリッチョグリーン限定版","foot","4","3","5"],
    ["166","ウミウシレッド","foot","11","3","11"],
    ["167","クレイジーアローズ","foot","24","3","12"],
    ["168","トレッキングプロ","foot","22","3","10"],
    ["169","ヌバックブーツ レッド","foot","12","3","4"],
    ["170","モトクロス ソリッドブルー","foot","23","3","4"]
];

var Cloth = assign({}, EventEmitter.prototype, {
    NAME_INDEX: 1,
    PART_INDEX: 2,
    MAIN_GEAR_ID_INDEX: 3,
    RARE_INDEX: 4,
    BRAND_ID_INDEX: 5,
    /**
     * Get the entire collection of Cloth.
     * @return {object}
     */
    getAll: function() {
        return _clothes;
    },
    getAllWithBrandEffect: function(options = {}){
        var brand_dict = Brand.getHash();
        var gear_dict = Gear.getNameHash();
        var res = [];
        for ( var i in _clothes ){
            var main_gear_id = _clothes[i][this.MAIN_GEAR_ID_INDEX];
            if (options.main_gear_id && options.main_gear_id !== main_gear_id){
                continue;
            }
            var brand_id = _clothes[i][this.BRAND_ID_INDEX];
            var sub_effect = "";
            if (brand_id.length > 0) {
                sub_effect = gear_dict[brand_dict[brand_id][2]];
            }
            res.push({
                'name': _clothes[i][this.NAME_INDEX],
                'rare': _clothes[i][this.RARE_INDEX],
                'part': this.getPartLabel(_clothes[i][this.PART_INDEX]),
                'main_gear': gear_dict[main_gear_id],
                'sub_gear': sub_effect
            });
        }
        return res;
    },
    getPartLabel: function(part){
        switch (part){
            case 'body':
                return 'フク';
            case 'head':
                return 'アタマ';
            case 'foot':
                return 'クツ';
        }
        return null;
    }
});

// Register callback to handle all updates
SplatoolsAppDispatcher.register(function(action) {
    switch(action.actionType) {
    }
});

module.exports = Cloth;
