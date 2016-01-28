import React from 'react';

import BaseComponent from './BaseComponent';
import YearCalendar from './YearCalendar';

class BookingPage extends BaseComponent {

  constructor(props) {

    super(props);

    this.state = {
      data: null
    };
  }

  // static propTypes = {
  //   property: React.PropTypes.TYPE.isRequired,
  //   // ...
  // }

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
        <YearCalendar />
      </div>
    );
  }
}

export default BookingPage;
