import React from 'react';

//import ReactDOM from 'react-dom';
//import d3 from 'd3';
//import _ from 'lodash';

import BaseComponent from './BaseComponent';


class SiteHeader extends BaseComponent {

  constructor() {

    super();
    //this._bind('_handleClick', '_handleFoo');

    // set initial state
    // this.state = { property: value };

  }

  // static propTypes = {
  //   property: React.PropTypes.TYPE.isRequired,
  //   // ...
  // }

  render() {

    return (
      <div className="l-site-header hide-for-mobile">
        <div className="l-site-header_Contact">
          <p>
            <span>
              <span className="inline-icon icon-1x no-link">
                <i className="icon-budicon-714 icon-1x"></i>
              </span>
              07580 583 500
            </span>
            <span>
              <span className="inline-icon icon-1x no-link">
                <i className="icon-budicon-766 icon-1x"></i>
              </span>
              <a href="mailto:info@carpersparadise.com">info@carpersparadise.com</a>
            </span>
          </p>
        </div>
        <div className="l-site-header_SocialMedia">
          <aside className="social">
            <a href="https://www.facebook.com/carpersparadise" className="boxed-icon facebook icon-1x">
              <i className="icon-budicon-834"></i>
            </a>
            <a href="https://twitter.com/carpersparadise" className="boxed-icon twitter icon-1x">
              <i className="icon-budicon-841"></i>
            </a>
          </aside>
          <aside className="headersearch">
            <span>
              <i className="icon-budicon-545"></i>
              <form method="get" className="searchform" action="http://www.carpersparadise.com/">
                <fieldset>
                  <input name="s" type="text" id="s" placeholder="Search" className="small-12" />
                </fieldset>
              </form>
            </span>
          </aside>
        </div>
      </div>
    );
  }
}

export default SiteHeader;
