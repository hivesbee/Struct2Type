import React, { useState } from 'react'

import './App.css'

import AppHeader from '@/components/AppHeader'
import BgLogo from '@/components/BgLogo'

import { generate } from '@/modules/generator'

const App = (props) => {
  const [golangText, setGolangText] = useState('')
  const [tsText, setTsText] = useState('')

  const handleStructTextChange = (e) => {
    setGolangText(e.target.value)

    if (e.target.value === '') {
      setTsText('')
      return 
    }

    const astString = parseStruct(e.target.value) // eslint-disable-line no-undef
    const typeLines = generate(JSON.parse(astString))
    setTsText(typeLines)
  }

  return (
    <div className="App">
      <AppHeader />
      <main className="App-main">
        <textarea
          className="App-textarea-golang"
          placeholder="こちらに golang の struct をコピペしてください"
          wrap="off"
          value={golangText}
          onChange={handleStructTextChange}
        />
        <span className="App-arrow-right" role="img" aria-label="left arrow">👉</span>
        <textarea
          className="App-textarea-ts"
          placeholder="こちらに TypeScript の型定義がでてきます"
          wrap="off"
          readOnly
          value={tsText}
        />
      </main>
      <BgLogo />
    </div>
  )
}

export default App
