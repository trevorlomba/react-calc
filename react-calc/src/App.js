import React, { Component } from 'react'
import './App.css'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { ClearButton } from './components/ClearButton'
import { Logger } from './components/Logger'
import * as math from 'mathjs'



let preVal

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			input: '',
			inputType: 'empty',
			COLength: 0,
			openParenths: 0,
			onAnswer: 1,
		}

	}

	
	decimal = {
		'COFloat': 'break',
		'answer': 'decimal',
		'CO': 'COFloat',
		'decimal': 'break',
		'empty': 'decimal',
		'operator': 'decimal,',
		'minus': 'decimal',
		'openParenths': 'decimal'
	}

	closedParenths = {
		'COFloat': 'CO',
		'answer': 'CO',
		'CO': 'CO',
		'decimal': 'CO',
		'empty': 'CO',
		'operator': 'CO',
		'minus': 'break',
		'openParenths': 'break'
	}

	minus = {
		'COFloat': 'minus',
		'answer': 'operator',
		'CO': 'minus',
		'empty': 'minus',
		'decimal': 'break',
		'operator': 'operator',
		'minus': 'break',
		'openParenths': 'minus'
	}

	operator = {
		'COFloat': 'operator',
		'answer': 'operator',
		'CO': 'operator',
		'empty': 'break',
		'decimal': 'break',
		'operator': 'operator',
		'minus': 'operator',
		'openParenths': 'break'
	}

	CO = {
		'COFloat': 'COFloat',
		'answer': 'CO',
		'CO': 'CO',
		'empty': 'CO',
		'decimal': 'COFloat',
		'operator': 'CO',
		'minus': 'CO',
		'openParenths': 'CO'
	}

	openedParenths = {
		'COFloat': 'openParenths',
		'answer': 'openParenths',
		'CO': 'openParenths',
		'empty': 'openParenths',
		'decimal': 'break',
		'operator': 'openParenths',
		'minus': 'openParenths',
		'openParenths': 'openParenths'
	}

	equals = {
		'COFloat': 'answer',
		'answer': 'answer',
		'CO': 'answer',
		'empty': 'answer',
		'decimal': 'break',
		'operator': 'answer',
		'minus': 'break',
		'openParenths': 'break'
	}

	appendInput = (val, type) => {
		this.setState({
			input: this.state.input + val,
			COLength: this.state.COLength + val.length,
			inputType: type,
		})
		
	}

	appendInput2 = (val, type, set = false, slice = false) => {
		let inputState = this.state.input
		let COLengthState = this.state.COLength
		if (type[this.state.inputType] === 'break') { return } else {
			if (slice) {
				inputState = this.state.input.slice(0, this.state.input.length - slice)
				COLengthState = this.state.COLength-slice }
			if (set) {
				this.resetParenths()
				COLengthState = 0
				this.updateAnswer(1)
				inputState = ''
			}
			this.setState({
				input:inputState + val,
				COLength: COLengthState + val.length,
				inputType: type[this.state.inputType],
			})
		}
	}

	clearCOLength = (incr = 0) => this.setState({ COLength: 0 + incr})
	

	setParenths = incr => {
		this.setState({ openParenths: parseInt(this.state.openParenths) + incr })
	}

	resetParenths = () => {
		this.setState({ openParenths: 0 })
	}

	updateAnswer = (bool) => { 
		this.setState({ onAnswer: bool })
	if (bool === 0)  {
		this.setState({ COLength: 1})
	} else { this.setState ({COLength: 0})}}

	addToInput = (val) => {
		let openedParenths, closedParenths, minus, operator
		if (isNaN(val)) {
		
			// break out later?
			switch (val) {
				case ')':
					if (
						this.state.openParenths < 1
					) {
						return
					} else {
						this.setParenths(-1)
						this.appendInput2(val, this.closedParenths)
					}
					break
				case '(':
					switch (this.state.inputType) {
						case 'decimal':
							break
						default:
							this.setParenths(1)
							if(this.state.onAnswer === 1){if(this.state.onAnswer === 1){this.updateAnswer(0)}}
							this.appendInput2(val, this.openedParenths)
							break
					}
					break


				case '.':
					this.appendInput2(val, this.decimal)
					break
				case '-':
					
					switch (this.state.inputType) {
						case 'operator':
							this.appendInput2(val, this.minus, false, 1)
							if(this.state.onAnswer === 1){if(this.state.onAnswer === 1){this.updateAnswer(0)}}
							break
						default:
							this.appendInput2(val, this.minus)
							if(this.state.onAnswer === 1){if(this.state.onAnswer === 1){this.updateAnswer(0)}}
							break
					}
					break
				default:				
						switch (this.state.inputType) {
							case 'minus':
							
								this.appendInput2(val, this.operator, false, preVal.length)
								break
							case 'operator':
								this.appendInput2(val, this.operator, false, preVal.length)
								break
							default:
								this.appendInput2(val, this.operator)
								break
						}
						if(this.state.onAnswer === 1){if(this.state.onAnswer === 1){if(this.state.onAnswer === 1){this.updateAnswer(0)}}}
					
			}
		} else {
			switch (this.state.inputType) {
				case 'answer':
					this.appendInput2(val, this.CO, true)
					// this.setInput(val, 'CO')
					break
				default:
					this.appendInput2(val, this.CO,)
					break
			}
		}
		preVal = val
		

	}

	handleEqual = () => {
		let equals
			switch (this.state.inputType) {
				case 'operator':
					this.appendInput2('', this.equals, false, preVal.length)

					break
				default:
					let answer
					if (this.state.openParenths >= 0) {
						answer = this.state.input + ')'.repeat(this.state.openParenths)
					} else {
						answer = '('.repeat(this.state.openParenths) + this.state.input
					}
					this.appendInput2(math.evaluate(answer).toPrecision(5), this.equals, true)
			}
			this.updateAnswer(1)
		
	}

	handleClear = () => {
		let equals
		switch (this.state.onAnswer) {
			case 1:
				this.appendInput2('', this.equals, true)
				break
			default:
				this.appendInput2('', this.equals, false, this.state.COLength)
				this.clearCOLength()
				break
		}

		this.updateAnswer(1)
		this.resetParenths()
	}

	render() {
		return (
			<div className='app'>
				<div className='calc-wrapper'>
					<Logger
						COLength={this.state.COLength}
						onAnswer={this.state.onAnswer}
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
