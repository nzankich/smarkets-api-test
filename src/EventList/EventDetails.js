import React, { Component } from 'react';
import Proptypes from 'prop-types';
import BounceLoader from 'react-spinners/BounceLoader';

import './Events.css';

// sample response data
// {
//     "bettable": true,
//     "created": "2018-09-18T10:08:35.584687Z",
//     "description": null,
//     "end_date": null,
//     "full_slug": "/sport/football/championship/2018/10/02/brentford-fc-vs-birmingham",
//     "id": "959493",
//     "inplay_enabled": true,
//     "modified": "2018-09-18T10:08:35.584687Z",
//     "name": "Brentford vs. Birmingham City",
//     "parent_id": "939285",
//     "short_name": "BRE vs. BIR",
//     "slug": "brentford-fc-birmingham-2018-10-02",
//     "special_rules": null,
//     "start_date": "2018-10-02",
//     "start_datetime": "2018-10-02T18:45:00Z",
//     "state": "upcoming",
//     "type": "football_match"
// }

function cleanType(type) {
  if (!type) {
    return '';
  }

  return type.replace(/_/g, ' ');
}

class EventDetails extends Component {
  renderContent() {
    const {
      event: {
        id, name, type, start_date, bettable, description,
      },
    } = this.props || {};

    if (!name) {
      return (
        <div className="event-loader">
          <BounceLoader color="#0CCD93" />
        </div>
      );
    }

    return (
      <div>
        <p className="event-detail smarkets-green">
            Id: {id}
        </p>
        <p className="event-detail smarkets-green">
            Name: {name}
        </p>
        <p className="event-detail smarkets-green">
            Date: {start_date}
        </p>
        <p className="event-detail smarkets-green">
           Type: {cleanType(type)}
        </p>
        <p className="event-detail smarkets-green">
            Bettable: {bettable ? 'true' : 'false'}
        </p>
        <p className="event-detail smarkets-green">
            Description: {description}
        </p>
      </div>
    );
  }

  render() {
    const { clearSelectedEvent } = this.props;

    return (
      <div className="event-details">
        <p
          className="back-button"
          onClick={clearSelectedEvent}
        >
            Back
        </p>
        {this.renderContent()}
      </div>
    );
  }
}

EventDetails.propTypes = {
  event: Proptypes.shape({
    id: Proptypes.string,
    start_date: Proptypes.string,
    name: Proptypes.string,
    type: Proptypes.string,
    description: Proptypes.string,
    bettable: Proptypes.bool,
  }).isRequired,
  clearSelectedEvent: Proptypes.func.isRequired,
};

export default EventDetails;
