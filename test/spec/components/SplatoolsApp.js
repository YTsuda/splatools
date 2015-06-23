'use strict';

describe('SplatoolsApp', function () {
  var React = require('react/addons');
  var SplatoolsApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    SplatoolsApp = require('components/SplatoolsApp.js');
    component = React.createElement(SplatoolsApp);
  });

  it('should create a new instance of SplatoolsApp', function () {
    expect(component).toBeDefined();
  });
});
