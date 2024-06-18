const charDict = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
};

const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
for (let i = 0; i < 26; i++) {
    charDict[lowercaseLetters.charAt(i)] = i + 10;
    charDict[uppercaseLetters.charAt(i)] = i + 36;
}

charDict[' '] = 62;
charDict['_'] = 63;

function ch_shift(ch, shift) {
    let new_ch_value = charDict[ch] + shift;
    if (new_ch_value > 63) {
        new_ch_value -= 64;
    }
    return Object.keys(charDict).find(key => charDict[key] === new_ch_value);
}

function ch_shift_decrypt(ch, shift) {
    return ch_shift(ch, 64 - shift);
}

function key_val(key) {
    return key.split('').map(ch => {
        if (ch.match(/\w/) || ch === ' ' || ch === '_') {
            return charDict[ch];
        } else {
            return 0;
        }
    });
}

function text_shift(msg, key, op) {
    if (op == 'decrypt') {
        var fun = ch_shift_decrypt
    } else {
        var fun = ch_shift
    }
    const shifts = key_val(key);
    let result = '';
    for (let i = 0; i < msg.length; i++) {
        const shift = shifts[i % key.length];
        if (msg[i].match(/\w/) || msg[i] === ' ' || msg[i] === '_') {
            result += fun(msg[i], shift);
        } else {
            result += msg[i];
        }
    }
    return result;
}

function text_cipher(msg, key, op = 'encrypt') {
    if (key.length === 0) {
        return { text: 'Error: Please input a key.' };
    }
    return { text: text_shift(msg, key, op) };
}

function encode(op = 'encrypt') {
    var inputText = document.getElementById("inputText").value;
    var key = document.getElementById("key").value;
    document.getElementById("outputText").value = text_cipher(inputText, key, op).text;
}

function decode() {
    encode('decrypt')
}
