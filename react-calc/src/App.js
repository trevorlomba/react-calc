import React, { Component } from 'react'
import './App.css'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { ClearButton } from './components/ClearButton'
import * as math from 'mathjs'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = { input: '', inputType: 'empty', COLength: 0 }
	}

	appendInput = val => {this.setState({ input: this.state.input + val , COLength: this.state.COLength+1  })}
  updateInputType = type => this.setState({ inputType: type})
  clearCOLength = (inc=0) => this.setState({ COLength: 0+inc})
	setInput = val => this.setState({ input: val })

	addToInput = (val) => {
	
    console.log(this.state.COLength)
		if (isNaN(val)) {
			if (val === '.') {
				switch (this.state.inputType) {
					case 'decimal':
						console.log('decimal')
						break
					case 'COFloat':
						console.log('COFloat')
						break
					case 'CO':
						this.appendInput(val)
            this.updateInputType('COFloat')
						break
					case 'empty':
						this.appendInput(val)
            this.updateInputType('CO')
						break
					case 'minus':
						this.appendInput(val)
						this.updateInputType('decimal')
						break
					case 'operator':
						this.appendInput(val)
            this.updateInputType('decimal')
            break
					case 'answer':
						this.setInput(val)
            this.updateInputType('decimal')
            break
					default:
						console.log('error')
				}
			}
			else if (val === '-') {
				switch (this.state.inputType) {
					case 'decimal':
						console.log('minus')
						break
          case 'minus':
            console.log('minus')
            break
					case 'COFloat':
						console.log('COFloat')
						this.appendInput(val)
            this.updateInputType('minus')
            this.clearCOLength(1)
            break
					case 'CO':
						console.log('CO')
						this.appendInput(val)
						this.updateInputType('minus')
            this.clearCOLength(1)
            break
					case 'empty':
						console.log('empty')
						this.appendInput(val)
						this.updateInputType('minus')
            this.clearCOLength(1)
            break
					case 'operator':
						console.log('operator')
						this.appendInput(val)
						this.updateInputType('minus')
            break
					case 'answer':
						this.appendInput(val)
						this.updateInputType('operator')
						break
					default:
						console.log('error')
				}
			} else {
        
				switch (this.state.inputType) {
					case 'empty':
						console.log('empty')
						break
					case 'decimal':
						console.log('decimal')
						break
					case 'COFloat':
						console.log('COFloat')
            this.appendInput(val)
						this.updateInputType('operator')
            this.clearCOLength(1)
						break
					case 'CO':
						console.log('CO')
            this.appendInput(val)
						this.updateInputType('operator')
            this.clearCOLength(1)
						break
					case 'minus':
						console.log('minus')
            let newinput = this.state.input.slice(0, this.state.input.length - 1)
				    this.setState({ input: newinput + val })  
            this.clearCOLength(1)
						break
					case 'operator':
						console.log('operator')
            let newerinput = this.state.input.slice(0, this.state.input.length - 1)
				    this.setState({ input: newerinput + val })  
            this.clearCOLength(1)
						break
					case 'answer':
						this.appendInput(val)
						this.updateInputType('operator')
            this.clearCOLength(1)
						break
					default:
						console.log('error')
				}
			}
		} else {
			switch (this.state.inputType) {
				case 'decimal':
					console.log('decimal')
          this.appendInput(val)
					this.updateInputType('CO')
					break
				case 'COFloat':
					console.log('COFloat')
          this.appendInput(val)
					this.updateInputType('COFloat')
					break
				case 'CO':
					console.log('CO')
          this.appendInput(val)
					this.updateInputType('CO')
					break
				case 'empty':
					console.log('empty')
          this.appendInput(val)
					this.updateInputType('CO')
					break
				case 'minus':
					console.log('minus')
          this.appendInput(val)
					this.updateInputType('CO')
					break
				case 'operator':
					console.log('operator')
          this.appendInput(val)
						this.updateInputType('CO')
					break
				case 'answer':
					this.setInput(val)
					this.updateInputType('CO')
					break
				default:
					console.log('error')
			}
		}
  }
  
	handleEqual = () => {
    switch(this.state.inputType) {
    case 'decimal':
					console.log('decimal')
					break
    case 'minus':
      console.log('minus')
      break
    case 'operator':
      console.log('operator')
      break
		default:
			this.setState({
				input: ''+math.evaluate(this.state.input),
			})
      this.updateInputType('answer')
      this.clearCOLength()
			}
		
	}

	handleClear = () => {
    if (this.state.COLength === 1) {
      this.setState({ input: this.state.input.slice(0, this.state.input.length - 1) })
    } else if (this.state.COLength > 1) 
    { switch (this.state.inputType) {
      case 'answer':
        this.setInput('')
        this.updateInputType('answer')
        this.clearCOLength()
        break
			case 'decimal':
				console.log('decimal')
				this.setState({input: this.state.input.slice(	0, this.state.input.length - this.state.COLength),
			})
				this.updateInputType('empty')
        this.clearCOLength()
				break
			case 'COFloat':
				console.log('COFloat')
				this.setState({input: this.state.input.slice(	0, this.state.input.length - this.state.COLength),
			})
				this.updateInputType('empty')
        this.clearCOLength()
				break
			case 'CO':
				console.log('CO')
				this.setState({input: this.state.input.slice(	0, this.state.input.length - this.state.COLength),
			})
				this.updateInputType('empty')
        this.clearCOLength()
				break
			case 'minus':
				console.log('minus')
				this.setState({input: this.state.input.slice(	0, this.state.input.length - this.state.COLength),
			})
				this.updateInputType('empty')
        this.clearCOLength()
				break
			case 'operator':
				console.log('operator')
				this.setState({ input: this.state.input.slice(0, this.state.input.length - 1) })
				this.updateInputType('empty')
				break
			default:
				console.log('error') }
		} else {
      this.setInput('')
    }
      // if (this.state.onAnswer) {
      //   this.clearInput()
      //   this.clearCO()
      // } else if (isNaN(this.state.input[this.state.input.length - 1])) {
        
      // } else if (this.state.currentOperand) {
      //   this.setState({input: this.state.input.slice(	0, this.state.input.length - this.state.COLength),
      //   })
      //   this.clearCO()
      // } else {
      //   this.clearCO()
      //   this.clearInput()
      // }
      // if (this.state.COLength === 0) { this.setState({ inputType: 'empty'} )}
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
