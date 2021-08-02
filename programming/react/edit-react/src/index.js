import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const StringInput = (props) => {
  return (
    <div>
      <label className="formLabel">{props.label}</label>
      <input type="text" />
      <button onClick={f=>f}>Random</button>
      <br />
    </div>
  )
}

const InputForm = () => {
  return (
    <div>
      <h2 className="formHeading2">Input</h2>
      <StringInput label="x" />
      <StringInput label="y" />
      <button onClick={f=>f}>Go!</button>
    </div>
  );
}

const App = () => {
  return (
    <div>
      <h1 id="heading">Edit Distance Playground</h1>
      <InputForm />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
