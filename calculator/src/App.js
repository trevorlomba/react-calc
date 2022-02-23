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
			inputType: 'empty',
			COLength: 0,
			openParenths: 0,
		}
	}

	preVal = ''
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
	

	appendInput = (val, type, set = false, slice = false, parenths = 0) => {

		if (type[this.state.inputType][0] === 'break') { return } else {
			this.preVal = val
			let openParenths = this.state.openParenths
			let COLength = this.state.COLength
			let input = this.state.input
			
			if (type[this.state.inputType][1]) {
				input = ''
				openParenths = 0
				COLength = -val.length
			} 
			if (type.parenths) {
				openParenths = parseInt(this.state.openParenths) + type.parenths 
			}
			console.log(type)
			console.log(type[this.state.inputType][2])
			if (type[this.state.inputType][2]) {
				let slice = type[this.state.inputType][2]
				if (slice === 'COL') { slice = COLength } else if (slice === 'preVal') {slice = this.preVal.length}
				input = input.slice(0, input.length - slice)
				console.log(input)
				COLength = COLength - slice
			
			if (type.COLength) {
				console.log(this.COLengthState)
				this.COLengthState = type.COLength
				console.log(this.COLengthState)
			}}
			this.setState({ 
				input: input + val,
				COLength: COLength + val.length,
				inputType: type[this.state.inputType][0],
				openParenths: openParenths
			})
			this.setState({
				
			}) }
		
	}


	addToInput = (val) => {
		if (isNaN(val)) {
			switch (val) {
				case ')':
					if (this.state.openParenths < 1) {
						return
					} else {
						this.appendInput(
							val,
							this.closedParenths
						)
					}
					break
				case '(':


					this.appendInput(
						val,
						this.openedParenths
					)
					break

				case '.':
					this.appendInput(val, this.decimal)
					break
				case '-':
					this.appendInput(val, this.minus)
					break

				default:
					this.appendInput(val, this.operator)
					break

			}


		} else {
			switch (this.state.inputType) {
				case 'answer':
					this.appendInput(val, this.CO)
					break
				default:
					this.appendInput(val, this.CO)
					break
			}
		}
		
	}

	handleEqual = () => {
		switch (this.state.inputType) {
			case 'operator':
				this.appendInput('', this.equals)
				break
			default:
				let answer
				if (this.state.openParenths >= 0) {
					answer = this.state.input + ')'.repeat(this.state.openParenths)
				} else {
					answer = '('.repeat(this.state.openParenths) + this.state.input
				}
				this.appendInput(
					math.evaluate(answer).toPrecision(5),
					this.equals
				)
		}
	}

	handleClear = () => {
		this.appendInput('', this.clear)
	}

	render() {
		return (
			<div className='app'>
				<div className='calc-wrapper'>
					<Logger
						COLength={this.state.COLength}
						openParenths={this.state.openParenths}
						inputType={this.state.inputType}></Logger>
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
