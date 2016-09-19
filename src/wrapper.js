var React = require('react'),
    ReactRedux = require('react-redux'),
    api = require('./steemAPI'),
    actions = require('./actions'),
    Sidebar = require('./app/sidebar');

import * as authActions from './auth/authActions';

var Wrapper = React.createClass({
  componentWillMount: function(){
    this.props.getConfig();
    this.props.login();
  },

  componentDidMount: function(){
    this.steemInterval = setInterval(function() {
      api.getDynamicGlobalProperties(function(err, result) {});
    }, 10000);
  },

  componentWillUnmount() {
    if(window.clearInterval) {
      clearInterval(this.steemInterval);
    }
  },

  render: function() {
      var className = (!this.props.app.sidebarIsVisible)? 'app-wrapper full-width' : 'app-wrapper';
      return (
        <div className={className}>
          {this.props.app.sidebarIsVisible && <Sidebar />}
          {this.props.children}
        </div>
      );
  }
});

var mapStateToProps = function({ app }){
  return {
    app
  };
};

var mapDispatchToProps = function(dispatch){
  return {
    login: () => {
      dispatch(
        authActions.login()
      );
    },
    getConfig: () => {
      dispatch(
        actions.getConfig()
      );
    }
  }
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Wrapper);