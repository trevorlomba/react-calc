import React, { Component } from 'react'
import './App.css'
import { Button } from './components/Button'
import { Output } from './components/Output'
import { ClearButton } from './components/ClearButton'
import { Logger } from './components/Logger'
import { decimal, minus, openedParenths, closedParenths, CO, operator, clear, equals  } from './valTypes'
import * as math from 'mathjs'


class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			output: '',
			previousValType: 'empty',
			operand: '',
			openParenths: 0,
		}
	}

	input = {
		// valType : valTypes object
		')': closedParenths,
		'(': openedParenths,
		'sin(': openedParenths,
		'.': decimal,
		'-': minus,
		'NaN': operator,
		'int': CO,
	}

	previousVal = ''

	
	addToOutput = (val) => { // evaluates input value and calls updateOutput function accordingly
		/[().-]/.test(val) ? this.updateOutput(val, this.input[val])
		: isNaN(val) ? this.updateOutput(val, this.input.NaN) 
		: this.updateOutput(val, this.input.int) 
	}

	
	updateOutput = (val, valType) => {

		if (valType[this.state.previousValType][0] === 'break' || (valType.parenths + this.state.openParenths < 0)) { return } else { // if (value for  key [previousValType] in the valTypes object has flag to break function) OR (there are no open parenths and a closed parenths is passed), return. else:
			let openParenths = this.state.openParenths + /[(]/.test(val)*1 
			- (/[)]/.test(val)*1)
			let operand = this.state.operand
			let output = this.state.output

			if (valType[this.state.previousValType][1]) { // if key value pair in valTypes has flag to reset output
				output = ''
				openParenths = 0
				operand = '' 
			}
			if (valType[this.state.previousValType][2]) { // if key value pair in valTypes features flag to slice and replace end of output
				
				let slice // set slice length depending on flag in key value pair
				valType[this.state.previousValType][2] === 'COL' ? slice = operand.length 
				: valType[this.state.previousValType][2] === 'previousVal' ? slice = this.previousVal.length
				: valType[this.state.previousValType][2] = valType[this.state.previousValType][2]
				
				output = output.slice(0, output.length - slice)
				operand = operand.slice(0, operand.length - slice)

			}

			if (valType.doMath) { // if valType object has flag to evaluate output as expression
				let expression = this.state.output + ')'.repeat(this.state.openParenths) // close any open parenthesis before evaluating
				let answer = math.evaluate(expression).toPrecision()
				this.setState({
					output: answer,
					previousValType: valType[this.state.previousValType][0],
					operand: '',
					openParenths: openParenths
				})
			 } else { // else:
				 this.setState({
					 output: output + val,
					 previousValType: valType[this.state.previousValType][0],
					 operand: operand + val,
					 openParenths: openParenths
				 })}
			
			this.previousVal = val
		}
	}
	render() {
		return (
			<div className='app'>
				<div className='calc-wrapper'>
					<Logger
						operand={this.state.operand}
						openParenths={this.state.openParenths}
						previousValType={this.state.previousValType}></Logger>
					<Output output={this.state.output}></Output>
					<div className='row'>
						<Button handleClick={this.addToOutput}>7</Button>
						<Button handleClick={this.addToOutput}>8</Button>
						<Button handleClick={this.addToOutput}>9</Button>
						<Button handleClick={this.addToOutput}>/</Button>
					</div>
					<div className='row'>
						<Button handleClick={this.addToOutput}>4</Button>
						<Button handleClick={this.addToOutput}>5</Button>
						<Button handleClick={this.addToOutput}>6</Button>
						<Button handleClick={this.addToOutput}>*</Button>
					</div>
					<div className='row'>
						<Button handleClick={this.addToOutput}>1</Button>
						<Button handleClick={this.addToOutput}>2</Button>
						<Button handleClick={this.addToOutput}>3</Button>
						<Button handleClick={this.addToOutput}>+</Button>
					</div>
					<div className='row'>
						<Button handleClick={this.addToOutput}>.</Button>
						<Button handleClick={this.addToOutput}>0</Button>
						<Button handleClick={() => this.updateOutput('', equals)}>=</Button>
						<Button handleClick={this.addToOutput}>-</Button>
					</div>
					<div className='row'>
						<Button handleClick={this.addToOutput}>(</Button>
						<ClearButton handleClick={() => this.updateOutput('', clear)}>
							Clear
						</ClearButton>
						<Button handleClick={this.addToOutput}>)</Button>
						<Button handleClick={this.addToOutput}>sin(</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default App
