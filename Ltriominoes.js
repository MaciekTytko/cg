const getNextIndex = (function () {
    let index = 0;
    return function () { index += 1; return index }
})();

// INPUT
const n = parseInt(readline());
var inputs = readline().split(' ');
const x = parseInt(inputs[0]);
const y = parseInt(inputs[1]);

// BODY
let grid = makeEmptyGrid(n, x, y);
grid = calculateLTriominoes(n, grid, getNextIndex());
let out = drawASCII(n, grid);
out = drawHole(x, y, out);

// OUTPUT
console.log(out.join("\n"));


// FUNCTION
function drawHole(x, y, outputString) {
    let text = outputString[y * 2 + 1].split("");
    text[x * 3 + 1] = "#";
    text[x * 3 + 2] = "#";
    outputString[y * 2 + 1] = text.join("");
    return outputString;
}

function drawASCII(n, grid) {
    grid.push([...Array(2 ** n)].fill(0)); //add zero to better draw output
    let out = [];
    out.push(drawASCII_gridTop(n))
    for (let i = 0; i < 2 ** n; i++) {
        out.push(drawASCII_cellCenter(n, grid, i));
        out.push(drawASCII_cellBottom(n, grid, i));
    }
    return out;
}
function drawASCII_gridTop(n) {
    return '+' + ('--+').repeat(2 ** n);
}
function drawASCII_cellCenter(n, grid, i) {
    let row = '|';
    for (let j = 0; j < 2 ** n; j++) {
        row += grid[i][j] === grid[i][j + 1] ? '   ' : '  |';
    }
    return row;
}
function drawASCII_cellBottom(n, grid, i) {
    row = '+';
    for (let j = 0; j < 2 ** n; j++) {
        row += grid[i][j] === grid[i + 1][j] ? '  +' : '--+';
    }
    return row;
}

function makeEmptyGrid(n, x, y) {
    let grid = [...Array(2 ** n)].map(i => [...Array(2 ** n)].fill(0));
    grid[y][x] = getNextIndex();
    return grid;
}

function calculateLTriominoes(n, grid, index) {
    if (n === 1) {
        return calculateLTriominoes_1x1(grid, index);
    }

    let y = grid.findIndex(a => a.reduce((t, e) => t = t + e) > 0);
    let x = grid[y].findIndex(e => e > 0);
    let half = 2 ** (n - 1);

    if (!(x < half && y < half)) { grid[half - 1][half - 1] = index };
    if (!(x < half && y >= half)) { grid[half][half - 1] = index };
    if (!(x >= half && y < half)) { grid[half - 1][half] = index };
    if (!(x >= half && y >= half)) { grid[half][half] = index };

    let topLeftGrid = grid.filter((x, i) => i < half).map(x => x.slice(0, x.length / 2));
    let topRightGrid = grid.filter((x, i) => i < half).map(x => x.slice(x.length / 2, x.length));
    let bottonLeftGrid = grid.filter((x, i) => i >= half).map(x => x.slice(0, x.length / 2));
    let bottomLeftGrid = grid.filter((x, i) => i >= half).map(x => x.slice(x.length / 2, x.length));

    topLeftGrid = calculateLTriominoes(n - 1, topLeftGrid, getNextIndex());
    topRightGrid = calculateLTriominoes(n - 1, topRightGrid, getNextIndex());
    bottonLeftGrid = calculateLTriominoes(n - 1, bottonLeftGrid, getNextIndex());
    bottomLeftGrid = calculateLTriominoes(n - 1, bottomLeftGrid, getNextIndex());

    grid = [];
    topLeftGrid.map((a, i) => grid.push(a.concat(topRightGrid[i])));
    bottonLeftGrid.map((a, i) => grid.push(a.concat(bottomLeftGrid[i])));

    return grid;
}

function calculateLTriominoes_1x1(grid, index) {
    grid = grid.map(row => row.map(c => c === 0 ? index : c));
    return grid;
}
