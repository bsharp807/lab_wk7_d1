import React from 'react';

class CalculatorForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      baseAmount: '',
	    annualInterest: '',
	    calculationPeriod: '',
      errorMessage: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBase = this.handleBase.bind(this);
    this.handleInterest = this.handleInterest.bind(this);
    this.handleYears = this.handleYears.bind(this);
  }

  handleBase(event) {
    this.setState({baseAmount: event.target.value})
  }

  handleInterest(event) {
    this.setState({annualInterest: event.target.value})
  }

  handleYears(event) {
    this.setState({calculationPeriod: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    if(!this.state.calculationPeriod) {
      this.setState({
        errorMessage: "Years cannot be 0"
      })
    } else {
      this.setState({errorMessage: ''})
      const baseAmount = parseInt(this.state.baseAmount);
      const annualInterest = parseInt(this.state.annualInterest);
      const calculationPeriod = parseInt(this.state.calculationPeriod);
      this.props.handleCalculator(baseAmount, annualInterest, calculationPeriod)
    }

  }

  render() {

    return(
      <div>
      <form className='ui form'>
      <label for='base-amount'>Base Amount:</label>
      <input type='number' id='base-amount' aria-label='base' onChange={this.handleBase}/>
      <label for='annual-interest'>Annual Interest:</label>
      <input type='number' id='annual-interest' aria-label='interest' onChange={this.handleInterest}/>
      <label for='years-to-grow'>Years to grow:</label>
      <input min={0} step={1} type='number' id='years-to-grow' aria-label='years' onChange={this.handleYears}/>
      <div>
      {this.state.errorMessage}
      </div>
      <input aria-label='submit' type='submit' value='submit' onClick={this.handleSubmit} />
      </form>
      </div>
    )


  }



  }



export default CalculatorForm;
