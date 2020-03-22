import React, { useState } from 'react';

type poo = [string, string]

function App() {
  const x: poo[] = []
  const [tagged, setTagged] = useState(x)

  const change = () => {
    const inputArea = document.getElementById('input-area') as HTMLInputElement
    fetch('http://postaggr-env.eba-pnma8zwt.eu-west-1.elasticbeanstalk.com/simple/',
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
      .then(j =>setTagged(j))
  }

  return (
    <div>
      <textarea id='input-area' onBlur={change}></textarea>
      <br />
      <button onClick={change}>Tag</button>
      <br />
      <div >
        {tagged.map(t => <span className={t[1]}>{t[0]} </span>)}
      </div>
    </div>
  );
}

export default App;
