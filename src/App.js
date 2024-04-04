import './App.css';
import { useState } from 'react';

import Scenario from './containers/Scenario/Scenario';
import HTMLBox from './containers/HTMLBox/HTMLBox';
import CSSBox from './containers/CSSBox/CSSBox';
import JSBox from './containers/JSBox/JSBox';
import OutputBox from './containers/OutputBox/OutputBox';
import ScenarioButtons from './containers/ScenarioButtons/ScenarioButtons';
import RestartButton from './containers/RestartButton/RestartButton';

import logo_3WA from './assets/images/logo_3WA.svg';

function App() {
  const [step, setStep] = useState(0);

  function addStep() {
    setStep(step + 1);
  }

  function removeStep() {
    setStep(step - 1);
  }

  function restart() {
    window.location.reload(false);
  }

  return (
    <div className="App">
      <img src={logo_3WA} className="logo"></img>
      <h1><span className='left'>&lt;</span>Apprendre à coder avec la 3W Academy !<span className='right'>&gt;</span></h1>
      <Scenario step={step}></Scenario>
      <ScenarioButtons addStep={addStep} removeStep={removeStep} step={step}></ScenarioButtons>
      <section className='iframes-section'>
        <div className='iframes-container'>
          <div className="iframes-code">
            <HTMLBox></HTMLBox>
            <CSSBox></CSSBox>
          </div>
          <div className="iframe-output">
            <OutputBox></OutputBox>
          </div>
        </div>
        <JSBox></JSBox>
      </section>
      <RestartButton restart={restart} ></RestartButton>
    </div>
  );
}

export default App;
