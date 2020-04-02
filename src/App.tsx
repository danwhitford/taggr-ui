import React, { useState } from 'react';
import WordChip from './WordChip';
import SimplePos from './SimplePos';
import './global.css'

type TaggedWords = [string, SimplePos]
type Toggle = [string, SimplePos, boolean]

const getColour = (pos: SimplePos): string => {
  switch(pos){
    case (SimplePos.Adjective): {
      return '#96ceb4'
    }
    case (SimplePos.Adverb): {
      return '#ffeead'
    }
    case (SimplePos.Noun): {
      return '#ffcc5c'
    }
    case (SimplePos.Pronoun): {
      return '#ff6f69'
    }
    case (SimplePos.Verb): {
      return '#588c7e'
    }
    case (SimplePos.Conjunctives): {
      return '#f2e394'
    } 
    case (SimplePos.Determiner): {
      return '#f2ae72'
    } 
    case (SimplePos.Preposition): {
      return '#d96459'
    }
    default: {
      return '#43464B'
    }
  }
}

function App() {
  const [tagged, setTagged] = useState([] as TaggedWords[])
  const [posToggles, setPosToggles] = useState(Object
    .entries(SimplePos)
    .map(([label, pos]) => [label, pos, true] as Toggle)
  )

  const change = () => {
    const inputArea = document.getElementById('input-area') as HTMLInputElement
    fetch('http://localhost:8081/simple/',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'words': inputArea.value
        })
      })
      .then(res => res.json())
      .then(j => setTagged(j))
  }

  return (
    <div>
      <textarea id='input-area' onBlur={change} defaultValue='Hello I am Dan and I am writing dummy text.' cols={80} rows={10}></textarea>
      <br />
      <button onClick={change}>Tag</button>
      <br />
      <div >
        {tagged.map(([word, pos], i) => (
          <WordChip
            key={i}
            word={word}
            type={pos}
            visible={posToggles.find(([, p]) => p === pos)?.[2]}
            colour={getColour(pos)}
          />          
        ))}
      </div>
      <div>
        {posToggles.map(([label, pos, toggled], i) => (
          <div key={i}>
            <div
              style={{
                height: '10px',
                width: '10px',
                backgroundColor: getColour(pos),
                display: 'inline-block'
              }}
            ></div>
            <input type="checkbox" id={label} name={label} value={label} checked={toggled}
              onChange={() => {
                const pt = posToggles.map(([l, p, t]) => {
                  if (p === pos) {
                    return [l, p, !t] as Toggle
                  } else {
                    return [l, p, t] as Toggle
                  }                  
                })
                setPosToggles(pt)
              }}
            />
            <label>{label}</label>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
