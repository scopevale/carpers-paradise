import sinon from 'sinon';
import chai from 'chai';
import subset from 'chai-subset';

import { shallow, mount } from 'enzyme';
import React from 'react';
import ReactDom from 'react-dom';

import dataService from './../../../../src/client/js/utils/DataService';
import dataFilter from './../../../../src/client/js/utils/DataFilter';
import PageWrapper from './../../../../src/client/js/components/PageWrapper.jsx';

let expect = chai.expect;
chai.use(subset);

describe('<PageWrapper />', () => {

  context('constructor', () => {

    it('should set default state', sinon.test(function () {

      let fakeWidth = '1001%';
      let fakeData = null;

      let target = new PageWrapper({
        width: fakeWidth
      });

      expect(target.state.data).to.equal(fakeData);
      expect(target.state.width).to.equal(fakeWidth);
    }));

  });

  context('handleResize', () => {

    //I couldn't write this in the normal sinon.test way because it
    // appears that sinon.test doesn't play well with mocha async
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should be throttled to only call once every 300ms', function (done) {

      let handleResizeSpy = sandbox.stub(ReactDom, 'findDOMNode').returns({
        offsetWidth: '1001%'
      });

      let fakeData = {
        data: {
          title: 'Page Title'
        },
        width: '1001%'
      };

      sandbox.stub(dataFilter, 'filterYTypes').returns(fakeData);
      sandbox.stub(dataService, 'getUsageData').callsArgWith(1, null, fakeData);

      let target = shallow( <PageWrapper
                              pageName="home"
                            />
                          );

      handleResizeSpy.reset();

      target.instance().handleResize();
      target.instance().handleResize();

      expect(handleResizeSpy.callCount).to.equal(1);

      setTimeout(() => {

        target.instance().handleResize();

        expect(handleResizeSpy.callCount).to.equal(2);

        done();

      }, 300);

    });
  });

  context('componentDidMount', () => {

    it('should set state.data from the result of the dataService', sinon.test(function () {

      let fakeData = {
        title: 'Page Title'
      };

      this.stub(dataFilter, 'filterYTypes').returns(fakeData);

      this.stub(dataService, 'getUsageData').callsArgWith(1, null, fakeData);

      let target = mount( <PageWrapper pageName="home" /> );

      expect(target.state('data')).to.deep.equal(fakeData);

    }));

    it('should not set state.data if not mounted', sinon.test(function () {

      let fakeData = {
        data: null
      };

      let returnFromDataService = () => {};

      this.stub(dataService, 'getUsageData', (options, cb) => {

        returnFromDataService = () => {
          cb(null, fakeData);
        };
      });

      let target = shallow( <PageWrapper pageName="home" /> );

      target.instance().mounted = false;

      returnFromDataService();

      console.log('state.data:', target.state('data'));

      expect(target.state('data')).to.equal(null);

    }));

    it('should set state.width from DOM offsetWidth', sinon.test(function () {

      this.stub(dataService, 'getUsageData').callsArgWith(1, '');

      this.stub(ReactDom, 'findDOMNode').returns({
        offsetWidth: 10000
      });

      let target = mount( <PageWrapper
                            pageName="home"
                          />
                        );

      expect(target.state('width')).to.equal(10000);

    }));

    it('should addEventListener to window resize event', sinon.test(function () {

      let windowSpy = this.spy(global.window, 'addEventListener');

      this.stub(dataService, 'getUsageData').callsArgWith(1, '');

      this.stub(ReactDom, 'findDOMNode').returns({});

      let target = mount( <PageWrapper pageName="home" /> );

      expect(windowSpy.calledOnce).to.be.ok;
      expect(windowSpy.calledWith('resize', target.instance().handleResize)).to.be.ok;
    }));

  });


  context('componentWillUnmount', () => {

    it('should set mounted to false', sinon.test(function () {

      this.stub(dataService, 'getUsageData').callsArgWith(1, '');

      let target = mount( <PageWrapper pageName="home" /> );

      expect(target.instance().mounted).to.be.true;

      target.instance().componentWillUnmount();

      expect(target.instance().mounted).to.be.false;

    }));

    it('should addEventListener to window resize event', sinon.test(function () {

      let windowSpy = this.spy(global.window, 'removeEventListener');

      this.stub(dataService, 'getUsageData').callsArgWith(1, '');

      this.stub(ReactDom, 'findDOMNode').returns({});

      let target = mount( <PageWrapper pageName="home" /> );

      target.instance().componentWillUnmount();

      expect(windowSpy.calledOnce).to.be.ok;
      expect(windowSpy.calledWith('resize', target.instance().handleResize)).to.be.ok;
    }));

  });

  context('render', () => {

    it('should render <div> container', sinon.test(function () {

      let target = shallow( <PageWrapper /> );

      expect(target.is('div')).to.be.ok;

      expect(target.prop('className')).to.equal('l-site-content');
    }));

    it('should render <HomePage /> when pageName is home', sinon.test(function () {

      let fakeData = {
        data: {
          title: 'Page Title'
        },
        width: '1001%'
      };

      let target = shallow( <PageWrapper
                            pageName="home"
                            data={fakeData.data}
                            width={fakeData.width}
                            />
                          );

      let children = target.find('div').children();

      expect(target.is('div')).to.be.ok;

      let siteHeader = children.at(0);
      expect(siteHeader.is('SiteHeader')).to.be.ok;

      let homePage = children.at(1);
      expect(homePage.is('HomePage')).to.be.ok;
      let siteFooter = children.at(2);
      expect(siteFooter.is('SiteFooter')).to.be.ok;
    }));

    it('should render <BookingPage /> when pageName is booking', sinon.test(function () {

      let fakeData = {
        data: {
          title: 'Page Title'
        },
        width: '1001%'
      };

      let target = shallow( <PageWrapper
                              pageName="booking"
                              data={fakeData.data}
                              width={fakeData.width}
                            />
                          );

      let children = target.find('div').children();

      expect(target.is('div')).to.be.ok;

      let siteHeader = children.at(0);
      expect(siteHeader.is('SiteHeader')).to.be.ok;
      let bookingPage = children.at(1);
      expect(bookingPage.is('BookingPage')).to.be.ok;
      let siteFooter = children.at(2);
      expect(siteFooter.is('SiteFooter')).to.be.ok;
    }));

    it('should render <ErrorPage /> when pageName is missing or incorrect', sinon.test(function () {

      let fakeData = {
        data: {
          title: 'Page Title'
        },
        width: '1001%'
      };

      let target = shallow( <PageWrapper
                              //pageName="badurl"
                              data={fakeData.data}
                              width={fakeData.width}
                            />
                          );

      let children = target.find('div').children();

      expect(target.is('div')).to.be.ok;

      let siteHeader = children.at(0);
      expect(siteHeader.is('SiteHeader')).to.be.ok;
      let errorPage = children.at(1);
      expect(errorPage.is('ErrorPage')).to.be.ok;
      let siteFooter = children.at(2);
      expect(siteFooter.is('SiteFooter')).to.be.ok;

      target = shallow( <PageWrapper
                          pageName="badurl"
                          data={fakeData.data}
                          width={fakeData.width}
                        />
                      );

      children = target.find('div').children();

      expect(target.is('div')).to.be.ok;

      siteHeader = children.at(0);
      expect(siteHeader.is('SiteHeader')).to.be.ok;
      errorPage = children.at(1);
      expect(errorPage.is('ErrorPage')).to.be.ok;
      siteFooter = children.at(2);
      expect(siteFooter.is('SiteFooter')).to.be.ok;
    }));
  });

});
