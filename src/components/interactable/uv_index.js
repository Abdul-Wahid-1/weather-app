import { h, render, Component } from 'preact';
import style from './uv';

export default class uv_index extends Component{
	render() {
		return (
			<div class={style.example}>
				Some test code
			</div>
		);
	}
}