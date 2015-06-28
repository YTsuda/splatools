'use strict';

var SplatoolsApp = require('./SplatoolsApp');
var SplatoolsConstant = require('../constants/SplatoolsConstant');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById(SplatoolsConstant.APP_ELEMENT_ID);

var Routes = (
  <Route handler={SplatoolsApp}>
    <Route name="/" handler={SplatoolsApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
