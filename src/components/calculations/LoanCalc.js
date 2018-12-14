import React, { Component } from "react";

class LoanCalc extends Component {
  render() {
    return (
      <div>
        <h5>Results</h5>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Monthly Payment</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={this.props.monthlyPmt}
              id="monthlyPmt"
              disabled
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Total Payment</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={this.props.totalPmt}
              id="totalPmt"
              disabled
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Total Interest</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={this.props.totalInt}
              id="totalInt"
              disabled
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LoanCalc;
// Work on rendering the results
