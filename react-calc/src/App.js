import React, { Component } from 'react'
import './App.css'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { ClearButton } from './components/ClearButton'
import * as math from 'mathjs'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = { input: '', currentOperand: '', onAnswer: '' }
	}

	addToInput = (val) => {
		console.log(isNaN('.'))
		console.log(val)
		console.log(this.state.input)
		console.log(this.state.input[this.state.input.length - 1])
		console.log('val.' + this.state.input)
		console.log(this.state.currentOperand)
		this.setState({ onAnswer: '' })
		if (isNaN(val)) {
			if (val === '.') {
				if (this.state.currentOperand.includes(val)) {
					return
				} else {
					console.log(val + 'isval')
					console.log(this.state.input)
					this.setState({
						input: this.state.input + val,
						currentOperand: this.state.currentOperand + val,
						onAnswer: '',
					})
				}
			} else if (val === '-') {
				if (
					this.state.currentOperand.includes(val) ||
					this.state.currentOperand === '.'
				) {
					return
				} else {
					this.setState({
						input: this.state.input + val,
						currentOperand: this.state.currentOperand + val,
						onAnswer: '',
					})
				}
			} else if (
				this.state.input.length === 0 ||
				this.state.currentOperand === '.' ||
				this.state.currentOperand === '-'
			) {
				return
			} else if (
				this.state.input.length > 1 &&
				isNaN(this.state.input[this.state.input.length - 1]) &&
				'.' !== this.state.input[this.state.input.length - 1]
			) {
				let newinput = this.state.input.slice(0, this.state.input.length - 1)
				this.setState({
					input: newinput + val,
					currentOperand: '',
					onAnswer: '',
				})
			} else {
				this.setState({ input: this.state.input + val, currentOperand: '' })
			}
		} else {
			if (this.state.onAnswer) {
				this.setState({ input: val, currentOperand: val })
			} else {
				this.setState({
					input: this.state.input + val,
					currentOperand: this.state.currentOperand + val,
				})
			}
		}
	}
	handleEqual = () => {
		this.setState({ onAnswer: true })
		if (isNaN(this.state.input[this.state.input.length - 1])) {
			return
		} else {
			console.log(math.evaluate(this.state.input))
			console.log(isNaN(math.evaluate(this.state.input)))
			this.setState({
				input: math.evaluate(this.state.input),
				currentOperand: math.evaluate(this.state.input),
			})
		}
	}

	handleClear = () => {
		console.log('handleclear')
    console.log(this.state.input)
    console.log(this.state.currentOperand)
		if (this.state.onAnswer) {
      this.setState({ input: "", currentOperand: ""})
    } else if (isNaN(this.state.input[this.state.input.length - 1])) {
			this.setState({
				input: this.state.input.slice(0, this.state.input.length - 1),
				currentOperand: '',
			})
		} else if (this.state.currentOperand) {
			this.setState({
				input: this.state.input.slice(
					0,
					this.state.input.length - this.state.currentOperand.length
				),
				currentOperand: '',
			})
		} else {
			this.setState({
				input: '',
				currentOperand: '',
			})
		}
	}

	render() {
		return (
			<div className='app'>
				<div className='calc-wrapper'>
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
						<ClearButton handleClick={() => this.handleClear()}>Clear</ClearButton>
					</div>
				</div>
			</div>
		)
	}
}

export default App
