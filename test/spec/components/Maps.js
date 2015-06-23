'use strict';

describe('Maps', function () {
  var React = require('react/addons');
  var Maps, component;

  beforeEach(function () {
    Maps = require('components/Maps.js');
    component = React.createElement(Maps);
  });

  it('should create a new instance of Maps', function () {
    expect(component).toBeDefined();
  });
});
