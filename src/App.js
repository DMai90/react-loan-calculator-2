import React, { Component } from "react";
import "./App.css";
import AppNavbar from "./components/layout/AppNavbar";
import LoanDetails from "./components/calculations/LoanDetails";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <div className="container">
          <LoanDetails />
        </div>
      </div>
    );
  }
}

export default App;
