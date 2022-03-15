// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Menu from '../menu';
import Precipitation_chance from '../interactable/precipitation_chance';
import UV_index from '../interactable/uv_index';
import Wind_speed from '../interactable/wind_speed';
import Recommendations from '../interactable/recommendations';
export default class Iphone extends Component {
//var Iphone = React.createClass({
	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		// console.log(navigator.geolocation.getCurrentPosition(position));
		this.state.high;
		this.state.low;
		this.state.feelsLike;
		this.cWeatherIcon; // current weather icon 
		this.cWeatherDescription; // description of current weather
		this.precipitationChance;
		this.windSpeed;
		this.uvIndex;
		this.forecast;
		// button display state
		this.setState({
			display: true,
			rec_info: false,
			ws_info: false,
			pc_info: false,
			uv_info: false
		});
	}
	// a call to fetch weather parsed_json via wunderground
	fetchWeatherparsed_json = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/onecall?lat=51.509865&lon=-0.118092&appid=0b0d6bb2481f89c3bbec13ddfa2879bd";
		$.ajax({
			url: url,
			parsed_jsonType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the parsed_json grabbed, hide the button
		this.setState({ display: false });
	}
	changeWs =()=>{
		if (this.state.ws_info){
			this.setState({ws_info:false});
		} else {
			this.setState({ws_info:true});
		}
	}
	changePc =()=>{
		if (this.state.pc_info){
			this.setState({pc_info:false});
		} else {
			this.setState({pc_info:true});
		}
	}
	changeUv =()=>{
		if (this.state.uv_info){
			this.setState({uv_info:false});
		} else {
			this.setState({uv_info:true});
		}
	}
	changeRec =()=>{
		if (this.state.rec_info){
			this.setState({rec_info:false});
		} else {
			this.setState({rec_info:true});
		}
	}
	// the main render method for the iphone component
	render() {
		// check if temperature parsed_json is fetched, if so add the sign styling to the page
		const tempStyles = this.state.high ? `${style.temperature} ${style.filled}` : style.temperature;
		
		if (this.state.rec_info){
			return (<div class={ style.container }><button onclick={this.changeRec} > {'<'} </button><Recommendations /></div>);
		} else if (this.state.ws_info){
			return (<div class={ style.container }><button onclick={this.changeWs} > {'<'} </button><Wind_speed /></div>);
		} else if (this.state.uv_info){
			return (<div class={ style.container }><button onclick={this.changeUv} > {'<'} </button><UV_index /></div>);
		} else if (this.state.pc_info){
			return (<div class={ style.container }><button onclick={this.changePc} > {'<'} </button><Precipitation_chance /></div>);
		}
		// display all weather parsed_json
		return (
			this.state.rec_info ? null:
			<div class={ style.container }>
				{this.state.display ? null:
				<div>
					<Menu/>
					<div class={ style.header }>
						<span> {new Date().toLocaleString("en-US", { day : '2-digit'})} {new Date().toLocaleString("en-US", { month: "long" })} {new Date().getFullYear()}</span>
						<span style={"font-size:40px"}>City</span>
						<span>Country</span>
					</div>
				</div>
				}
				<div class={ this.state.display ? null:style.currentWeather}>
					<div class={style.left}>
						<div class={style.maxmin}>
							<span >{ this.state.low }</span>
							<span >{ this.state.high }</span>
						</div>
						<div class={style.actualWeather}>
							<img  src={this.state.cWeatherIcon}/>
							<div style={"text-transform:capitalize"}>{ this.state.cWeatherDescription }</div>
						</div>
					</div>
					<div class={style.right}>
						{this.state.display ? null:<span class={style.dte} >{new Date().toLocaleString("en", { weekday: "short" })}</span>}
						<span class={style.feelslike}>{ this.state.feelsLike }</span>
					</div>
						
				</div>
				<div class={ this.state.display ? null:style.extra }>
					<div class={style.left}>
						{this.state.display ? null: <button onclick={this.changePc} >Chance pf precipitation &gt;</button>}
						<span>{ this.state.precipitationChance }</span>
						{this.state.display ? null: <button onclick={this.changeUv} >UV index &gt;</button>}
						<span >{ this.state.uvIndex }</span>
					</div>
					<div class={style.right}>
					{this.state.display ? null:<div class={style.recommendation}><button onClick={this.changeRec}>&gt; Recommendation</button><br/>Raincoat</div>}
					{this.state.display ? null: <button onclick={this.changeWs} >&gt; Wind speed</button>}
						<span class={style.ws}>{ this.state.windSpeed }</span>
					</div>
				</div>
					{this.state.display ? null:
					<div class={ style.forecast }>
						<span class={style.subtitle}>7-day forecast</span>
						<div class={style.forecastIcon}>
							{this.forecastIcon(this.state.forecast[0][0],this.state.forecast[0][1])}
							{this.forecastIcon(this.state.forecast[1][0],this.state.forecast[1][1])}
							{this.forecastIcon(this.state.forecast[2][0],this.state.forecast[2][1])}
							{this.forecastIcon(this.state.forecast[3][0],this.state.forecast[3][1])}
							{this.forecastIcon(this.state.forecast[4][0],this.state.forecast[4][1])}
							{this.forecastIcon(this.state.forecast[5][0],this.state.forecast[5][1])}
						</div>
					</div>
					}
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherparsed_json }/ > : null }
				</div>
			</div>
		);
	}
	forecastIcon(temp,iconCode){
		var icon = 'https://openweathermap.org/img/wn/'+iconCode+'@2x.png';
		return (
			<div class={style.forecastBox}>
				<img class={style.icon} src={icon}/>
				<span class={style.forecastTemp}>{temp}</span>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		// var location = parsed_json['name'];
		var high_c = celsiusConvert(parsed_json['daily'][0]['temp']['max']);
		var low_c = celsiusConvert(parsed_json['daily'][0]['temp']['min'])+"/"; // low of daily weather
		// var high = celsiusConvert(parsed_json['daily'][0]['temp']['max']); // high of daily weather
		var cWIcon = 'https://openweathermap.org/img/wn/'+parsed_json['current']['weather'][0]['icon']+'@2x.png'; // current weather icon 
		var cWDescription = parsed_json['current']['weather'][0]['description']; // description of current weather
		var feels_Like = "Feels like "+celsiusConvert(parsed_json['current']['feels_like']);
		var pChance = (parsed_json['daily'][0]['pop'] * 100)+"%";
		var wSpeed = Math.round(parsed_json['current']['wind_speed'] * 2.236936)+" mph";
		var uvi = parsed_json['current']['uvi'];
		var uv;
		if (uvi>=8){
			uv="Very high";
		}else if(uvi>=6){
			uv = "High";
		}else if(uvi>=3){
			uv="Medium";
		}else if (uvi>=0) {
			uv="Low";
		}
		var forecasts = Array(6);
		for (let i = 0; i < forecasts.length; i++) {
			forecasts[i] = [celsiusConvert(parsed_json['daily'][i+1]['temp']['day']),parsed_json['daily'][i+1]['weather'][0]['icon']];
		}
		// for (let i = 0; i < forecast.length; i++) {
		// 	console.log(forecast[i][0],forecast[i][1]);
		// }
		// var conditions = parsed_json['weather']['0']['description'];
		// set states for fields so they could be rendered later on

		this.setState({
			// locate: location,
			high: high_c,
			low: low_c,
			feelsLike: feels_Like,
			cWeatherIcon: cWIcon, // current weather icon 
			cWeatherDescription: cWDescription,  // description of current weather
			precipitationChance:pChance,
			windSpeed:wSpeed,
			uvIndex: uv,
			forecast: forecasts
			// cond : conditions
		});
	}
}



