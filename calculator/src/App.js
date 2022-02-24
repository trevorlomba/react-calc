import React, { Component } from 'react'
import './App.css'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { ClearButton } from './components/ClearButton'
import { Logger } from './components/Logger'
import * as math from 'mathjs'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			input: '',
			preValType: 'empty',
			COLength: 0,
			openParenths: 0,
		}
	}

	
	decimal = {
		test: ['test', false, 1],
		COFloat: ['break'],
		answer: ['decimal', true],
		CO: ['COFloat'],
		decimal: ['break'],
		empty: ['decimal'],
		operator: 'decimal,',
		minus: ['decimal'],
		openParenths: ['decimal'],
	}

	closedParenths = {
		parenths: -1,
		COFloat: ['CO'],
		answer: ['CO'],
		CO: ['CO'],
		decimal: ['CO'],
		empty: ['CO'],
		operator: ['CO'],
		minus: ['break'],
		openParenths: ['break'],
	}

	minus = {
		COFloat: ['minus'],
		answer: ['operator'],
		CO: ['minus'],
		empty: ['minus'],
		decimal: ['break'],
		operator: ['operator', false, 'preVal'],
		minus: ['break'],
		openParenths: ['minus'],
	}

	operator = {
		COFloat: ['operator'],
		answer: ['operator'],
		CO: ['operator'],
		empty: ['break'],
		decimal: ['break'],
		operator: ['operator', false, 'preVal'],
		minus: ['operator', false, 'preVal'],
		openParenths: 'break',
	}

	CO = {
		COFloat: ['COFloat'],
		answer: ['CO'],
		CO: ['CO'],
		empty: ['CO'],
		decimal: ['COFloat'],
		operator: ['CO'],
		minus: ['CO'],
		openParenths: ['CO'],
	}

	openedParenths = {
		parenths: 1,
		COFloat: ['openParenths'],
		answer: ['openParenths', true],
		CO: ['openParenths'],
		empty: ['openParenths'],
		decimal: ['break'],
		operator: ['openParenths'],
		minus: ['openParenths'],
		openParenths: ['openParenths'],
	}

	equals = {
		COLength: 0,
		COFloat: ['answer', true],
		answer: ['break', true],
		CO: ['answer', true],
		empty: ['answer', true],
		decimal: ['break', true],
		operator: ['answer', false, 'preVal'],
		minus: ['break', true],
		openParenths: ['break', true],
	}


	clear = {
		COFloat: ['answer', false, 'COL'],
		answer: ['answer', true],
		CO: ['answer', false, 'COL'],
		empty: ['answer', false, 'COL'],
		decimal: ['break', false, 'COL'],
		operator: ['answer', false, 'COL'],
		minus: ['break', false],
		openParenths: ['answer', true],
	}

	input = {
		')': this.closedParenths,
		'(': this.openedParenths,
		'.': this.decimal,
		'-': this.minus,
		'NaN': this.operator,
		'int': this.CO,
	}

	preVal = ''

	updateInput = (val, type, set = false, slice = false, parenths = 0) => {

		if (type[this.state.preValType][0] === 'break') { return } else {
			this.preVal = val
			let openParenths = this.state.openParenths
			let COLength = this.state.COLength
			let input = this.state.input

			if (type[this.state.preValType][1]) {
				input = ''
				openParenths = 0
				COLength = -val.length
			}
			if (type.parenths) {
				openParenths = parseInt(this.state.openParenths) + type.parenths
			}
			if (type[this.state.preValType][2]) {
				let slice = type[this.state.preValType][2]
				if (slice === 'COL') { slice = COLength } else if (slice === 'preVal') { slice = this.preVal.length }
				input = input.slice(0, input.length - slice)
				COLength = COLength - slice

				if (type.COLength) {
					this.COLengthState = type.COLength
				}
			}
			this.setState({
				input: input + val,
				COLength: COLength + val.length,
				preValType: type[this.state.preValType][0],
				openParenths: openParenths
			})
		}
	}

	addToInput = (val) => {
		if (/[().-]/.test(val)) {
			
			this.updateInput(val, this.input[val])
		} else if (isNaN(val)) { 
			this.updateInput(val, this.input.NaN) 
		} else { 
			this.updateInput(val, this.input.int) }
	}

	handleEqual = () => {
		switch (this.state.preValType) {
			case 'operator':
				this.updateInput('', this.equals)
				break
			default:
				let answer
				if (this.state.openParenths >= 0) {
					answer = this.state.input + ')'.repeat(this.state.openParenths)
				} else {
					answer = '('.repeat(this.state.openParenths) + this.state.input
				}
				this.updateInput(
					math.evaluate(answer).toPrecision(5),
					this.equals
				)
		}
	}

	handleClear = () => {
		this.updateInput('', this.clear)
	}

	render() {
		return (
			<div className='app'>
				<div className='calc-wrapper'>
					<Logger
						COLength={this.state.COLength}
						openParenths={this.state.openParenths}
						preValType={this.state.preValType}></Logger>
					<Input input={this.state.input}></Input>
					<div className='row'>
						<Button handleClick={this.addToInput}>7</Button>
						<Button handleClick={this.addToInput}>8</Button>
						<Button handleClick={this.addToInput}>9</Button>
						<Button handleClick={this.addToInput}>/</Button>
					</div>
					<div className='row'>
						<Button handleClick={this.addToInput}>4</Button>
						<Button handleClick={this.addToInput}>5</Button>
						<Button handleClick={this.addToInput}>6</Button>
						<Button handleClick={this.addToInput}>*</Button>
					</div>
					<div className='row'>
						<Button handleClick={this.addToInput}>1</Button>
						<Button handleClick={this.addToInput}>2</Button>
						<Button handleClick={this.addToInput}>3</Button>
						<Button handleClick={this.addToInput}>+</Button>
					</div>
					<div className='row'>
						<Button handleClick={this.addToInput}>.</Button>
						<Button handleClick={this.addToInput}>0</Button>
						<Button handleClick={() => this.handleEqual()}>=</Button>
						<Button handleClick={this.addToInput}>-</Button>
					</div>
					<div className='row'>
						<Button handleClick={this.addToInput}>(</Button>
						<ClearButton handleClick={() => this.handleClear()}>
							Clear
						</ClearButton>
						<Button handleClick={this.addToInput}>)</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default App
