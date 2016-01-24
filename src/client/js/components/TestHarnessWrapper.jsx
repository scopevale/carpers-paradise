import React from 'react';
import BaseComponent from './BaseComponent';

import ManualTestHarness from './ManualTestHarness';
import AutomatedTestHarness from './AutomatedTestHarness';




const TEST_TYPES = {
  'manual': ManualTestHarness,
  'automated': AutomatedTestHarness
};

class TestHarnessWrapper extends BaseComponent {

  render() {

    let PageType = TEST_TYPES[this.props.testType];

    return (<PageType pageName={this.props.pageName}/>);
  }
}

TestHarnessWrapper.defaultProps = {
  testType: 'manual',
  page: 'home'
};

export default TestHarnessWrapper;
