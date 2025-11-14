
import './App.css'
import GreenBox from './greenBox.jsx';
import BlueBox from './blueBox.jsx';

function App() {


  return (
    <div style={{ border: '3px dashed red' }}>
      <GreenBox
        greenTitle='My props green title'
        orangeTitle='My props orange title'
      ></GreenBox>
      <BlueBox />
    </div>
  )
}

export default App
