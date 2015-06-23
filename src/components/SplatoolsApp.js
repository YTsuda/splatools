'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
require('../styles/main.scss');

// Stores
var Cloth = require('../stores/Cloth');
var Gear = require('../stores/Gear');

function getClothState() {
  return {
    'all_clothes': Cloth.getAllWithBrandEffect(),
    'gears': Gear.getAll(),
    'selected_main_gear': null
  };
}

var SplatoolsApp = React.createClass({

  getInitialState: function(){
    return getClothState();
  },
  _onChangeMainGear: function (e) {
    var selected_gear_id = e.target.value;
    var clothes = Cloth.getAllWithBrandEffect({'main_gear_id': selected_gear_id});
    this.setState({all_clothes: clothes});
    this.setState({selected_main_gear: e.target.value});
  },
  render: function() {
    var rows = [];
    for (var i in this.state.all_clothes) {
      var cl = this.state.all_clothes[i];
      var rare_stars = "";
      for (var k = 0; k < cl.rare; k++ ) {
        rare_stars += '★';
      }
      console.log(rare_stars);
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
    var options = [];
    options.push(<option value="">メインギアで絞り込む</option>);
    for (var j in this.state.gears) {
      options.push(
            <option value={this.state.gears[j][0]}>{this.state.gears[j][1]}</option>
      );
    }
    return (
      <div className='main'>
        <h1 className='side-margin'>スプラトゥーンのそうび/ギア対応表</h1>
        <p className='side-margin'>そうび（アタマ、フク、クツ）とメインギア、サブにつきやすいギアの対応表です。サブにつきやすいギアはブランドごとに設定されているようです。</p>
        <form className="refiner" name="search">
          <select name="main_gear" value={this.state.selected_main_gear} onChange={this._onChangeMainGear}>{options}</select>
        </form>
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
