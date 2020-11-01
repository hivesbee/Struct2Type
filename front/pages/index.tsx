import Head from 'next/head'
import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import AppHeader from '@/components/molecules/AppHeader'
import Background from '@/components/molecules/Background'

import { generate } from '@/modules/generator'

// NOTE: 実行時の外部モジュールから読み込むため、 declare 宣言を行い TS エラーを抑止している
declare var parseStruct: any

const __html = `
  const go = new Go();
  WebAssembly.instantiateStreaming(fetch('main.wasm'), go.importObject).then((result) => {
      go.run(result.instance);
  });
`

const Index = (props) => {
  const [golangText, setGolangText] = useState('')
  const [tsText, setTsText] = useState('')

  const handleStructTextChange = (e) => {
    setGolangText(e.target.value)

    if (e.target.value === '') {
      setTsText('')
      return
    }

    const astString = parseStruct(e.target.value)
    const typeLines = generate(JSON.parse(astString))
    setTsText(typeLines)
  }

  return (
    <Wrapper>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="./wasm_exec.js"></script>
        <script dangerouslySetInnerHTML={{ __html }}></script>
      </Head>
      <GlobalStyle />

      <AppHeader />

      <Main>
        <TextArea
          placeholder="こちらに golang の struct をコピペしてください"
          wrap="off"
          value={golangText}
          onChange={handleStructTextChange}
        />
        <Icon role="img" aria-label="left arrow">👉</Icon>
        <TextArea
          placeholder="こちらに TypeScript の型定義がでてきます"
          wrap="off"
          readOnly
          value={tsText}
        />
      </Main>

      <Background />
    </Wrapper>
  )
}

export default Index

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    overflow: hidden;
    background-color: #282c34;
  }
`

const Wrapper = styled.div`
  min-height: 100vh;
  text-align: center;
`

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 100vw;

  z-index: 1;
`

const TextArea = styled.textarea`
  min-width: calc(1rem * 32);
  min-height: calc(1rem * 32);
  padding: 1rem;
  font-family: Menlo, monospace;
  font-size: 1rem;
  line-height: 1.5;

  text-overflow: auto;

  background: #f7f9fa;
  border-radius: 0.3125rem;
`

const Icon = styled.span`
  margin: 0 1rem;
  font-size: 1rem;
`