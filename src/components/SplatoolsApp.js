'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

var SplatoolsConstant = require('../constants/SplatoolsConstant');

var _ = require('underscore');
require('lazysizes');

// Modal
var Modal = require('react-modal');
Modal.setAppElement(document.getElementById(SplatoolsConstant.APP_ELEMENT_ID));
Modal.injectCSS();


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
    'selected_part': null,
    'helpIsOpen': false
  };
}

var SplatoolsApp = React.createClass({
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
  openHelp: function(e){
    e.preventDefault();
    this.setState({'helpIsOpen': true});
  },
  closeHelp: function(e){
    e.preventDefault();
    this.setState({'helpIsOpen': false});
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

      // そうびの画像部分
      var cloth_image_url = '';
      var part_name = '';
      if (cl.has_image === "1") {
        cloth_image_url = "/images/clothes/" + cl.id + ".jpg";
      }else{
        cloth_image_url = "/images/clothes/no_image.jpg";
        part_name = <div className="part">{cl.part}</div>;
      }

      // つきやすいサブギア
      var sub_gear = '';
      if (cl.sub_gear_id) {
        sub_gear = <div className="sub-gear"><span>出やすい<br />サブギア</span><i className={"gear gear-half gear-half-" + cl.sub_gear_id}></i></div>;
      }

      rows.push(
          <li>
            <div className="photo"><img className="lazyload" src="/images/clothes/no_image.jpg" data-src={cloth_image_url} alt={cl.name} />{part_name}</div>
            <div className="main">
              <p className="name">{cl.name}</p>
              <div className="gears">
                <div className="main-gear">
                  <i className={"gear gear-half gear-half-" + cl.main_gear_id}></i>
                </div>{sub_gear}
              </div>
            </div>
          </li>
      );
    }

    // ヘッダの絞り込みパート
    var gear_options = [];
    gear_options.push(<option value="">すべてのメインギア</option>);
    _.each(this.state.gears, function(g) {
      gear_options.push( <option value={g.id}>{g.name}</option> );
    });
    var part_options = [];
    part_options.push(<option value="">すべての部位</option>);
    part_options.push(this.state.parts.map(function(part){
      return <option value={part}>{Cloth.getPartLabel(part)}</option>;
    }));

    //ギア解説
    var gear_descriptions = this.state.gears.map(function(g){
      return <tr>
        <td><i className={"gear gear-half gear-half-" + g.id}></i></td>
        <td>{g.name}</td>
      </tr>;
    });

    return (
      <div className='main'>
        <h1 className='side-margin page-title'>スプラトゥーンのそうび/ギア対応表</h1>
        <p className='side-margin'>そうび（アタマ、フク、クツ）とメインギア、サブスロットに出やすいギアの対応表です。</p>
        <Sticky>
          <header className="filters">
            <form>
              <select name="main_gear" value={this.state.selected_main_gear} onChange={this._onChangeMainGear}>{gear_options}</select>
              <select name="part" value={this.state.selected_part} onChange={this._onChangePart}>{part_options}</select>
              <button className="to-gear-description" onClick={this.openHelp}>ギア<br />説明</button>
            </form>
          </header>
        </Sticky>
        <ul className="cloth-list side-margin">{rows}</ul>
        <Modal isOpen={this.state.helpIsOpen} onRequestClose={this.closeHelp}>
          <button className="close-modal" onClick={this.closeHelp}>X 閉じる</button>
          <table className="gear-descriptions"><tbody>{gear_descriptions}</tbody></table>
        </Modal>
        <footer>
          <p className="side-margin">ご意見は <a target="_blank" href="https://twitter.com/splatools">@splatools</a> まで</p>
        </footer>
      </div>
    );
  }
});

module.exports = SplatoolsApp;
