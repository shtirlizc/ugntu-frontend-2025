import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {TextsFunc} from "./texts.jsx";

function App() {
    // wrapper
    // const h3El = document.createElement('h3');
    // h3El.style.color = 'orange';
    // h3El.style.border = '3px dashed blue';
    // h3El.innerText = obj.obj2.field12122;
    // append to wrapper

  return (
    <div>
        <h3 style={{ color: 'orange', border: '3px dashed blue' }}>Hello react</h3>
        <TextsFunc attr="My title 2 text" attr2="My new title 3 text" />
    </div>
  )
}

export default App
