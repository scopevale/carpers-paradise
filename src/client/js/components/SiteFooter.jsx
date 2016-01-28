import React from 'react';

import BaseComponent from './BaseComponent';

class SiteFooter extends BaseComponent {

  constructor() {

    super();
    // this._bind('_handleClick', '_handleFoo');

    // set initial state
    // this.state = {
    //   property: value
    // };

  }

  // static propTypes = {
  //   property: React.PropTypes.TYPE.isRequired,
  //   // ...
  // }

  render() {

    return (
      <div className="l-site-footer hide-for-mobile">The Site Footer  shown on every page</div>
    );

  }
}

export default SiteFooter;
