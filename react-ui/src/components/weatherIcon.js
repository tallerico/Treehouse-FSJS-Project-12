import React from 'react'
import Skycons from 'react-skycons'

function WeatherIcon(props) {
	return (
		<div className="max_skycon">
			<Skycons color="#2196f3" icon={props.icon} />
		</div>
	)
}

export default WeatherIcon
