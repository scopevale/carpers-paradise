import React from 'react';

import BaseComponent from './BaseComponent';

class HomePage extends BaseComponent {

  constructor(props) {

    super(props);

    this.state = {
      data: null
    };
  }

  // static propTypes = {
  //   property: React.PropTypes.TYPE.isRequired,
  //   // ...
  // }

  componentDidMount() {

    this.mounted = true;
  }

  componentWillUnmount() {

    this.mounted = false;
  }

  render() {

    return (
      <div
        className="l-site-content__SitePage"
      >
        <h1>
          Carper's Paradise
        </h1>
      </div>
    );

  }
}

export default HomePage;
