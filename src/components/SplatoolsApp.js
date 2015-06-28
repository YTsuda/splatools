'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

var _ = require('underscore');
require('lazysizes');

// material-ui
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// Material UI
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var DropDownMenu = mui.DropDownMenu;
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;


// stickey header
var Sticky = require('react-sticky');

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
      var cloth_image_url = '';
      var part_display = '';
      if (cl.has_image === "1") {
        cloth_image_url = "/images/clothes/" + cl.id + ".jpg";
      }else{
        cloth_image_url = "/images/clothes/no_image.jpg";
        part_display = <div className="part">{cl.part}</div>;
      }
      var sub_gear_img = '';
      if (cl.sub_gear_id) {
        sub_gear_img = <img src={"/images/gears/" + cl.sub_gear_id + ".jpg"} alt={cl.sub_gear} />;
      }
      rows.push(
          <li>
            <div className="photo"><img className="lazyload" src="/images/clothes/no_image.jpg" data-src={cloth_image_url} alt={cl.name} />{part_display}</div>
            <div className="main">
              <p className="name">{cl.name}</p>
              <div className="gears">
                <div className="main-gear">
                  <img className="lazyload" src={"/images/gears/" + cl.main_gear_id + ".jpg"} alt={cl.main_gear} />
                </div>
                <div className="sub-gear"><span>出やすい<br />サブギア</span>{sub_gear_img}</div>
              </div>
            </div>
          </li>
      );
    }
    var gear_options = [];
    gear_options.push(<option value="">すべてのメインギア</option>);
    for (var j in this.state.gears) {
      gear_options.push(
            <option value={this.state.gears[j][0]}>{this.state.gears[j][1]}</option>
      );
    }

    var part_options = [];
    part_options.push(<option value="">すべての部位</option>);
    part_options.push(this.state.parts.map(function(part){
      return <option value={part}>{Cloth.getPartLabel(part)}</option>;
    }));

    return (
      <div className='main'>
        <h1 className='side-margin page-title'>スプラトゥーンのそうび/ギア対応表</h1>
        <p className='side-margin'>そうび（アタマ、フク、クツ）とメインギア、サブスロットに出やすいギアの対応表です。</p>
        <Sticky>
          <header className="filters">
            <form>
              <select name="main_gear" value={this.state.selected_main_gear} onChange={this._onChangeMainGear}>{gear_options}</select>
              <select name="part" value={this.state.selected_part} onChange={this._onChangePart}>{part_options}</select>
              <a className="to-gear-description" target="_blank" href="http://wikiwiki.jp/splatoon2ch/?%A5%AE%A5%A2%A5%D1%A5%EF%A1%BC">ギア<br />説明</a>
            </form>
          </header>
        </Sticky>
        <ul className="cloth-list side-margin">{rows}</ul>
        <footer>
          <p className="side-margin">ご意見は <a target="_blank" href="https://twitter.com/splatools">@splatools</a> まで</p>
        </footer>
      </div>
    );
  }
});

module.exports = SplatoolsApp;
