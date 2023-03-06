// The Goal
// You work in the National Resistance Museum and you just uncovered hundreds of documents which contain coded Morse transmissions. In the documents, none of the spaces have been transcribed to separate the letters and the words hidden behind the Morse sequence. Therefore, there may be several interpretations of any single decoded sequence.
// Your program must be able to determine the number of different messages that it’s possible to obtain from one Morse sequence and a given dictionary.

//   Rules
// Morse is a code composed of dots and dashes representing the letters of the alphabet. Here is the transcription of an alphabet in Morse:
//  A  .- 	 B  -... 	 C  -.-. 	 D  -..
//  E  . 	 F  ..-. 	 G  --. 	 H  ....
//  I  .. 	 J  .--- 	 K  -.- 	 L  .-..
//  M  -- 	 N  -. 	 O  --- 	 P  .--.
//  Q  --.- 	 R  .-. 	 S  ... 	 T  -
//  U  ..- 	 V  ...- 	 W  .-- 	 X  -..-
//  Y  -.-- 	 Z  --.. 	  	 
// Since none of the spaces have been transcribed, there may be several possible interpretations. For example, the sequence -....--.-. could be any of the following: BAC, BANN, DUC, DU TETE, ...
// A human being can recognize where the segmentations should be made due to their knowledge of the language, but for a machine, it’s harder. In order for your program to do the same, you are given a dictionary containing all of the right words.
// However, even with a dictionary, it’s possible that a sequence might correspond to several valid messages (BAC, DUC, DU and TETE might be present in the dictionary of the previous example).

// Source: ACM Contest Problems Archive


//PREPARE
const morseCodes = {
    A: '.-',
    B: '-...',
    C: '-.-.',
    D: '-..',
    E: '.',
    F: '..-.',
    G: '--.',
    H: '....',
    I: '..',
    J: '.---',
    K: '-.-',
    L: '.-..',
    M: '--',
    N: '-.',
    O: '---',
    P: '.--.',
    Q: '--.-',
    R: '.-.',
    S: '...',
    T: '-',
    U: '..-',
    V: '...-',
    W: '.--',
    X: '-..-',
    Y: '-.--',
    Z: '--..',
}

//INPUT
const L = readline();
const N = parseInt(readline());
const words = {};
for (let i = 0; i < N; i++) {
    const W = readline().replace(/./g, c => morseCodes[c]);
    if (words[W]) {
        words[W]++;
    } else {
        words[W] = 1;
    }
}

//VARIABLES
const combinations = {};
const M = 20 * 4; //max 20 letter combined with max 4 morse character

//BODY
function compare(start, morseSequence, combinations) {
    if (start >= morseSequence.length) return 1;
    if (combinations[start]) return combinations[start];

    let comb = 0;
    for (let i = 1; i <= M && start + i <= morseSequence.length; i++) {
        let count = words[morseSequence.substring(start, start + i)];
        if (count) comb += count * compare(start + i, morseSequence, combinations);
    }
    return combinations[start] = comb;
}
let output = compare(0, L, combinations);

//OUTPUT
console.log(output);
