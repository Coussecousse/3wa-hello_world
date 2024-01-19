import './App.css';

import Scenario from './containers/Scenario/Scenario';
import HTMLBox from './containers/HTMLBox/HTMLBox';
import CSSBox from './containers/CSSBox/CSSBox';
import OutputBox from './containers/OutputBox/OutputBox';

function App() {
  return (
    <div className="App">
      <h1>Apprendre à coder avec la 3WA !</h1>
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
