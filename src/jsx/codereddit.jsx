'use strict';

require("style!css!../../node_modules/highlight.js/styles/zenburn.css");
require("style!css!../css/reset.css");
var $ = require('jquery');
import React from 'react';
import axios from 'axios';
import Post from './post';
import Highlight from 'highlight.js';
import {Link} from 'react-router';

let LANGS = ['php'];

module.exports = React.createClass({
    displayName: 'codeChan',
    getInitialState: function() {
      return {
        data: [],
        loading: false,
        subreddit: this.props.params.subreddit || 'fit',
        page: this.props.location.query.page || 1,
        lang: this.props.location.query.lang || LANGS[0]
      };
    },
    componentDidMount: function() {
      this.retrieveData();
    },
    componentWillReceiveProps: function(nextProps) {
      this.setState({subreddit: nextProps.params.subreddit || 'fit', lang: nextProps.location.query.lang, page: nextProps.location.query.page});
    },
    componentDidUpdate: function (prevProps, prevState) {
      this.highlightCode();
      if (prevState.subreddit !== this.state.subreddit || prevState.page !== this.state.page) {
        this.retrieveData();
      }
      if (prevState.lang !== this.state.lang) {
        // Reload UI
      }
    },
    highlightCode: function() {
      let domNode = this.getDOMNode();
      let nodes = domNode.querySelectorAll('pre code');
      if (nodes.length > 0) {
        for (let i = 0; i < nodes.length; i=i+1) {
          Highlight.highlightBlock(nodes[i]);
        }
      }
    },
    retrieveData: function() {
      let board = this.state.subreddit;
      this.setState({loading: true});
      $.get("/board/" + board, function (result) {
        this.setState({data: result[this.state.page -1].threads, loading: false});
      }.bind(this));
    },
    handleLanguageChange: function() {
      var langIndex = (LANGS.indexOf(this.state.lang)+1) % LANGS.length;
      this.props.history.pushState(null, '/', {lang: LANGS[langIndex]});
    },
    handleBoardChange: function() {
      document.getElementById('board').style.display = "none";
      document.getElementById('submitButton').style.display = "none";
      var board = document.getElementById('board').value;
      if (board === "") {
        board = this.state.subreddit;
      }
      this.setState({subreddit:board, page:1, loading: false, data:[], lang:'php'});
    },
    render: function() {
      var postNodes = this.state.data.map((post, i) => {
        return (
          <Post {...post} key={i} subreddit={this.state.subreddit} lang={this.state.lang} />
        );
      });

      var loadingNode = (`function loadingChan() {
        // Please be patient!
      }`);
      switch (this.state.lang) {
        case 'php':
          return (
              <pre>
                <code className={this.state.lang}>
                  <Link to={`about`}>require('readme.php');</Link><br/>
                  <Link to={`/${this.state.subreddit}?lang=${this.state.lang}&page=${this.state.page}`}>$location = "{this.state.subreddit}";</Link><br/>
                  <a onClick={ function () {
                      document.getElementById('board').style.display = "";
                      document.getElementById('submitButton').style.display = "";
                      var linebreak = document.createElement("br");
                      document.getElementById('fawas').appendChild(linebreak);
                  }}>changeBoard()</a>;<br/>
                  <div>
                    <input type="text" id="board" style={{height: "9px", width: "25px", display: "none"}}></input>
                    <input style={{display: "none"}} type="submit" id="submitButton" value="Submit" onClick={this.handleBoardChange}></input>
                  </div>
                  $page = "{this.state.page}";<br/>
                  $language = <a onClick={this.handleLanguageChange}>"{this.state.lang}"</a>;<br/>
                  <Link to={`/${this.state.subreddit}?lang=${this.state.lang}&page=${parseInt(this.state.page) + 1}`}>nextPage();</Link><br/>
                  <br/>
                  {this.state.loading ? loadingNode : postNodes}
                  <Link to={`/${this.state.subreddit}?lang=${this.state.lang}&page=${parseInt(this.state.page) + 1}`}>nextPage();</Link><br/>
                </code>
              </pre>
          );
      }
    }
});
