'use strict';

let React = require('react');

let About = React.createClass({
    displayName: 'CodeReddit About',
    render: function() {
      return (
        <div style={{padding: '20px'}}>
          <pre style={{whiteSpace: 'pre-wrap'}}>{`

Hi, I'm Adam Kenneweg and this is codeChan. Based off the work of Kyle Petrovich, creator of CodeReddit.net, and the design of codereddit.com.

Tips for new users:

Clickable links will underline on hovering. These include,
changeBoard() (to switch boards)
For loop (to show comments inline) (click again to hide)
nextPage() (to advance to the next 25 posts)

// You can change the displayed language by clicking on the language defined in the header. It currently cycles between php, csharp, xml, python. 
i am lazy so no language changes. email
You can support our site by turning off adblock. 

`}<a onClick={() => (this.props.history.goBack())}>{`<`}{`<`} Back to slackin off</a></pre>
          <br></br>
          <br></br>
          <br></br>

        </div>
      );
    }
});

module.exports = About;
