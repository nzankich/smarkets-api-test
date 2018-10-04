import React, { Component } from 'react';
import Proptypes from 'prop-types';
import BeatLoader from 'react-spinners/BeatLoader';

import './Events.css';

class EventEntry extends Component {
  renderLoading() {
    if (!this.props.event.name) {
      return (
        <div className="event-loader">
          <BeatLoader color="#0CCD93" />
        </div>
      );
    }

    return null;
  }

  render() {
    const { event: { id, start_date, name }, isOddEntry, selectEvent } = this.props;
    const backgroundClass = isOddEntry ? 'odd-entry' : '';

    return (
      <div className={`event-entry ${backgroundClass}`} onClick={() => selectEvent(id)}>
        {this.renderLoading()}
        <p className="event-date smarkets-green">
          {start_date}
        </p>
        <p className="event-name smarkets-green">
          {name}
        </p>
      </div>
    );
  }
}

EventEntry.propTypes = {
  event: Proptypes.shape({
    id: Proptypes.string,
    start_date: Proptypes.string,
    name: Proptypes.string,
  }).isRequired,
  isOddEntry: Proptypes.bool,
  selectEvent: Proptypes.func.isRequired,
};

export default EventEntry;
