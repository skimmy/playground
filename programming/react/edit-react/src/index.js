import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { edit, closeDiagonalBacktracking, scriptToOps } from './edit.js';


class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: "ACGT",
      y: "ACG",
    }
    this.handleChangeX = this.handleChangeX.bind(this);
    this.handleChangeY = this.handleChangeY.bind(this);
    this.compute = this.compute.bind(this);
  }

  compute() {
    this.props.computeCallback(this.state.x, this.state.y);
  }

  handleChangeX(e) {
    this.setState({ x: e.target.value });
  }

  handleChangeY(e) {
    this.setState({ y: e.target.value });
  }

  render() {
    return (
      <div>
        <h2 className="formHeading2">Input</h2>
        <div>
          <label className="formLabel">x</label>
          <input type="text" value={this.state.x} onChange={this.handleChangeX} />
          <button onClick={f => f}>Random</button>
          <br />
        </div>
        <div>
          <label className="formLabel">y</label>
          <input type="text" value={this.state.y} onChange={this.handleChangeY} />
          <button onClick={f => f}>Random</button>
          <br />
        </div>
        <button onClick={this.compute}>Go!</button>
      </div>
    );
  }
}

const EditInfo = (props) => {
  return (
    <div className="editInfoDiv">
      <p>Edit Distance: {props.distance}</p>
    </div>
  );
}

const DPMatrix = (props) => {
  return (
    (!props.matrix) ?
    <div></div> :
    <div className="dpMatrixDiv">
      <table className="dpMatrixTab"><tbody>
        
        <tr key="(-1,*)">
          <td key="(-1,-1)"></td>
          <td key="(0,-1)"></td>
          {[...props.y].map((c,j) =>
            <td key={`(0,${j+1})`}className="dpMatrixTD">{c}</td>
          )}
        </tr>

        <tr key="(0,*)">
          <td key="(-1,0)"></td><td key="(0,0)"className="dpMatrixTD">{0}</td>
          {[...props.y].map((c,i) => <td key={`(0,${i+1})`} className="dpMatrixTD">{i+1}</td>)}
        </tr>

        {[...props.x].map((c, i) =>
          <tr key={`(${i+1},*)`}>  
            <td key={`(${i+1},0)`} className="dpMatrixTD">{c}</td>
            {props.matrix[i+1].map((m,j) => <td key={`(${i+1},${j+1})`} className="dpMatrixTD">{m}</td>)}
          </tr>
        )}
      </tbody></table>
    </div>
  );
}

const EditScript = ({x, y, matrix}) => {
  return (
    <div className="scriptDiv">
      {(matrix) ?
        scriptToOps(closeDiagonalBacktracking(matrix, x.length, y.length))
        :
        ""}
    </div>
  );
}



const Output = (props) => {
  return (
    <div>
      <h2 className="formHeading2">Output</h2>
      <EditInfo distance={props.distance} matrix={props.matrix} />
      <DPMatrix x={props.x} y={props.y} matrix={props.matrix} />
      <EditScript x={props.x} y={props.y} matrix={props.matrix} />
    </div>
  );
}

class Playground extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: "",
      y: "",
      distance: 0,
      matrix: null,
    }
    this.compute = this.compute.bind(this);
  }

  compute(x, y) {
    let mat = edit(x, y)
    let d = mat[x.length][y.length]
    this.setState({ x: x, y: y, distance: d, matrix: mat });
  }

  render() {
    return (
      <div>
        <h1 id="heading">Edit Distance Playground</h1>
        <InputForm computeCallback={this.compute} />
        <Output
          x={this.state.x}
          y={this.state.y}
          distance={this.state.distance}
          matrix={this.state.matrix}
        />
      </div >
    );
  }
}

ReactDOM.render(
  <Playground />,
  document.getElementById('root')
);
