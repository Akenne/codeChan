'use strict';

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Comment from './comment';
import Highlight from 'highlight.js';
var $ = require('jquery');

module.exports = React.createClass({
    displayName: 'codeChan Thread',
    getInitialState: function () {
      return {
        comments: []
      };
    },
    componentDidUpdate: function (prevProps, prevState) {
      this.highlightCode();
    },
    highlightCode: function() {
      let domNode = this.getDOMNode();
      let nodes = domNode.querySelectorAll('.comment');
      if (nodes.length > 0) {
        for (let i = 0; i < nodes.length; i=i+1) {
          Highlight.highlightBlock(nodes[i]);
        }
      }
    },
    toggleComments: function () {
      if (this.state.comments.length) {
        this.setState({comments: [], loading: false});
      } else {
        this.setState({loading: true});
        $.get("http://a.4cdn.org/" + this.props.subreddit + "/thread/" + this.props.no + ".json", function (result) {
          result.posts.shift();
          console.log(result.posts);
          setTimeout(x => this.setState({comments: result.posts, loading: false}), 0);
        }.bind(this));
      }
    },
    shortenedTitle: function() {
      let titleTokens = [];
      if (this.props.sub) {
        titleTokens = this.props.sub.replace("&gt;", "").toLowerCase().substring(0,20).replace(/[^A-Za-z\/\s\s]/gi, '').split(' ');
      } else {
        titleTokens = this.props.semantic_url.substring(0,20).replace(/[^A-Za-z-\s\s]/gi, '').split('-');
      }

      let title = titleTokens.reduce(function(prev, curr) {
        return prev + curr.charAt(0).toUpperCase() + curr.slice(1);
      }, '');
      title = title.charAt(0).toLowerCase() + title.substring(1);
      return title;
    },
    formattedText: function() {
      if (!this.props.com) {
        return '';
      }

      let text = this.props.com.replace(/(\r\n|\n|\r)/gm,"");
      text = text.replace(/<a href=/g, '<a style="color:#cc9393;" href=');
      // text = text.replace(/<\/b>/g, '');
      text = text.replace(/<br>/g, ' <br> ');
      text = text.replace(/<img\b[^>]+>([^<]*(?:(?!<\/a)<[^<]*)*)/g, '');

      // dont split a hrefs
      let ahrefCurrent = 0;
      let ahrefs = (text.match(/<a[^>]*>/g) || []);
      text = text.replace(/<a[^>]*>/g, ' {~~~~~~~~~~~SHIGDIG~~~~~~~~~~~~~~} ');

      text = text.split(" ");
      let new_text = "";
      let current = 0;
      while (current < text.length) {
        let len = 0;
        new_text = new_text + "  ";
        while (current < text.length && len < 80) {
          // replace a hrefs with what they are
          if (text[current] === '{~~~~~~~~~~~SHIGDIG~~~~~~~~~~~~~~}') {
            new_text += ahrefs[ahrefCurrent];
            current += 1;
            ahrefCurrent += 1;
            continue;
          }

          if (text[current] === "<br>"){
            current += 1;
            break;
          } else {
            text[current] = text[current].trim();
            new_text += text[current] + " ";
            len += text[current].length;
            // matches for <b>, <a>...
            let htmls3 = (text[current].match(/<.>/g) || []).length;
            // matches for </b>, </a>
            let htmls4 = (text[current].match(/<\/.>/g) || []).length;
            len = len - (htmls3*3 + htmls4*4);
            current += 1;
          }
        }
        new_text = new_text + "\n";
      }
      return new_text;
    },
    render: function() {
      let commentNodes = this.state.comments.map(childComment => {
        let children = childComment.posts ? childComment.posts : [];
        return (
            <Comment subreddit={this.props.subreddit} key={childComment.no} no={childComment.no} now={childComment.now} name={childComment.name} com={childComment.com} lang={this.props.lang} children={children} space={"  "} />
        );
      });
      let loadingNode = <Comment lang={this.props.lang} author={`codeChan-system`} score={1337} children={[]} text={`Loading comments...`} space={"    "}></Comment>;
      let linkNode = <Link to={`/${this.props.subreddit}?lang=${this.props.lang}` }>{this.props.subreddit}</Link>;
      
      switch (this.props.lang) {
        case 'php':
          return (
            <pre>
              function {this.shortenedTitle()}($replies={this.props.replies}, $board={this.props.subreddit}){' {'}<br/>
                {'  /*'}<br/>
                <span dangerouslySetInnerHTML={{__html: this.formattedText()}} />
                {'  */'}<br/><br/>
                {'  '}$author = "{this.props.name}";<br/>
                {'  '}$link = <a href="http://boards.4chan.org/{this.props.subreddit}/thread/{this.props.no}">"http://boards.4chan.org/{this.props.subreddit}/thread/{this.props.no}"</a>;<br/><br/>
                {'  '}// Click to load comments{'\n'}
                {'  '}<a onClick={this.toggleComments}>for ($numComments = 0; $numComments {'<'}= {this.props.replies}; $numComments++){' {'}</a>
              {'  '}{this.state.loading ? loadingNode : commentNodes}<br/><br/><br/>
                {'  }'}<br/>
              {'}'}
              <br/><br/>
            </pre>
          );
      }

    }
});
