import './index.css'

const AppointmentsItem = props => {
  const {appointmentDetails, isClickedStar} = props
  const {id, title, date, isStared} = appointmentDetails

  const unStarImage =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const staredImage =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  const getStarImage = isStared ? staredImage : unStarImage

  const onChangeStar = () => {
    isClickedStar(id)
  }

  return (
    <li>
      <div className="appoinment-div">
        <div className="title-star-container">
          <p className="appoinment-title">{title}</p>
          <button
            className="star-button"
            onClick={onChangeStar}
            data-testid="star"
          >
            <img src={getStarImage} alt="star" />
          </button>
        </div>
        <p className="appoinment-date">{`Date: ${date}`}</p>
      </div>
    </li>
  )
}
export default AppointmentsItem
