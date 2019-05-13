import React from 'react';
import CalculatorForm from '../components/CalculatorForm';
import DisplayForm from '../components/DisplayForm';



class CalculatorBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calculation: {},
      amount: ''
    }

    this.handleCalculator = this.handleCalculator.bind(this);

  }

  getInterest(payload) {
    fetch('http://localhost:3000/api/results/compound', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'GBP'}).format(data))
    .then(currency => this.setState({amount: currency}))
  }

  handleCalculator(baseAmount, annualInterest, calculationPeriod) {
    const payload = {baseAmount, annualInterest, calculationPeriod}
    this.getInterest(payload);
  }


  render(){

    return(

      <div>
      <CalculatorForm handleCalculator={this.handleCalculator}/>
      <DisplayForm result={this.state.amount} />
      </div>

    )

  }
};


export default CalculatorBox;
