import React, { useState, SetStateAction, Dispatch } from 'react';
import WordChip from './WordChip';
import SimplePos from './SimplePos';
import './global.css'
import Toggles from './Toggles';

type TaggedWords = [string, SimplePos]
// type Toggle = [string, SimplePos, boolean]
interface ToggleI {
  pos: SimplePos;
  label: string;
  visible: boolean;  
  colour: string;
}
export type TogglesT = ToggleI[]

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
  const [posToggles, setPosToggles]: [TogglesT, Dispatch<SetStateAction<TogglesT>>] = useState(Object
    .entries(SimplePos)
    .map(([label, pos]) => {
      return {
        pos,
        label,
        visible: true,
        colour: getColour(pos)
      } as ToggleI
    })
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

  const togglePos = (pos: SimplePos) => {
    const toggledToggles = posToggles.map(t => {
      if (t.pos === pos) {
        return {
          ...t,
          visible: !t.visible
        }
      } else {
        return t
      }
    })
    setPosToggles(toggledToggles)
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
            visible={posToggles.find((p: ToggleI) => p.pos === pos)?.visible}
            colour={getColour(pos)}
            onClick={() => togglePos(pos)}
          />          
        ))}
      </div>
      <div>
        <Toggles 
          toggles={posToggles}
          onChange={togglePos}
        />
      </div>
    </div>
  );
}

export default App;
