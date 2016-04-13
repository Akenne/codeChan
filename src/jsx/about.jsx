'use strict';

let React = require('react');

let About = React.createClass({
    displayName: 'stealthChan About',
    render: function() {
      return (
        <div style={{padding: '20px'}}>
          <pre style={{whiteSpace: 'pre-wrap'}}>{`

Hi, I'm Adam Kenneweg and this is stealthChan. Based off the work of Kyle Petrovich, creator of CodeReddit.net, and the design of codereddit.com.

Tips for new users:

Clickable links will underline on hovering. These include,
changeBoard() (to switch boards)
For loop (to show comments inline) (click again to hide)
nextPage() (to advance to the next 25 posts)

You can change the displayed language by clicking on the language defined in the header. It currently cycles between php and javascript 

email: akennewe@uwaterloo.ca

You can support our site by turning off adblock, or donating. Servers aren't cheap

`}
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick"></input>
<input type="hidden" name="hosted_button_id" value="P5RN43ZLQ4BNS"></input>
<input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online."></input>
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></img>
</form><br/><br/><a onClick={() => (this.props.history.goBack())}>{`<`}{`<`} Back to slackin off</a></pre>


          <br></br>
          <br></br>
          <br></br>

        </div>
      );
    }
});

module.exports = About;
