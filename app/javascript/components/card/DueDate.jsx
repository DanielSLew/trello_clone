import React from "react";
import Pikaday from "pikaday";
import moment from "moment";

class DueDate extends React.Component {
  defaultMoment = () => {
    if (this.props.dueDate) {
      return moment(this.props.dueDate);
    } else {
      const time = moment().add(1, "day");

      time.set({
        hour: 12,
        minute: 0,
        second: 0,
      });

      return time;
    }
  };

  defaultDate = () => {
    this.defaultMoment().toDate();
  };

  componentDidMount() {
    this.picker = new Pikaday({
      field: this.refs.dateInput,
      bound: false,
      container: this.refs.calendar,
      firstDay: 1,
      yearRange: 10,
      defaultDate: this.defaultDate(),
      setDefaultDate: true,
      format: "M/D/YYYY",
      i18n: {
        previousMonth: "Prev",
        nextMonth: "Next",
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        weekdays: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        weekdaysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      },
      keyboardInput: false,
      toString(date, format) {
        return moment(date).format(format);
      },
    });
    this.picker.show();
  }

  toggleDueDatePopover = (e) => {
    e.preventDefault();
    this.props.toggleDueDatePopover();
  };

  updateDate = (e) => {
    e.preventDefault();
    let date = document.querySelector(".datepicker-select-date input").value;
    let time = document.querySelector(".datepicker-select-time input").value;
    const datetime = moment(`${date} ${time}`, "M/D/YYYY h:mm A").toISOString();

    this.props.updateDate(datetime);
    this.props.toggleDueDatePopover();
  };

  removeDueDate = () => {
    this.props.updateDate("");
    this.props.toggleDueDatePopover();
  };

  render() {
    return (
      <div class="popover due-date">
        <header>
          <span>Change due date</span>
          <a onClick={this.toggleDueDatePopover} class="icon-sm icon-close"></a>
        </header>
        <div class="content">
          <form onSubmit={this.updateDate}>
            <div class="datepicker-select">
              <div class="datepicker-select-date">
                <label>
                  Date
                  <input
                    type="text"
                    placeholder="Enter date"
                    autofocus
                    ref="dateInput"
                    defaultValue={this.defaultMoment().format("M/D/yyyy")}
                  />
                </label>
              </div>
              <div class="datepicker-select-time">
                <label>
                  Time
                  <input
                    type="text"
                    placeholder="Enter time"
                    defaultValue={this.defaultMoment().format("h:mm A")}
                  />
                </label>
              </div>
              <div id="calendar-widget"></div>
            </div>
            <button class="button" type="submit">
              Save
            </button>
            <button
              class="button red-button"
              type="reset"
              onClick={this.removeDueDate}
            >
              Remove
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default DueDate;
