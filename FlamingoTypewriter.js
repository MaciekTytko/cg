// INPUT
const T = readline();

// VARIABLE
const map = new Map([
    ['sp', ' '],
    ['bS', '\\'],
    ['sQ', '\''],
    ['nl', '\n'],
]);
let output = '';

// BODY nad OUTPUT
for (let x of T.split(' ')) {
    if (x === 'nl') {
        console.log(output);
        output = '';
    }
    else {
        let char = x.replaceAll(/\d/g, '');
        if (char === '') {
            char = x.slice(-1);
            x = x.slice(0,-1);
        }else if(map.has(char)) {
            char = map.get(char);
        }
        let count = parseInt(x);
        output += char.repeat(count);
    }
}
console.log(output);
