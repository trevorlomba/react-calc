import React, { Component } from 'react'
import './App.css'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { ClearButton } from './components/ClearButton'
import { Logger } from './components/Logger'
import { decimal, minus, openedParenths, closedParenths, CO, operator, clear, equals  } from './valTypes'
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

	input = {
		')': closedParenths,
		'(': openedParenths,
		'.': decimal,
		'-': minus,
		'NaN': operator,
		'int': CO,
	}

	preVal = ''

	
	addToInput = (val) => {
		/[().-]/.test(val) ? this.updateInput(val, this.input[val])
		: isNaN(val) ? this.updateInput(val, this.input.NaN) 
		: this.updateInput(val, this.input.int) 
	}

	
	updateInput = (val, type, set = false, slice = false, parenths = 0) => {

		if (type[this.state.preValType][0] === 'break') { return } else {
			let openParenths = this.state.openParenths
			let COLength = this.state.COLength
			let input = this.state.input

			if (type[this.state.preValType][1]) {
				console.log('clear input and parenths')
				console.log('COLength ' +(-val.length))
				input = ''
				openParenths = 0
				COLength = -val.length
			}
			if (type.parenths) {
				console.log('parenths +' + type.parenths)
				openParenths = parseInt(this.state.openParenths) + type.parenths
			}
			if (type[this.state.preValType][2]) {
				
				let slice = type[this.state.preValType][2]
				if (slice === 'COL') { 
					console.log('sliced ' + COLength)
					slice = COLength } else if (slice === 'preVal') { 
					console.log('slice d' + this.preVal + this.preVal.length)
						slice = this.preVal.length }
				input = input.slice(0, input.length - slice)
				COLength = COLength - slice

			}
			if (type.COLength) {
				COLength = type.COLength
			}
			if (type.doMath) {
				let answer
				if (this.state.openParenths >= 0) {
					answer = this.state.input + ')'.repeat(this.state.openParenths)
				} else {
					answer = '('.repeat(this.state.openParenths) + this.state.input
				}
				val = math.evaluate(answer).toPrecision(5)

			}

			this.setState({
				input: input + val,
				COLength: COLength + val.length,
				preValType: type[this.state.preValType][0],
				openParenths: openParenths
			})
			
			this.preVal = val
		}
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
						<Button handleClick={() => this.updateInput('', equals)}>=</Button>
						<Button handleClick={this.addToInput}>-</Button>
					</div>
					<div className='row'>
						<Button handleClick={this.addToInput}>(</Button>
						<ClearButton handleClick={() => this.updateInput('', clear)}>
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
