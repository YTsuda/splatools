'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var _ = require('underscore');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var DropDownMenu = mui.DropDownMenu;
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;


// CSS
//require("bootstrap-webpack");
require('normalize.css');
require('../styles/main.scss');

// Action Creators
var SplatoolsActionCreators = require('../actions/SplatoolsActionCreators');

// Stores
var Cloth = require('../stores/Cloth');
var Gear = require('../stores/Gear');

function getClothState() {
  return {
    'all_clothes': Cloth.getAllWithBrandEffect(),
    'gears': Gear.getAll(),
    'parts': Cloth.getParts(),
    'selected_main_gear': null,
    'selected_part': null
  };
}

var SplatoolsApp = React.createClass({

  // material design theme
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  // initial state
  getInitialState: function(){
    return getClothState();
  },

  // listen store
  componentDidMount: function() {
    Cloth.addChangeListener(this._onClothStoreChange);
  },
  componentWillUnmount: function() {
    Cloth.removeChangeListener(this._onClothStoreChange);
  },
  _onClothStoreChange: function(){
    var clothes = Cloth.getAllWithBrandEffect();
    this.setState({all_clothes: clothes});
  },

  // to action creator
  _onChangeMainGear: function (e) {
    var query = {selected_main_gear: e.target.value};
    this.setState(query);
    this._fireFilterAction(query);
  },
  _onChangePart: function (e) {
    var query = {selected_part: e.target.value};
    this.setState(query);
    this._fireFilterAction(query);
  },
  _fireFilterAction: function(input_query){
    var query = _.extend({
      'selected_main_gear': this.state.selected_main_gear,
      'selected_part': this.state.selected_part
    }, input_query);
    SplatoolsActionCreators.updateClothFilter(query);
  },
  render: function() {
    var rows = [];
    for (var i in this.state.all_clothes) {
      var cl = this.state.all_clothes[i];
      var rare_stars = "";
      for (var k = 0; k < cl.rare; k++ ) {
        rare_stars += '★';
      }
      rows.push(
          <tr>
            <td>
              <p className="name">{cl.name}</p>
              <p className="part">{cl.part}<span className="stars">{rare_stars}</span></p>
            </td>
            <td className="main-gear">{cl.main_gear}</td>
            <td className="sub-gear">{cl.sub_gear}</td>
          </tr>
      );
    }
    var gear_options = [];
    gear_options.push(<option value="">メインギアを選ぶ</option>);
    for (var j in this.state.gears) {
      gear_options.push(
            <option value={this.state.gears[j][0]}>{this.state.gears[j][1]}</option>
      );
    }

    var part_options = [];
    part_options.push(<option value="">部位を選ぶ</option>);
    part_options.push(this.state.parts.map(function(part){
      return <option value={part}>{Cloth.getPartLabel(part)}</option>;
    }));

    var gear_items = [{payload: null, text: '(メインギアを選ぶ)'}];
    gear_items = gear_items.concat(this.state.gears.map(function(row){
      return {payload: row[0], text: row[1]};
    }));

    var part_items = [{payload: null, text: '(部位を選ぶ)'}];
    part_items = part_items.concat(this.state.parts.map(function(part){
      return {payload: part, text: Cloth.getPartLabel(part)};
    }));
    /*
    var onChangeDropDown = function(){
      console.log('mos');
    };
     <select name="main_gear" value={this.state.selected_main_gear} onChange={this._onChangeMainGear}>{gear_options}</select>
     <select name="part" value={this.state.selected_part} onChange={this._onChangePart}>{part_options}</select>
    */

    return (
      <div className='main'>
        <h1 className='side-margin'>スプラトゥーンのそうび/ギア対応表</h1>
        <p className='side-margin'>そうび（アタマ、フク、クツ）とメインギア、サブにつきやすいギアの対応表です。サブにつきやすいギアはブランドごとに設定されているようです。</p>
        <div><span>メインギア</span><DropDownMenu menuItems={gear_items} /></div>
        <div><span>部位を選ぶ</span><DropDownMenu menuItems={part_items} /></div>
        <table className="cloth-table"><tbody>
          <tr>
            <th>名前</th>
            <th>メインギア</th>
            <th>サブにつきやすいギア</th>
          </tr>
          {rows}
        </tbody></table>
        <footer>
          <p className="side-margin">ご意見は <a target="_blank" href="https://twitter.com/splatools">@splatools</a> まで</p>
        </footer>
      </div>
    );
  }
});

module.exports = SplatoolsApp;
