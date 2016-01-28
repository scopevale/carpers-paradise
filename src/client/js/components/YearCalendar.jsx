import React from 'react';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';

import BaseComponent from './BaseComponent';

class YearCalendar extends BaseComponent {

  constructor(props) {
    super(props);

    this._bind('showPrevious', 'showNext', 'handleDayClick', 'handleResetClick');

    this.state = {
      year: (new Date()).getFullYear(),
      from: null,
      to: null,
      initialYear: (new Date()).getFullYear()
    };
  }

  showPrevious() {

    if (this.state.year > this.state.initialYear) {
      this.setState({
        year: this.state.year - 1
      });
    }
  }

  showNext() {

    if (this.state.year === this.state.initialYear) {
      this.setState({
        year: this.state.year + 1
      });
    }
  }

  handleDayClick(e, day) {

    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick(e) {
    e.preventDefault();
    this.setState({
      from: null,
      to: null
    });
  }

  render() {
    const {year} = this.state;

    const { from, to } = this.state;

    const modifiers = {
      selected: day => DateUtils.isDayInRange(day, this.state),
      disabled: day => day < moment() // disable dates in the past
      //disabled: day => day < moment() || this.state.year > this.state.initialYear
    };

    return (
      <div className='YearCalendar'>


        <h1>
          <a onClick={this.showPrevious}>{this.state.year > this.state.initialYear ? year - 1 : null}</a>
          {year}
          <a onClick={this.showNext}>{this.state.year === this.state.initialYear ? year + 1 : null}</a>
        </h1>

        <div className='c-calendar__range-instructions'>
          { !from && !to && <p>Please select the <strong>first day</strong>.</p> }
          { from && !to && <p>Please select the <strong>last day</strong>.</p> }
          { from && to &&
          <p>You chose from {
              moment(from).format('L') } to {
              moment(to).format('L') }. <a
                                          href='#'
                                          onClick={this.handleResetClick}
                                        >
                                          Reset
                                        </a>
          </p>
          }
        </div>

        <DayPicker
          canChangeMonth={false}
          initialMonth={new Date(year, 0, 1)}
          numberOfMonths={12}
          ref='daypicker'
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }

}

export default YearCalendar;
