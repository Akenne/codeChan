'use strict';

let React = require('react');

let Comment = React.createClass({
    displayName: 'codeChan Reply',
    formatCommentText: function(){
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
        new_text = new_text + "    ";
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
      let commentNodes = this.props.children.map(childComment => {
        let children = childComment.data.replies ? childComment.data.replies.data.children : [];
        return (
          <Comment key={childComment.data.id} children={children} author={childComment.data.author} lang={this.props.lang} score={childComment.data.score} text={childComment.data.body} space={this.props.space + "    "}/>
        );
      });

      switch (this.props.lang) {
        case 'php':
          return (
            <pre>
              {'    '}<span style={{color: '#efdcbc'}}>$author</span> = "{this.props.name}"; <span style={{color: '#efdcbc'}}>$postNum</span> = "{this.props.no}";<br/>
              {'    /*'}<br/>
              <span dangerouslySetInnerHTML={{__html: this.formatCommentText()}} />
              {'    */'}<br/><br/>
            </pre>
          );
      }

    }
});

module.exports = Comment;
