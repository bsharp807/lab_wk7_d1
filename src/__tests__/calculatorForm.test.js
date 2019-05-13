import React from 'react';
import CalculatorForm from '../components/CalculatorForm';
import DisplayForm from '../components/DisplayForm';
import CalculatorBox from '../container/CalculatorBox';
import { render, fireEvent, cleanup } from 'react-testing-library';

const setup = () => {
  const utils = render(
    <div>
    <CalculatorBox />
    </div>
  );
  const base = utils.getByLabelText('base');
  const interest = utils.getByLabelText('interest');
  const years = utils.getByLabelText('years');
  const submit = utils.getByLabelText('submit');



  return {
    base,
    interest,
    years,
    submit,
    ...utils,
  };
};

afterEach(cleanup);

describe('CalculatorForm', () => {
  it('should not allow for 0 years growth', () => {
    const {getByText, submit} = setup();
    fireEvent.click(submit);
    expect(getByText('Years cannot be 0')).toBeTruthy();

  })

  it('should display result with a £ sign', async () => {
    const { getByText, submit, years, base, interest } = setup();
    fireEvent.change(base, {target: {value: 100}});
    fireEvent.change(interest, {target: {value: 10}});
    fireEvent.change(years, {target: {value: 20}});
    fireEvent.click(submit);
    await (() => {getByText('£')})
  })

  it('should display correct number format', async () => {
    const { getByText, submit, years, base, interest } = setup();
    fireEvent.change(base, {target: {value: 10000}});
    fireEvent.change(interest, {target: {value: 10}});
    fireEvent.change(years, {target: {value: 20}});
    fireEvent.click(submit);
    await (() => {getByText('£73,280.74')})
  })

})
