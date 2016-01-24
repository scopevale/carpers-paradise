import React from 'react';
import ReactDOM from 'react-dom';

import TestHarnessWrapper from './components/TestHarnessWrapper';

console.log('here in app.jsx');

ReactDOM.render(
    <TestHarnessWrapper pageName={global.pageName} testType={global.testType}/>,
    document.getElementsByClassName('page-container')[0]
);
