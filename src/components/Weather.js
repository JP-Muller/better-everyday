import React, { Component } from 'react'
import axios from 'axios'
require('dotenv').config()
const { IP_INFO_KEY, WEATHER_APP_KEY } = process.env

class Weather extends Component {
    constructor() {
        super()
        this.state = {
            location: {},
            weatherData: {
                main: {},
                weather: {}
            },
            weatherDescription: ''

        }
    }

    componentDidMount() {
        axios
            .get(`https://ipinfo.io/geo/?token=`).then(res => {
                this.setState({ location: res.data }, () => this.getLocalWeather())
            })
            .catch(err => {
                console.log('error with API calls', err)
            })

    }

    getLocalWeather = () => {
        const { location } = this.state
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${location.city}&appid=`).then(res => {
                this.setState({ weatherData: res.data }, () => {
                    const { weatherData } = this.state
                    this.setState({ weatherDescription: weatherData.weather[0].description })
                })
            })
            .catch(err => {
                console.log('error with weather API call', err)
            })
    }

    getWeatherIcon = () => {
        const { weatherDescription } = this.state
        // let description = 'Loading...'
        // if (weatherData.weather[0].description) description = weatherData.weather[0].description
        if (weatherDescription === 'clear sky') {
            console.log('Clear Skies Today!')
            return < i className="far fa-sun" />
        } else if (weatherDescription === 'few clouds') {
            console.log('Few Clouds Today!')
            return <i className="fas fa-cloud-sun" />
        } else if (weatherDescription === 'scattered clouds') {
            console.log('Scattered Clouds Today!')
            return <i className="fas fa-cloud" />
        } else if (weatherDescription === 'broken clouds') {
            console.log('Broken Clouds Today!')
            return <i className="fas fa-cloud" />
        } else if (weatherDescription === 'shower rain') {
            console.log('Shower Rain Today!')
            return <i className="fas fa-cloud-showers-heavy" />
        } else if (weatherDescription === 'rain') {
            console.log('Rain Today!')
            return <i className="fas fa-cloud-rain" />
        } else if (weatherDescription === 'thunderstorm') {
            console.log('Thunderstorms!')
            return <i className="fas fa-poo-storm" />
        } else if (weatherDescription === 'snow') {
            console.log(`It's snowing!`)
            return <i className="far fa-snowflake" />
        } else if (weatherDescription === 'mist') {
            console.log('Foggy Day..')
            return <i className="fas fa-smog" />
        } else {
            return <i className="far fa-sad-tear" />
        }
    }



    render() {
        const { weatherData, location, date } = this.state
        let temperature = 'Loading...'
        if (weatherData.main.temp) temperature = ((9 / 5) * (weatherData.main.temp - 273.15) + 32).toFixed(0)
        console.log(weatherData.main)
        console.log(weatherData)
        console.log(location)
        return (
            <div className='weather-time-container'>
                <section>
                    lol
                </section>
                <section className='weather-widget'>
                    <h2> {this.getWeatherIcon()} {temperature} &#176;</h2>
                    <h3>{location.city}, {location.region}</h3>
                </section>
            </div>
        )
    }
}

export default Weather