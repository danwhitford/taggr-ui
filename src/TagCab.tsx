import React from 'react'

interface TagCabI {
    onClick: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const TagCab = ({onClick}: TagCabI) => (
    <div
        onClick={onClick}
        style={{
            borderRadius: '50%',
            userSelect: 'none',
            width: '90px',
            height: '90px',
            boxShadow: '0 10px 15px 0 rgba(67, 192, 163, 0.25)',
            border: 'solid 2px #252e3b',
            backgroundImage: 'radial-gradient(circle at 50% 50%, #78e1d0, #43c0a3 71%)',
            textAlign: 'center',
            color: 'white',
            fontSize: '30px',
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '450px',
            marginTop: '-45px',
            zIndex: 5,
        }}
    >
        Tag
    </div>
)

export default TagCab
