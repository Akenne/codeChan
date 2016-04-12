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

Comments/Questions/Suggestions? Send me a PM, DunningKruger_Effect, on reddit. 

Share the site with your friends, co-workers, and family!
FacebookRedditTwitterPinterestGoogle+Email


            CodeReddit Reborn is a gag site where you can browse reddit while appearing to be working on code. It was made by `}<a href="http://kpetrovi.ch">Kyle Petrovich</a>{` as a way to practice using`} <del>jQuery</del> {`React.

It was inspired in part by MSWorddit.com and the original codereddit.com (which appears to be up again but using my jQuery iteration of this site).

It is available on `}<a href={`https://github.com/fozzle/codereddit`}>Github</a>{`, and I'd love to see it improved upon...I sort of just work on it when I'm bored. Let me know in Github issues if you encounter any major bugs. I'm sure there are many.

Usage:

You can switch subreddits by clicking on a subreddit from the front page, or changing the url to /#/<subreddit name here>.
You can change 'languages' by clicking the language string on the top of the page.
Return to the front page by clicking on "location" near the top.
Comments can be found by clicking the "for" loop in the "function"


`}<a onClick={() => (this.props.history.goBack())}>{`<`}{`<`} Back to slackin off</a></pre>
          <br></br>
          <br></br>
          <br></br>

        </div>
      );
    }
});

module.exports = About;
