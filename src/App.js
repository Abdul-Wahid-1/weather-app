import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './index.css'
import CurrentWeather from './components/CurrentWeather'
import DateLocation from './components/DateLocation'
import FurtherInfo from './components/FurtherInfo'
import Forecast from './components/Forecast'
import Pchance from './components/Pchance';
import Uvi from './components/Uvi';
import Recommendation from './components/Recommendation';
import WindSpeed from './components/WindSpeed';

function celsiusConvert(kelvin){
  return Math.round(kelvin - 273.15)+"°C";
}


function App() {
  const [items,setItems] = useState([])
  const [isLoaded,setLoaded] = useState(false)
  
  useEffect(()=>{
    const fetchedItems = async () => {
    let results =await axios('https://api.openweathermap.org/data/2.5/onecall?lat=51&lon=0&appid=0b0d6bb2481f89c3bbec13ddfa2879bd')
    results = results.data
    const uvi = results['current']['uvi']  
    let uvIndex
    let weatherAlert
    let forecast = Array(6)
    for (let i = 0; i < forecast.length; i++) {
        forecast[i] = [celsiusConvert(results['daily'][i+1]['temp']['day']),'https://openweathermap.org/img/wn/'+results['daily'][i+1]['weather'][0]['icon']+'@2x.png']
    }
    try{
      weatherAlert = results['alerts']['event'] // weather warning or alert
    }catch(e){
      weatherAlert = 0
    }
    if (uvi>=8) uvIndex="Very high";else if(uvi>=6) uvIndex = "High";else if(uvi>=3) uvIndex="Medium";else uvIndex="Low"
    setItems({
      low: celsiusConvert(results['daily'][0]['temp']['min'])+"/", // low of daily weather
      high: celsiusConvert(results['daily'][0]['temp']['max']), // high of daily weather
      cWeatherIcon: 'https://openweathermap.org/img/wn/'+results['current']['weather'][0]['icon']+'@2x.png', // current weather icon 
      cWeatherDescription: results['current']['weather'][0]['description'], // description of current weather
      feelsLike: "Feels like "+ celsiusConvert(results['current']['feels_like']),
      precipitationChance: results['daily'][0]['pop'] * 100 + "%",
      windSpeed: Math.round(results['current']['wind_speed'] * 2.236936)+" mph",
      uvi: uvIndex,
      forecasts: forecast,
      weatherAlert: weatherAlert
    })
    setLoaded(true)
    }
    fetchedItems()
  },[])

  return (
    <div className='container'>
      <DateLocation/>
      <CurrentWeather low={items.low} high={items.high} icon={items.cWeatherIcon} description={items.cWeatherDescription} feelsLike={items.feelsLike} />
      <FurtherInfo pChance={items.precipitationChance} uvIndex={items.uvi} windSpeed={items.windSpeed}/>
      <Forecast forecasts={items.forecasts} loaded={isLoaded}/>
      <Uvi/>
      <Pchance/>
      <Recommendation/>
      <WindSpeed/>
    </div>
  )
}

export default App