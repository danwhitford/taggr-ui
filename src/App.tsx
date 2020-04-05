import React, { useState, SetStateAction, Dispatch } from 'react';
import WordChip from './WordChip';
import SimplePos from './SimplePos';
import './global.css'
import Toggles from './Toggles';
import TagCab from './TagCab';

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
      return '#43546a'
    }
    case (SimplePos.Adverb): {
      return '#4472c5'
    }
    case (SimplePos.Noun): {
      return '#70ac46'
    }
    case (SimplePos.Pronoun): {
      return '#5b9bd5'
    }
    case (SimplePos.Verb): {
      return '#ed7d32'
    }
    case (SimplePos.Conjunctives): {
      return '#ffc000'
    } 
    case (SimplePos.Determiner): {
      return '#f2ae72'
    } 
    case (SimplePos.Preposition): {
      return '#ea592f'
    }
    default: {
      return '#43464B'
    }
  }
}

const apiRoute = process.env.REACT_APP_API_ROUTE || 'http://localhost:8081/simple'

function App() {
  const [inputText, setInputText] = useState("This is the default input text.")
  const [tagged, setTagged]: [TaggedWords[], Dispatch<SetStateAction<TaggedWords[]>>] = useState([] as TaggedWords[])
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
    fetch(apiRoute,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'words': inputText
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
    <>
    <div
      style={{
        width: '700px',
        margin: 'auto',
        marginBottom: '50px',
      }}
    >
        <textarea 
          id='input-area' 
          onChange={(ev) => setInputText(ev.target.value)}
          value={inputText}
          cols={80} 
          rows={10}
          style={{
            resize: 'none',
            zIndex: -1,
            fontSize: '22px',
            width: '500px',
          }}
        ></textarea>
        <br />
        <TagCab 
          onClick={change}
        />
      </div>
      <br />
      { tagged.length > 0 ? <div
        style={{
          width: '700px',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          borderRadius: '50px',
          border: '1px dashed #252e3b',
          marginBottom: '40px',
        }}
      >
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
      </div> : null }
      <div
        style={{
          width: '700px',
          margin: 'auto',
          textAlign: 'center',
        }}
      >
        <Toggles 
          toggles={posToggles}
          onChange={togglePos}
        />
      </div>
    </>
  );
}

export default App;
