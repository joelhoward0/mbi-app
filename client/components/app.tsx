import React from 'react';
import { useImmer } from 'use-immer';
import { GenerateResponse, VerifyRequest, VerifyResponse } from '../../server';
import { MBI } from '../../server/mbi';
import { GetJson, PostJson } from '../api';

interface AppState {
  mbis: string[]
  generating: boolean
  verifyText: string
  verifiedMbis: { mbi: string, isValid: boolean }[]
  verifying: boolean
}

export function App() {
  const [state, setState] = useImmer<AppState>({ 
    mbis: [],
    generating: false,
    verifyText: "",
    verifiedMbis: [],
    verifying: false
  })

  return <>
    <h2>Welcome to MBI App!</h2>
    <span>
      This app generates and validates Medicare Benficiary Identifiers (MBIs) according to the following specification: 
      <div>
        <a href="/format.pdf" target="_blank">Understanding the Medicare Beneficiary Identifier (MBI) Format</a>
      </div>
    </span>
    <div style={{ border: "1px solid black", marginTop: "1rem", padding: "1rem" }}>
      <button onClick={generateMBI} disabled={state.generating}>Generate a new MBI{state.generating ? ' (Generating...)' : ''}</button>
      {state.mbis.length > 0 && <>
        <h3>You've generated the following MBIs:</h3>
        <ul>
          {state.mbis.map((mbi, i) => 
            <li key={i} className={i == 0 ? 'most-recent-mbi' : ''}>
              {MBI.Format(mbi)}
            </li>
          )}
        </ul>
      </>}
    </div>
    <div style={{ border: "1px solid black", marginTop: "1rem", padding: "1rem" }}>
      <button 
        onClick={verifyMBI} 
        disabled={state.verifying}
        style={{ marginRight: "0.5rem" }}
      >
        Verify an MBI:{state.verifying ? ' (Verifying...)' : ''}
      </button>
      <input 
        type="text" 
        placeholder='XXXX-XXX-XXXX'
        onChange={e => { const value = e.currentTarget.value; setState(state => { state.verifyText = value }) }}
      />
      {state.verifiedMbis.length > 0 && <>
        <h3>You've verified the following MBIs:</h3>
        <ul>
          {state.verifiedMbis.map((mbi, i) => 
            <li key={i} className={`${mbi.isValid ? "valid-mbi" : "invalid-mbi"} ${i == 0 ? 'most-recent-mbi' : ''}`}>
              {MBI.Format(mbi.mbi)} is {mbi.isValid ? "" : "NOT"} valid!
            </li>
          )}
        </ul>
      </>}
    </div>
  </>

  async function generateMBI() {
    if (state.generating)
      return
    
    setState(state => { state.generating = true })

    const mbi = await GetJson<GenerateResponse>("/generate")
    setState(state => {
      state.generating = false
      state.mbis.unshift(mbi.mbi)
    })
  }

  async function verifyMBI() {
    if (state.generating)
      return
    
    setState(state => { state.verifying = true })

    const mbi = await PostJson<VerifyRequest, VerifyResponse>("/verify", { mbi: MBI.Parse(state.verifyText) })
    setState(state => {
      state.verifying = false
      state.verifiedMbis.unshift(mbi)
    })
  }
}