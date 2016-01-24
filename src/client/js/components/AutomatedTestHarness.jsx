import React from 'react';
import BaseComponent from './BaseComponent';

//import fauxJax from 'faux-jax';
//import querystring from 'querystring';

//import testData from './../utils/TestData';
import PageWrapper from './PageWrapper';

class AutomatedTestHarness extends BaseComponent {

  constructor(props) {
    super(props);

    // let qs = global.location.search;
    //
    // if (qs[0] === '?') {
    //   qs = qs.substring(1);
    // }
    //
    // let query = querystring.parse(qs);
    //
    // global.session = {
    //   customerNumber: query.username,
    //   accessToken: 'fake access token',
    //   apiKey: 'fake api key'
    // };
    //
    // global.endpoints = {
    //   endpoints: [
    //     {
    //       type: 'MPAN',
    //       active: Boolean(testData[global.session.customerNumber].electricity)
    //     }, {
    //       type: 'MPRN',
    //       active: Boolean(testData[global.session.customerNumber].gas)
    //     }
    //   ]
    // };
    //
    // fauxJax.install();
    //
    // fauxJax.on('request', respond);
    //
    // function respond(request) {
    //
    //   let start = request.requestURL.lastIndexOf('/');
    //   let end = request.requestURL.indexOf('?');
    //
    //   if (request.requestHeaders.Authorization === `Bearer ${global.session.accessToken}` && request.requestHeaders.api_key === global.session.apiKey) {
    //
    //     let usageType = request.requestURL.substring(start + 1, end);
    //
    //     request.respond(200, {
    //       'Content-Type': 'application/json' // headers
    //     }, testData[global.session.customerNumber][usageType]);
    //   }
    // }
  }

  render() {

    return (<PageWrapper pageName={this.props.pageName} height={500} width={1000} margin={{
      top: 20,
      bottom: 70,
      left: 20,
      right: 20
    }}/>);
  }
}

export default AutomatedTestHarness;
