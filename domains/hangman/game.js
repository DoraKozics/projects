let keyboard;
document.addEventListener('DOMContentLoaded', () => {
    keyboard = document.getElementById('keyboard');
    generateKeyboard();
})

const generateKeyboard = () => {
    let alphabet = [];
    for (let i = 65; i < 91; i++) {
        alphabet.push(String.fromCharCode(i));
    }
    addHunLetters(alphabet);

    for (let i = 0; i < alphabet.length; i++) {
        let character = alphabet[i];
        let button = document.createElement("button");
        button.innerText = character;
        keyboard.appendChild(button);
    }
}

const addHunLetters = (alphabet) => {
    alphabet.splice(alphabet.indexOf('B'), 0, 'Á');
    alphabet.splice(alphabet.indexOf('D'), 0, 'CS');
    alphabet.splice(alphabet.indexOf('E'), 0, 'DZ', 'DZS');
    alphabet.splice(alphabet.indexOf('F'), 0, 'É');
    alphabet.splice(alphabet.indexOf('H'), 0, 'GY');
    alphabet.splice(alphabet.indexOf('J'), 0, 'Í');
    alphabet.splice(alphabet.indexOf('M'), 0, 'LY');
    alphabet.splice(alphabet.indexOf('O'), 0, 'NY');
    alphabet.splice(alphabet.indexOf('P'), 0, 'Ó', 'Ö', 'Ő');
    alphabet.splice(alphabet.indexOf('T'), 0, 'SZ');
    alphabet.splice(alphabet.indexOf('U'), 0, 'TY');
    alphabet.splice(alphabet.indexOf('V'), 0, 'Ú', 'Ü', 'Ű');
    alphabet.push('ZS');
}