import React from 'react'
import { TogglesT } from './App'
import SimplePos from './SimplePos'

interface TogglesProp {
    toggles: TogglesT;
    onChange: (pos: SimplePos) => void
}

const makeLabel = (label: string, visible: boolean) => (
    <>
        <div
            style={{
                verticalAlign: 'middle',
                display: 'inline-block',
                lineHeight: 'normal',
                marginLeft: '2px',
                marginRight: '2px',
                userSelect: 'none',
                fontSize: '20px',
                color: visible ? 'white' : 'black',
            }}
        >
            {label}
        </div>
    </>
)

const makeBall = (visible: boolean, colour: string) => (
<div
        style={{
            borderRadius: '50%',
            width: '25px',
            height: '25px',
            backgroundImage: visible
                ? 'radial-gradient(circle at 50% 50%, #78e1d0, #43c0a3 71%)'
                : 'radial-gradient(circle at 50% 50%, #ffa58b, #ea592f 71%)',
            display: 'inline-block',
            verticalAlign: 'middle',
        }}
    >
    </div>
)

const ordered = (label: string, visible: boolean, colour: string) => (
    visible 
        ? <>{makeLabel(label, visible)} {makeBall(visible, colour)}</> 
        : <>{makeBall(visible, colour)} {makeLabel(label, visible)}</>
)

const Toggles = ({ toggles, onChange }: TogglesProp) => (
    <>
        {toggles.map((toggle, i) => (
            <div
                style={{
                    display: 'inline-block',
                    userSelect: 'none',
                    marginTop: '5px',
                    marginBottom: '5px',
                }}
                key={i}
            >
                <div
                    key={i}
                    style={{
                        height: '25px',
                        lineHeight: '25px',
                        paddingLeft: '5px',
                        paddingRight: '5px',
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        backgroundColor: toggle.visible ? toggle.colour : 'white',
                        display: 'inline-block',
                        borderRadius: '17.5px',
                        border: toggle.visible ? `1px solid ${toggle.colour}` : '1px solid black',
                        marginLeft: '2px',
                        marginRight: '2px',
                    }}
                    onClick={() => onChange(toggle.pos)}
                >
                    {ordered(toggle.label, toggle.visible, toggle.colour)}
                </div>
            </div>
        ))}
    </>
)

export default Toggles
