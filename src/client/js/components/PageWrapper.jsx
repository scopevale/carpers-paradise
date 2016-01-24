import React from 'react';
import ReactDOM from 'react-dom';
import BaseComponent from './BaseComponent';

import _ from 'lodash';

import HomePage from './HomePage';
import YearCalendar from './YearCalendar';

//import dataService from './../utils/DataService';

const PAGE_NAMES = {
  'home': HomePage,
  'booking': YearCalendar
};


class PageWrapper extends BaseComponent {

  constructor(props) {
    super(props);

    this._bind('updateDimensions');

    this.handleResize = _.throttle(this.updateDimensions, 300);

    this.state = {
      data: {
        title: 'Page Title'
      },
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

    let contents = (
      <p className='c-loading'></p>
    );

    if (this.state.data) {
      let PageName = PAGE_NAMES[this.props.pageName];
      contents = (
        <PageName
          data={this.state.data}
          height={this.props.height}
          width={this.state.width}
          margin={this.props.margin}
        />
      );
    }

    return (
      <div className='c-page'>
        {contents}
      </div>
    );
  }
}

PageWrapper.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
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
