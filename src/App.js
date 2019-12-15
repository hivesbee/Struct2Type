import React from 'react'
import './App.css'
import gopher from './gopher.svg'
import transpile from './transpiler'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      structText: '',
      typeText: ''
    }

    this.handleStructTextChange = this.handleStructTextChange.bind(this)
    this.handleTranspileClick = this.handleTranspileClick.bind(this)
  }

  handleStructTextChange (event) {
    const typeLines = transpile(event.target.value)
    this.setState({
      structText: event.target.value
    })

    this.setState({
      typeText: typeLines
    })
  }

  handleTranspileClick (event) {
    console.log('handleTranspileClick')
    const typeLines = transpile(this.state.structText)

    this.setState({
      typeText: typeLines
    })
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Struct 2 Type</h1>
        </header>
        <main className="App-main">
          <textarea
            className="App-textarea-struct"
            placeholder="こちらに golang の struct をコピペしてください"
            wrap="off"
            value={this.state.structText}
            onChange={this.handleStructTextChange}
          />
          <span className="App-arrow-right">👉</span>
          <textarea
            className="App-textarea-type"
            placeholder="こちらに TypeScript の型定義がでてきます"
            wrap="off"
            readOnly
            value={this.state.typeText}
          />
        </main>
        <img src={gopher} className="App-gopher" />
        <p className="App-copyright">
        gopher.svg was created by <a href="https://twitter.com/tenntenn">>Takuya Ueda</a>.<br />
        The Go gopher was designed by <a href="http://reneefrench.blogspot.com/">Renee French</a>.
        </p>
      </div>
    )
  }
}

export default App;
