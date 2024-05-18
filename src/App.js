import './App.css';
import { useEffect, useState } from 'react';

import Scenario from './containers/Scenario/Scenario';
import HTMLBox from './containers/HTMLBox/HTMLBox';
import CSSBox from './containers/CSSBox/CSSBox';
import JSBox from './containers/JSBox/JSBox';
import OutputBox from './containers/OutputBox/OutputBox';

import logo_3WA from './assets/images/logo_3WA.svg';

function App() {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState(`
    <style type='text/css' scoped>
    body { background: white; overflow: hidden; margin: 0;}
  
    </style>`);
  const [js, setJs] = useState('');
  const [output, setOutput] = useState('');

  function handleChangeCode(value, type) {
    switch (type) {
      case 'html':
        setHtml(value);
        break;
      case 'css':
        setCss(`
        <style type='text/css' scoped>
        body { background: white; overflow: hidden; margin: 0;}
        ${value}
        </style>`);
        break;
      case 'js':
        setJs(`
        <script>
        ${value}
        </script>`);
        break;
      default:
        break;
    }
  }

  function createOutput() {
    setOutput(`
    ${css}
    ${html}
    ${js}`)
  }

  useEffect(() => {
    createOutput();
  }, [html, css, js]);

  // Scenario
  const [scenarioOpen, setScenarioOpen] = useState(true);
  const [activeThoughts, setActiveThoughts] = useState(false);

  function handleCloseScenario(e) {
    const closestButton = e.target.closest('.button');
    const closestTextScenario = e.target.closest('#text-scenario');
    const closestPingouin = e.target.closest('#pengouin');
    const closestButtonClose = e.target.closest('button');
    const closestCodeMirror = e.target.closest('.codeMirror-container');
    
    if (closestPingouin) return;
    
    if (closestCodeMirror 
        && closestCodeMirror.classList.contains("codeMirror-container")) return;
    
    if (closestButton) {
        if (closestButton.id !== "i-try" 
          && closestButton.classList.contains("button")) return;
    }
    
    if (closestButton 
        && closestButton.id !== "i-try" && closestTextScenario) {
        if (closestButtonClose 
          && closestButtonClose.id !== "close") return;
    }
    
    setScenarioOpen(false);
    setActiveThoughts(true);
  }

  function handlePopupAnimation() {
    setScenarioOpen(false);
    setTimeout(() => {
        setScenarioOpen(true);
    }, 250);
  }

  function handleScenario() {  
    if (scenarioOpen) {
      setScenarioOpen(false);
      setActiveThoughts(true);
    } else {
      setScenarioOpen(true);
      setActiveThoughts(false);
    }
  } 

  return (
    <div className="App" onClick={handleCloseScenario}>
      <img src={logo_3WA} className="logo"></img>
      <h1><span className='left'>&lt;</span>Apprendre à coder avec la 3W Academy !<span className='right'>&gt;</span></h1>
      <Scenario
        scenarioOpen={scenarioOpen}
        activeThoughts={activeThoughts}
        handleCloseScenario={handleCloseScenario}
        handlePopupAnimation={handlePopupAnimation}
        handleScenario={handleScenario}
        ></Scenario>
      <section className='iframes-section'>
        <div className='iframes-container'>
          <div className="iframes-code">
            <HTMLBox handleChangeCode={handleChangeCode}></HTMLBox>
            <CSSBox handleChangeCode={handleChangeCode}></CSSBox>
          </div>
          <div className="iframe-output">
            <OutputBox code={output}></OutputBox>
          </div>
        </div>
        <JSBox handleChangeCode={handleChangeCode}></JSBox>
      </section>
    </div>
  );
}

export default App;
