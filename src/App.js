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
    body { background: white;}
  
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
        body { background: white;}
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

  return (
    <div className="App">
      <img src={logo_3WA} className="logo"></img>
      <h1><span className='left'>&lt;</span>Apprendre à coder avec la 3W Academy !<span className='right'>&gt;</span></h1>
      <Scenario></Scenario>
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
