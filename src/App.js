import './App.css';

import Scenario from './containers/Scenario/Scenario';
import HTMLBox from './containers/HTMLBox/HTMLBox';
import CSSBox from './containers/CSSBox/CSSBox';
import OutputBox from './containers/OutputBox/OutputBox';

import logo_3WA from './assets/images/logo_3WA.svg';

function App() {
  return (
    <div className="App">
      <img src={logo_3WA} class="logo"></img>
      <h1><span className='left'>&lt;</span>Apprendre à coder avec la 3W Academy !<span className='right'>&gt;</span></h1>
      <Scenario></Scenario>
      <section>
        <div>
          <HTMLBox></HTMLBox>
          <CSSBox></CSSBox>
        </div>
        <div>
          <OutputBox></OutputBox>
        </div>
      </section>
    </div>
  );
}

export default App;
