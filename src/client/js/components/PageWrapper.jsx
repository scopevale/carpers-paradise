import React from 'react';
import ReactDOM from 'react-dom';
import BaseComponent from './BaseComponent';

import _ from 'lodash';

import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

import HomePage from './HomePage';
import BookingPage from './BookingPage';
import ErrorPage from './ErrorPage';

//import dataService from './../utils/DataService';

const PAGE_NAMES = {
  'home': HomePage,
  'booking': BookingPage,
  'error': ErrorPage
};


class PageWrapper extends BaseComponent {

  constructor(props) {
    super(props);

    this._bind('updateDimensions');

    this.handleResize = _.throttle(this.updateDimensions, 300);

    this.state = {
      data: this.props.data || null,
      width: props.width
    };
  }

  componentDidMount() {
    this.mounted = true;

    this.updateDimensions();

    global.window.addEventListener('resize', this.handleResize);

    // dataService.getUsageData({}, (err, res) => {
    //
    //   if (this.mounted) {
    //     this.setState({data: res});
    //   }
    // });

    this.setState({
      data: {
        title: 'Page Title'
      }
    });
  }

  updateDimensions() {

    this.setState({width: ReactDOM.findDOMNode(this).offsetWidth});

  }

  componentWillUnmount() {
    this.mounted = false;

    global.window.removeEventListener('resize', this.handleResize);
  }

  render() {

    let pageContents = (
      <p className="c-loading">
      </p>
    );

    if (this.state.data) {
      let PageName = PAGE_NAMES[this.props.pageName] || ErrorPage;

      pageContents = (
        <PageName
          data={this.state.data}
          height={this.props.height}
          width={this.state.width}
          margin={this.props.margin}
        />
      );
    }

    return (
      <div
        className='l-site-content'
      >
        <SiteHeader />
        {pageContents}
        <SiteFooter />
      </div>
    );
  }
}

PageWrapper.propTypes = {
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  margin: React.PropTypes.shape(
    {
      top: React.PropTypes.number,
      bottom: React.PropTypes.number,
      left: React.PropTypes.number,
      right: React.PropTypes.number
    }
  )
};

PageWrapper.defaultProps = {
  width: '100%',
  height: '100%',
  margin: {
    top: 20,
    bottom: 70,
    left: 20,
    right: 20
  }
};

export default PageWrapper;
