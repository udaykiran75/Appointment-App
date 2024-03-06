import './index.css'
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentsItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    appointmenttitle: '',
    appointmentdate: '',
    isActiveStarred: false,
  }

  filterStarred = () => {
    this.setState(prevState => ({
      isActiveStarred: !prevState.isActiveStarred,
    }))
  }

  onChangeStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppoinment => {
        if (eachAppoinment.id === id) {
          return {...eachAppoinment, isStared: !eachAppoinment.isStared}
        }
        return {...eachAppoinment}
      }),
    }))
  }

  onaddAppoinment = event => {
    event.preventDefault()

    const {appointmenttitle, appointmentdate} = this.state
    const formatedDate = format(new Date(appointmentdate), 'dd MMMM yyyy, EEEE')

    const newAppoinment = {
      id: v4(),
      title: appointmenttitle,
      date: formatedDate,
      isStared: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppoinment],
      appointmenttitle: '',
      appointmentdate: '',
    }))
  }

  addAppoinmentTitle = event => {
    this.setState({appointmenttitle: event.target.value})
  }

  addAppoinmentDate = event => {
    this.setState({appointmentdate: event.target.value})
  }

  getFilteredAppoinments = () => {
    const {appointmentsList, isActiveStarred} = this.state

    if (isActiveStarred) {
      return appointmentsList.filter(
        eachAppoinment => eachAppoinment.isStared === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {appointmenttitle, appointmentdate, isActiveStarred} = this.state
    const filteredClassName = isActiveStarred ? 'star-filled' : 'star-empty'
    const filteredAppoinments = this.getFilteredAppoinments()
    return (
      <div className="appointment-bg">
        <div className="appointment-card-bg">
          <div className="appoinment-container">
            <form onSubmit={this.onaddAppoinment}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="labelEl">
                Title
              </label>
              <br />
              <input
                type="text"
                id="title"
                className="inputEl"
                placeholder="Title"
                value={appointmenttitle}
                onChange={this.addAppoinmentTitle}
              />
              <br />
              <label htmlFor="date" className="labelEl">
                Date
              </label>
              <br />
              <input
                type="date"
                id="date"
                className="inputEl"
                placeholder="dd/mm/yy"
                value={appointmentdate}
                onChange={this.addAppoinmentDate}
              />
              <br />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appoinent-image"
            />
          </div>
          <hr className="horizantal-line" />

          <div className="appoinent-starred-btn-container">
            <h1 className="appoin-heading">Appointments</h1>
            <button
              className={`starred-button ${filteredClassName}`}
              onClick={this.filterStarred}
            >
              Starred
            </button>
          </div>

          <ul className="appoinent-list-items">
            {filteredAppoinments.map(eachAppoinment => (
              <AppointmentsItem
                appointmentDetails={eachAppoinment}
                key={eachAppoinment.id}
                isClickedStar={this.onChangeStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
