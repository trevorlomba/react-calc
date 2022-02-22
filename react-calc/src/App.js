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
			onAnswer: 1,
		}
	}

	appendInput = (val, type) => {
		this.setState({
			input: this.state.input + val,
			COLength: this.state.COLength + val.length,
			inputType: type,
		})
	}

	updateInputType = type => this.setState({ inputType: type })

	clearCOLength = (incr = 0) => this.setState({ COLength: 0 + incr })

	setInput = (val, type) =>
		this.setState({
			input: val,
			COLength: this.state.COLength + 1,
			inputType: type,
		})

	setParenths = incr => {
		this.setState({ openParenths: parseInt(this.state.openParenths) + incr })
	}
	
	resetParenths = () => {
		this.setState({ openParenths: 0 })
	}

	updateAnswer = (bool) => this.setState({ onAnswer: bool })

	addToInput = (val) => {
		if (isNaN(val)) {
			// break out later?
			switch (val) {
				case ')':
					if (
						this.state.openParenths < 1 ||
						this.state.inputType === 'openParenths' ||
						this.state.inputType === 'minus'
					) {
						return
					} else {
						this.setParenths(-1)
						this.appendInput(val, 'CO')
					}
					break
				case '(':
					switch (this.state.inputType) {
						case 'decimal':
							break
						default:
							this.setParenths(1)
							this.appendInput(val, 'openParenths')
							break
					}
					break
				case '.':
					switch (this.state.inputType) {
						case 'COFloat':
							break
						case 'answer':
							this.setInput(val, 'decimal')
							break
						case 'CO':
							this.appendInput(val, 'COFloat')
							break
						case 'empty':
							this.appendInput(val, 'CO')
							break
						default:
							this.appendInput(val, 'decimal')
							break
					}
					break
				case '-':
					switch (this.state.inputType) {
						case 'decimal':
							break
						case 'minus':
							break
						case 'operator':
							this.setInput(
								this.state.input.slice(0, this.state.input.length - 1) + val,
								'operator'
							)
							this.clearCOLength(1)
							break
						case 'answer':
							this.appendInput(val, 'operator')
							break
						default:
							this.appendInput(val, 'minus')
							break
					}
					break
				default:
					if (
						this.state.inputType === 'empty' ||
						this.state.inputType === 'decimal' ||
						this.state.inputType === 'openParenths'
					) {
						return
					} else {
						switch (this.state.inputType) {
							case 'minus':
								this.setInput(
									this.state.input.slice(0, this.state.input.length - 1) + val,
									'operator'
								)
								this.clearCOLength(1)
								break
							case 'operator':
								this.setInput(
									this.state.input.slice(0, this.state.input.length - 1) + val,
									'operator'
								)
								this.clearCOLength(1)
								break
							default:
								this.appendInput(val, 'operator')
								this.clearCOLength(1)
								break
						}
					}
			}
		} else {
			switch (this.state.inputType) {
				case 'answer':
					this.setInput(val, 'CO')
					break
				case 'COFloat':
					this.appendInput(val, 'COFloat')
					break
				case 'decimal':
					this.appendInput(val, 'COFloat')
					break
				default:
					this.appendInput(val, 'CO')
					break
			}
		}
		this.updateAnswer(0)
	}

	handleEqual = () => {
		if (
			this.state.inputType === 'decimal' ||
			this.state.inputType === 'minus' ||
			this.state.inputType === 'openParenths'
		) {
			return
		} else {
			switch (this.state.inputType) {
				case 'operator':
					this.setState({
						input: this.state.input.slice(0, this.state.input.length - 1),
					})
					this.updateInputType('answer')
					break
				default:
					let answer
					if (this.state.openParenths >= 0) {
						answer = this.state.input + ')'.repeat(this.state.openParenths)
					} else {
						answer = '('.repeat(this.state.openParenths) + this.state.input
					}
					this.setState({
						input: math.evaluate(answer).toPrecision(),
					})
					this.updateInputType('answer')
					this.clearCOLength()
			}
			this.updateAnswer(1)
			this.resetParenths()
		}
	}

	handleClear = () => {
		switch (this.state.onAnswer) {
			case 1:
				this.setInput('', 'empty')
				this.clearCOLength()
				break
			default:
				this.setState({
					input: this.state.input.slice(
						0,
						this.state.input.length - this.state.COLength
					),
				})
				this.updateInputType('answer')
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
						<Button handleClick={this.addToInput}>.(</Button>
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
