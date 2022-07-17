"use strict"
const lexed = require('lexed')
const enpos = require('en-pos')

function simplify(tag) {
    if (tag?.startsWith("NN")) {
        return "Nn";
    } else if (tag?.startsWith("JJ")) {
        return "Adj";
    } else if (tag?.startsWith("VB")) {
        return "Vrb";
    } else if (tag?.startsWith("RB")) {
        return 'Avb';
    } else if (tag?.startsWith("PR")) {
        return 'Pnn';
    } else if (tag?.startsWith("IN")) {
        return 'Ppn'
    } else if (tag?.startsWith("CC")) {
        return 'Cjs'
    } else if (tag?.endsWith("DT")) {
        return 'Dtr'
    } else {
        return 'Ukn';
    }
};

function toggler(type) {
    return function (ev) {
        const a = document.getElementsByClassName(type)
        for (var i = 0; i < a.length; i++) {
            if (a[i].classList.contains('toggle')) {
                a[i].classList.toggle('toggled')
            } else {
                a[i].classList.toggle('hidden')
            }
        }
    }
}

document.getElementById('cab').onclick = function (ev) {
    const words = document.getElementById('app-input').value
    const tokens = new lexed.Lexed(words).lexer().tokens.flat()
    const tagObj = new enpos.Tag(tokens).initial().smooth()

    tagObj.simpleTags = []
    for (var i = 0; i < tagObj.tags.length; i++) {
        tagObj.simpleTags.push(
            simplify(tagObj.tags[i])
        )
    }

    const taggedContainer = document.getElementById('tagged-container')
    while (taggedContainer.hasChildNodes()) {
        taggedContainer.removeChild(taggedContainer.firstChild)
    }
    for (var i = 0; i < tagObj.simpleTags.length; i++) {
        const wordChip = document.createElement("div");
        wordChip.classList.add(tagObj.simpleTags[i])
        wordChip.classList.add('wordchip')
        wordChip.onclick = toggler(tagObj.simpleTags[i])
        wordChip.innerText = tagObj.tokens[i]

        const toggle = document.querySelector(`.toggle.${tagObj.simpleTags[i]}`)
        if (toggle && toggle.classList.contains('toggled')) {
            wordChip.classList.add('hidden')
        }

        taggedContainer.appendChild(wordChip)
    }
}

const toggles = document.getElementsByClassName('toggle')
for (var i = 0; i < toggles.length; i++) {
    const t = toggles[i].dataset.type;
    toggles[i].onclick = toggler(t)
}