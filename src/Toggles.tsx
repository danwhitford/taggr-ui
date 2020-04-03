import React from 'react'
import { TogglesT } from './App'
import SimplePos from './SimplePos'

interface TogglesProp {
    toggles: TogglesT;
    onChange: (pos: SimplePos) => void
}

const makeLabel = (label: string) => (
    <>
        <div
            style={{
                verticalAlign: 'middle',
                display: 'inline-block',
                lineHeight: 'normal',
                marginLeft: '2px',
                marginRight: '2px',
            }}
        >
            {label}
        </div>
    </>
)

const makeBall = () => (
    <div
        style={{
            borderRadius: '50%',
            width: '25px',
            height: '25px',
            backgroundColor: 'pink',
            display: 'inline-block',
            verticalAlign: 'middle',
        }}
    >
    </div>
)

const ordered = (label: string, visible: boolean) => (
    visible ? [makeLabel(label), makeBall()] : [makeBall(), makeLabel(label)]
)

const Toggles = ({ toggles, onChange }: TogglesProp) => (
    <>
        {toggles.map((toggle, i) => (
            <div 
                key={i}
                style={{
                    display: 'inline-block',
                }}
            >
                <div
                    style={{
                        height: '25px',
                        lineHeight: '25px',
                        paddingLeft: '5px',
                        paddingRight: '5px',
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        backgroundColor: toggle.visible ? toggle.colour : 'grey',
                        display: 'inline-block',
                        borderRadius: '17.5px',
                        marginLeft: '2px',
                        marginRight: '2px',
                    }}
                    onClick={() => onChange(toggle.pos)}
                >
                    {ordered(toggle.label, toggle.visible)}
                </div>
                <br></br>
            </div>
        ))}
    </>
)

export default Toggles
