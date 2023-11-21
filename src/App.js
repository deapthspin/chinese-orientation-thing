
import { useEffect, useState } from 'react';
import './App.css';

import data from './data.json'

function App() {
  const [alpha, setAlpha] = useState(0)
  const [beta, setBeta] = useState(0)
  const [gamma, setGamma] = useState(0)
  const [chosenChar, setChosenChar] = useState('')
  const [chosenCharAns, setChosenCharAns] = useState('')
  const handleClick = () => {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      // Handle iOS 13+ devices.
      DeviceMotionEvent.requestPermission()
        .then((state) => {
          if (state === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            console.error('Request to access the orientation was rejected');
          }
        })
        .catch(console.error);
    } else {
      // Handle regular non iOS 13+ devices.
      window.addEventListener('deviceorientation', handleOrientation);
    }
  }

  function chooseimage() {
    
    // console.log(data)
    const rand = Math.floor(Math.random() * 30)
    setChosenChar(data[rand].charcter)
    setChosenCharAns(data[rand].pinyin)
  }

  function showans() {

  }

  function handleOrientation(event) {
    const a = event.alpha;
    const b = event.beta;
    const g = event.gamma;
    setAlpha(Math.round(a))
    setBeta(Math.round(b))
    setGamma(Math.round(g))
  }
  useEffect(() => {
    if(gamma <= 45 && gamma >= -45 && (beta > 170 || beta < -170)) {
      chooseimage()
    }
    if(beta < 3 && beta >= -1 && gamma < 3 && gamma >= -1) {
      showans()
    }
    
  }, [beta, gamma])
  return (
    <div className="App">
      <button onClick={handleClick}>enable</button>
      <br/>
      <br/>
      {/* <h2>alpha: {Math.round(alpha)}</h2>
      <h2>beta: {Math.round(beta)}</h2>
      <h2>gamma: {Math.round(gamma)}</h2> */}
      {/* {} */}
      {beta < 3 && beta >= -1 && gamma < 3 && gamma >= -1 && <h1 className='pinyin'>{chosenCharAns}</h1>}
      {/* {beta < 95 && beta > 80 && <h1>upright</h1>} */}
      {((beta <= 20 && beta >= -20) || (beta >= 160 && beta <= -160)) && ((gamma <= -60 && gamma >= -90) || (gamma <= 90 && gamma >= 60)) && <h1 className='char'>{chosenChar}</h1>}
      {gamma <= 45 && gamma >= -45 && (beta > 170 || beta < -170) && <div>
        
        <h1>picking words</h1>
      </div>}
     

    </div>
  );
}

export default App;
