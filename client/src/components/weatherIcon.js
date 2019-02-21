import React from 'react'
import Skycons from 'react-skycons'

function WeatherIcon(props) {
	return <Skycons color="#2196f3" icon={props.icon} autoplay={true} />
}

export default WeatherIcon
