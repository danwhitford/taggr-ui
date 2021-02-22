import React, { useState } from 'react';
import WordChip from './WordChip';
import SimplePos from './SimplePos';
import './global.css'
import Toggles from './Toggles';
import TagCab from './TagCab';
import { Lexed } from "lexed";
import { Tag } from "en-pos";
import { zip, flatMap } from "lodash";

type TaggedWords = [string | undefined, SimplePos]

interface ToggleI {
  pos: SimplePos;
  label: string;
  visible: boolean;
  colour: string;
}
export type TogglesT = ToggleI[]

const getColour = (pos: SimplePos): string => {
  switch (pos) {
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

const simplify = (tag?: string) => {
  if (tag?.startsWith("NN")) {
    return SimplePos.Noun;
  } else if (tag?.startsWith("JJ")) {
    return SimplePos.Adjective;
  } else if (tag?.startsWith("VB")) {
    return SimplePos.Verb;
  } else if (tag?.startsWith("RB")) {
    return SimplePos.Adverb;
  } else if (tag?.startsWith("PR")) {
    return SimplePos.Pronoun;
  } else if (tag?.startsWith("IN")) {
    return SimplePos.Preposition
  } else if (tag?.startsWith("CC")) {
    return SimplePos.Conjunctives
  } else if (tag?.endsWith("DT")) {
    return SimplePos.Determiner
  } else {
    return SimplePos.Other;
  }
};

const tag = (words: string): [string?, string?][] => {
  const tokens = new Lexed(words).lexer().tokens;
  const tagObj = new Tag(flatMap(tokens)).initial().smooth();
  return zip(tagObj.tokens, tagObj.tags);
};

const simpleTag = (words: string): TaggedWords[] => {
  const tagged = tag(words)
  return tagged.map(tp => {
    return [tp[0], simplify(tp[1])]
  })
}

function App() {
  const [inputText, setInputText] = useState("Southampton are the best at football.")
  const [tagged, setTagged] = useState([] as TaggedWords[])
  const [posToggles, setPosToggles] = useState(Object
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
    setTagged(simpleTag(inputText))
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
      </div> : null}
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
