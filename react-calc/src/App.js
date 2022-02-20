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

	appendInput = val => this.setState({ input: this.state.input + val })

	appendCO = val =>
		this.setState({ currentOperand: this.state.currentOperand + val })

	setInput = val => this.setState({ input: val })

	setCO = val => this.setState({ currentOperand: val })

	clearAnswer = () => {
		this.setState({ onAnswer: '' })
	}

	clearCO = () => {
		this.setState({ onAnswer: '' })
	}

	clearInput = () => {
		this.setState({ input: '' })
	}
	addToInput = (val) => {
		// console.log(isNaN('.'))
		// console.log(val)
		// console.log(this.state.input)
		// console.log(this.state.input[this.state.input.length - 1])
		// console.log('val.' + this.state.input)
		// console.log(this.state.currentOperand)

		// const append = (i) => {
		// 	this.setState({ i: i + val })
		// }
		// const removeLast = (i) =>
		// 	this.setState({ i: i.slice(0, this.state.i.length - 1) })
		// const calculate = (i) => this.setState({ i: math.evaluate(i) })
		// const remove = (i) => this.setState({ i: '' })
		// const removeCo = (i) =>
		// 	this.setState({
		// 		i: i.slice(0, this.state.i - this.state.currentOperand.length),
		// 	})
		// const replace = (i) => this.setState({ i: val })

		if (isNaN(val)) {
      console.log('val is' + val)
      console.log('CO is' + this.state.currentOperand)
      console.log('input is' + this.state.input)
			if (val === '.') {
				if (!this.state.currentOperand) {
          return 
        } else if (!this.state.currentOperand.includes(val)) {
						this.appendInput(val)
						this.appendCO(val)
						this.clearAnswer()
					}
				 else {
					return
				}
			} else if (val === '-') {
        if (this.state.currentOperand) {
          if (
            this.state.currentOperand.includes(val) ||
            this.state.currentOperand === '.'
            ) {
            console.log(this.state.currentOperand)
            return
          } else {
            this.appendInput(val)
            this.appendCO(val)
            this.clearAnswer()
          } 
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
				this.setState({ input: newinput + val })
				this.clearAnswer()
				this.clearCO()
			} else {
				this.appendInput(val)
				this.clearCO()
			}
		} else if (this.state.onAnswer) {
			this.setInput(val)
			this.setCO(val)
		} else {
			this.appendInput(val)
			this.appendCO(val)
		}
	}
	handleEqual = () => {
		if (
			isNaN(this.state.input[this.state.input.length - 1]) &&
			this.state.input[this.state.input.length - 1] != '.'
		) {
			return
		} else {
			this.setState({
				input: math.evaluate(this.state.input),
				currentOperand: math.evaluate(this.state.input),
				onAnswer: 'True',
			})
		}
	}

	handleClear = () => {
		if (this.state.onAnswer) {
			this.clearInput()
			this.clearCO()
		} else if (isNaN(this.state.input[this.state.input.length - 1])) {
			this.setState({ input: this.state.input.slice(0, this.state.input.length - 1) })
      this.clearCO()
		} else if (this.state.currentOperand) {
			this.setState({input: this.state.input.slice(	0, this.state.input.length - this.state.currentOperand.length),
			})
      this.clearCO()
		} else {
			this.clearCO()
      this.clearInput()
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
						<ClearButton handleClick={() => this.handleClear()}>
							Clear
						</ClearButton>
					</div>
				</div>
			</div>
		)
	}
}

export default App
