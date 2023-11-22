
import { useEffect, useState } from 'react';
import './App.css';

import data from './data.json'
import { FormControl, FormControlLabel, Switch } from '@mui/material';

function App() {
  const [alpha, setAlpha] = useState(0)
  const [beta, setBeta] = useState(0)
  const [gamma, setGamma] = useState(0)
  const [chosenChar, setChosenChar] = useState('')
  const [chosenCharAns, setChosenCharAns] = useState('')
  const [chosenCharDef, setChosenCharDef] = useState('')
  const [difficulty, setDifficulty] = useState(false)
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
    
    
    if (difficulty === true) {
      const rand = Math.floor(Math.random() * data.length)
      setChosenChar(data[rand].charcter)
      setChosenCharAns(data[rand].pinyin)
      setChosenCharDef(data[rand].definition)
    } else {
      const infant = data.filter((item) => item.hsk_levl === '1')
      const rand = Math.floor(Math.random() * infant.length)
      console.log(infant)
      setChosenChar(infant[rand].charcter)
      setChosenCharAns(infant[rand].pinyin)
      setChosenCharDef(infant[rand].definition)
    }

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
    // if(beta < 3 && beta >= -1 && gamma <= 20 && gamma >= -20) {
    //   showans()
    // }
    
  }, [beta, gamma])

  function changeDifficulty(e) {
    setDifficulty(!difficulty)
  }

  return (
    <div className="App">
      
      <br/>
      <button onClick={handleClick}>enable</button>
      <br/>
      <br/>
      <h2>alpha: {Math.round(alpha)}</h2>
      <h2>beta: {Math.round(beta)}</h2>
      <h2>gamma: {Math.round(gamma)}</h2>
      {/* {} */}
      {beta < 15 && beta >= -15 && gamma <= 25 && gamma >= -25 && <div>
        <h1 className='pinyin'>{chosenCharAns}</h1>
        {/* <button onClick={showans}>speak</button> */}
        <br/>
        <h2>{chosenCharDef}</h2>
      </div>}
      {/* {beta < 95 && beta > 80 && <h1>upright</h1>} */}
      {((beta <= 35 && beta >= -35) || (beta >= 160 || beta <= -160)) && ((gamma <= -60 && gamma >= -90) || (gamma <= 90 && gamma >= 45)) && <h1 className='char'>{chosenChar}</h1>}
      {gamma <= 45 && gamma >= -45 && ((beta > 155 || beta < -155)) && <div>
        
        <h1>picking words</h1>
      </div>}
      <FormControl>
        <FormControlLabel control={<Switch onChange={changeDifficulty} />} label={difficulty ? 'adult' : 'infant'}/>
      </FormControl>

    </div>
  );
}

export default App;
