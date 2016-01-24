import React from 'react';
import ReactDOM from 'react-dom';

class TestHarness extends React.Component {

  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8"/>
          <link rel="stylesheet" href="css/style.css"/>
        </head>
        <body>
          <div className="page-container"></div>
          <script dangerouslySetInnerHTML={{
            __html: `window.testType="${this.props.testType}"`
          }}></script>
          <script dangerouslySetInnerHTML={{
            __html: `window.pageName="${this.props.pageName}"`
          }}></script>
          <script src="js/svg4everybody.js"></script>
          <script>
            svg4everybody();
          </script>
          <script src="js/app.js"></script>
        </body>
      </html>
    );
  }
}

export default TestHarness;