// fetch('https://api.openweathermap.org/parsed_json/2.5/onecall?lat=51.509865&lon=-0.118092&appid=0b0d6bb2481f89c3bbec13ddfa2879bd')
// .then(response => response.json())
// .then(parsed_json => {
//     console.log(parsed_json)
//     console.log("---------------------------------------------------------------------------------------------------------------------------------")
//     try{
//         var alertNeeded = true
//         var weatherAlert = parsed_json['alerts']['event'] // weather warning or alert
//     }catch(error){
//         var alertNeeded = false
//     }
//     var low = celsiusConvert(parsed_json['daily'][0]['temp']['min']) // low of daily weather
//     var high = celsiusConvert(parsed_json['daily'][0]['temp']['max']) // high of daily weather
//     var cWeatherIcon = parsed_json['current']['weather'][0]['icon'] // current weather icon 
//     var cWeatherDescription = parsed_json['current']['weather'][0]['description'] // description of current weather
//     var feelsLike = celsiusConvert(parsed_json['current']['feels_like'])
//     var precipitationChance = parsed_json['daily'][0]['pop'] * 100
//     var windSpeed = Math.round(parsed_json['current']['wind_speed'] * 2.236936)
//     var uvi = parsed_json['current']['uvi']  
//     var uvIndex
//     if (uvi>=8){
//         uvIndex="Very high"
//     }else if(uvi>=6){
//         uvIndex = "High"
//     }else if(uvi>=3){
//         uvIndex="Medium"
//     }else {
//         uvIndex="Low"
//     }
//     var forecast = Array(6)
//     for (let i = 0; i < forecast.length; i++) {
//         forecast[i] = [celsiusConvert(parsed_json['daily'][i+1]['temp']['day']),parsed_json['daily'][i+1]['weather'][0]['icon']]
//     }
//     console.log(low,high,cWeatherIcon,cWeatherDescription,feelsLike,precipitationChance,windSpeed,uvIndex);
//     for (let i = 0; i < forecast.length; i++) {
//         console.log(forecast[i][0],forecast[i][1])
//     }
// })

function celsiusConvert(kelvin){
	return Math.round(kelvin - 273.15)+"°C";
}


