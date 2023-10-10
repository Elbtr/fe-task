import { Component } from "react";
import { Home } from "./components";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="fixed bg-slate-900 w-full h-full top-0 right-0 left-0 bottom-0" />
        <div className="h-full relative">
          <nav className="navbar relative z-10 bg-slate-400 ">
            <h1>list navbar</h1>
          </nav>
          <div className="app relative z-10 text-white">
            <Home />
          </div>
        </div>
      </div>
    );
  }
}
