import React from 'react';
import SimplePos from './SimplePos';

interface WordChipProp {
    word: string,
    type: SimplePos,
    colour: string,
    visible?: boolean,
    onClick?: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const WordChip = ({word, type, visible, colour, onClick}: WordChipProp) => (
        <div
            className={type}
            style={{
                backgroundColor: colour,
                color: visible ? 'white' : colour,
                border: '1px solid black',
                borderRadius: '25px',
                padding: '0 5px',
                margin: '0 2px',
                height: '40px',
                fontSize: '16px',
                lineHeight: '40px',
                display: 'inline-block',
                userSelect: 'none',
            }}
            onClick={onClick}
            title={type}
        >
            {word}
        </div>
)

export default WordChip;
