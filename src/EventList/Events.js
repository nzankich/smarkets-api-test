import React, { Component } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

import EventEntry from './EventEntry';
import './Events.css';
import EventDetails from './EventDetails';

const POPULAR_EVENTS_ENDPOINT = 'https://cors-anywhere.herokuapp.com/https://api.smarkets.com/v3/popular/event_ids';
const EVENT_ENDPOINT = 'https://cors-anywhere.herokuapp.com/https://api.smarkets.com/v3/events';

class Events extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      eventDetails: {},
      isLoading: true,
      selectedEvent: null,
    };

    this.fetchEvent = this.fetchEvent.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.clearSelectedEvent = this.clearSelectedEvent.bind(this);
  }

  componentDidMount() {
    fetch(POPULAR_EVENTS_ENDPOINT).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          const { popular_event_ids = [] } = data;
          const mappedEvents = {};

          popular_event_ids.forEach((id) => {
            mappedEvents[id] = { id };
          });

          this.setState({
            events: popular_event_ids,
            eventDetails: mappedEvents,
            isLoading: false,
          });

          popular_event_ids.forEach(this.fetchEvent);
        });
      } else {
        throw new Error(`bad response ${res.status}`);
      }
    }).catch((e) => {
      console.error('Error loading events', e);
      this.setState({ isLoading: false });
    });
  }

  selectEvent(selectedEvent) {
    this.setState({ selectedEvent });
  }

  clearSelectedEvent() {
    this.setState({ selectedEvent: null });
  }

  fetchEvent(eventId) {
    fetch(`${EVENT_ENDPOINT}/${eventId}`).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          const currentEventState = this.state.eventDetails[eventId];

          this.setState({
            isLoading: false,
            eventDetails: {
              ...this.state.eventDetails,
              [eventId]: { ...currentEventState, ...data.events[0] },
            },

          });
        });
      } else {
        throw new Error(`bad response ${res.status}`);
      }
    }).catch((e) => {
      console.error('Error loading event ', e, eventId);
    });
  }

  renderContent() {
    const selectedEvent = this.state.eventDetails[this.state.selectedEvent];

    if (this.state.isLoading) {
      return (
        <div className="list-loader">
          <BounceLoader color="#0CCD93" />
        </div>
      );
    } else if (this.state.selectedEvent) {
      return (
        <EventDetails
          event={selectedEvent}
          clearSelectedEvent={this.clearSelectedEvent}
        />
      );
    }

    return (
      <div className="event-list">
        {this.state.events.map((eventId, index) => (
          <EventEntry
            key={eventId}
            event={this.state.eventDetails[eventId]}
            isOddEntry={!!(index % 2)}
            selectEvent={this.selectEvent}
          />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="events-wrapper">
        {this.renderContent()}
      </div>
    );
  }
}

export default Events;
