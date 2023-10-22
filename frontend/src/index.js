import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Dapp from './components/Dapp'
import './index.css';
import { Web3Provider } from './provider';

const WrappedApp = () => (
  <Web3Provider>
    <App />
  </Web3Provider>
)
// This is the entry point of your application, but it just renders the Dapp
// react component. All of the logic is contained in it.

ReactDOM.render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>,
  document.getElementById("root")
);
