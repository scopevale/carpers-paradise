import React from 'react';
import BaseComponent from './BaseComponent';

// import superagent from 'superagent';
// import settings from './../utils/Settings';
import PageWrapper from './PageWrapper';
// import UserSearch from './UserSearch';

class ManualTestHarness extends BaseComponent {

  constructor(props) {
    super(props);

    // this._bind('handleChange', 'handleSubmit');
    //
    // global.session = {
    //   apiKey: '0e5dc7c3-47cf-4ddd-89a3-9b0efceaefbe'
    // };
    //
    // this.state = {
    //   username: null,
    //   error: 'Please enter a username'
    // };
  }

  // handleChange(username) {
  //
  //   this.setState({username: username});
  //
  // }

  // handleSubmit() {
  //
  //   let request = superagent.post(`${settings.getSetting('API_BASE_URI')}/v1/security/login-by-user-id`);
  //
  //   request.type('form');
  //
  //   request.send({username: this.state.username, password: 'password', grant_type: 'password', client_id: '00729536-ca8a-4116-af43-8ed36d58942b', client_secret: '2aac1070-bba8-4da3-b631-bf87066fd31e'});
  //
  //   request.set({api_key: global.session.apiKey});
  //
  //   request.set('Accept', 'application/json');
  //
  //   request.end((err, res) => {
  //     if (err) {
  //       return this.setState({error: err.message});
  //     }
  //
  //     global.session = {
  //       customerNumber: res.body.accountIds,
  //       accessToken: res.body.access_token,
  //       expires: res.body.expires_in,
  //       apiKey: global.session.apiKey
  //     };
  //
  //     this.getEndpoints();
  //   });
  //
  //   this.setState({error: 'Loading..'});
  //
  // }

  // getEndpoints() {
  //
  //   let reqStr = `${settings.getSetting('API_BASE_URI')}/v1/customers/${global.session.customerNumber}/endpoints`;
  //
  //   let request = superagent.get(reqStr);
  //
  //   request.set({Authorization: `Bearer ${global.session.accessToken}`, api_key: global.session.apiKey});
  //
  //   request.set('Accept', 'application/json');
  //
  //   request.end((err, res) => {
  //     if (err) {
  //       return this.setState({error: err.message});
  //     }
  //
  //     global.endpoints = JSON.parse(res.text);
  //
  //     this.setState({error: null});
  //   });
  // }

  render() {

    let pageWrapper = (
      <PageWrapper
        pageName={this.props.pageName}
        height={'100%'}
        width={'100%'}
        margin={{
          top: 20,
          bottom: 70,
          left: 20,
          right: 20
        }}
      />
    );

    // if (this.state.error) {
    //   pageWrapper = (
    //     <p>{this.state.error}</p>
    //   );
    // }

    return (
      <div>
        {pageWrapper}
      </div>
    );
  }
}

export default ManualTestHarness;
