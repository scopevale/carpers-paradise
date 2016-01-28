import React from 'react';

import BaseComponent from './BaseComponent';

class ErrorPage extends BaseComponent {

  constructor(props) {

    super(props);

    this.state = {
      data: null
    };
  }

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
          Error 404
        </h1>
      </div>
    );

  }
}

export default ErrorPage;
