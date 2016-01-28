import sinon from 'sinon';
import chai from 'chai';
import subset from 'chai-subset';

import {
  shallow, mount
}
from 'enzyme';
import React from 'react';

import HomePage from './../../../../src/client/js/components/HomePage.jsx';

let expect = chai.expect;
chai.use(subset);

describe('<HomePage />', () => {

  context('constructor', () => {

    it('should set data to null', sinon.test(function () {

      let target = new HomePage();

      expect(target.state.data).to.be.null;

    }));

  });

  context('componentDidMount', () => {

    // it('should set state from the result of the dataService', sinon.test(function () {
    //
    //     let fakeData = {
    //
    //     };
    //     let fakeTitle = 'Page Title';
    //
    //     this.stub(dataService, 'getUsageData').callsArgWith(1, null, fakeData);
    //
    //     let target = mount(<UsageGraphWrapper />);
    //
    //     expect(target.state('data')).to.equal(fakeData);
    //
    // }));

    it('should set mounted to true', sinon.test(function () {

      let target = mount( <HomePage /> );

      expect(target.instance().mounted).to.be.true;
    }));

    // it('should not set state from the result of the dataService if not mounted', sinon.test(function() {
    //
    //     let fakeData = {
    //         x: [],
    //         y: [],
    //         max: 0
    //     };
    //
    //     let returnFromDataService;
    //
    //     this.stub(dataService, 'getUsageData', (options, cb) => {
    //
    //         returnFromDataService = () => {
    //             cb(null, fakeData);
    //         };
    //     });
    //
    //     let target = mount(<UsageGraphWrapper />);
    //
    //     target.instance().mounted = false;
    //
    //     returnFromDataService();
    //
    //     expect(target.state('data')).to.equal(null);
    //
    // }));

  });

  context('componentWillUnmount', () => {

    it('should set mounted to false', sinon.test(function () {

      let target = mount( < HomePage / > );

      expect(target.instance().mounted).to.be.true;

      target.instance().componentWillUnmount();

      expect(target.instance().mounted).to.be.false;

    }));

  });

  context('render', () => {

    // it('should render <p>Loading...</p> when data null', sinon.test(function() {
    //
    //     let target = shallow(<HomePage />);
    //
    //     expect(target.is('p')).to.be.ok;
    //
    //     expect(target.text()).to.equal('Loading...');
    //
    // }));

    it('should render <HomePage /> with an H1 contaning the text "Carper\'s Paradise"', sinon.test(function () {

      let target = shallow( < HomePage / > );

      expect(target.find('h1').is('h1')).to.be.ok;

      expect(target.find('h1').text()).to.equal('Carper\'s Paradise');
    }));


  });

});
