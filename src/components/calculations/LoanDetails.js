import React, { Component } from "react";
import LoanCalc from "./LoanCalc";

class LoanDetails extends Component {
  state = {
    loanAmount: "",
    intRate: "",
    years: "",
    monthlyPmt: "",
    totalPmt: "",
    totalInt: "",
    amortization: "",
    interestCalc: ""
  };

  calculateLoan = () => {
    const {
      loanAmount,
      intRate,
      years,
      amortization,
      interestCalc
    } = this.state;

    const monthlyTerm = years * 12;

    // Principal and Interest Calculation Method (mortgage style)
    if (amortization === "pAndI" && interestCalc === "365/365") {
      const monthlyInt = intRate / 100 / 12;
      const x = Math.pow(1 + monthlyInt, monthlyTerm);
      const monthly = (loanAmount * monthlyInt * x) / (x - 1);
      const monthlyPmt = monthly.toFixed(2);
      const totalPmt = (monthly * monthlyTerm).toFixed(2);
      const totalInt = (totalPmt - loanAmount).toFixed(2);

      this.setState({ monthlyPmt, totalPmt, totalInt });
    }

    if (amortization === "pAndI" && interestCalc === "365/360") {
      const monthlyInt = intRate / 100 / ((360 / 365) * 12);
      const x = Math.pow(1 + monthlyInt, monthlyTerm);
      const monthly = (loanAmount * monthlyInt * x) / (x - 1);
      const monthlyPmt = monthly.toFixed(2);
      const totalPmt = (monthly * monthlyTerm).toFixed(2);
      const totalInt = (totalPmt - loanAmount).toFixed(2);

      this.setState({ monthlyPmt, totalPmt, totalInt });
    }

    // Principal plus Interest Calcuation Method
    if (amortization === "pPlusI") {
      const monthly = (loanAmount * (1 + intRate / 100)) / monthlyTerm;
      const monthlyPmt = monthly.toFixed(2);
      const totalPmt = (loanAmount * (1 + intRate / 100)).toFixed(2);
      const totalInt = ((loanAmount * intRate) / 100).toFixed(2);

      this.setState({ monthlyPmt, totalPmt, totalInt });
    }
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    this.calculateLoan();
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card card-body mt-5 text-center">
              <h2 className="card-title">Loan Calculator</h2>
              <form id="loan-form" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">$</span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      id="loanAmount"
                      placeholder="Loan Amount"
                      value={this.state.loanAmount}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">%</span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      id="intRate"
                      placeholder="Interest Rate"
                      value={this.state.intRate}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      id="years"
                      placeholder="Years to Repay"
                      value={this.state.years}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        Amortization Method
                      </span>
                    </div>
                    <select
                      className="custom-select"
                      id="amortization"
                      onChange={this.onChange}
                      required
                    >
                      <option defaultValue />
                      <option value="pAndI">Principal and Interest</option>
                      <option value="pPlusI">Principal plus Interest</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        Interest Calculation
                      </span>
                    </div>
                    <select
                      className="custom-select"
                      id="interestCalc"
                      onChange={this.onChange}
                      disabled={this.state.amortization === "pPlusI"}
                      required
                    >
                      <option defaultValue />
                      <option value="365/365">365/365</option>
                      <option value="365/360">365/360</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-block btn-success"
                    value="Calculate"
                  />
                </div>
              </form>
              {this.state.monthlyPmt ? (
                <LoanCalc
                  monthlyPmt={this.state.monthlyPmt}
                  totalPmt={this.state.totalPmt}
                  totalInt={this.state.totalInt}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoanDetails;
