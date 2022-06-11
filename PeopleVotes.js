// The county starts as a single rectangular district. A single district can be split vertically or horizontally in two new districts. This ensures that all districts remain rectangular. Your objective is to find the optimal cuts to maximize the number of voters granted by your districts.
// Each district will grant you a certain amount of voters, depending solely on its dimensions. The input is a table of number of voters for each possible shape. The dimensions are not symmetrical, i.e. a 5x3 area may not have the same value as a 3x5 one.

// Input
// Line 1: Two integers W and H, the width and height of your county.
// Next H lines: W integers representing the amount of voters given by a district of shape hxw
// Output
// Line 1: A single integer representing the maximum amount of voters you can get by redefining electoral districts.


//INPUTS
const [w, h] = readline().split(' ');
const matrix = [[]]; //add extra line to start index table from 1
for (let i = 0; i < h; i++) {
    matrix.push([0, ...readline().split(' ').map(x => +x)]);
}

//BODY
for (let line = 1; line <= h; line++) {
    for (let column = 1; column <= w; column++) {
        let max = matrix[line][column];
        for (let i = 1; i <= column / 2; i++) {
            let splitDistrict = matrix[line][i] + matrix[line][column - i];
            max = Math.max(max, splitDistrict);
        }
        for (let i = 1; i <= line / 2; i++) {
            let splitDistrict = matrix[i][column] + matrix[line - i][column];
            max = Math.max(max, splitDistrict);
        }
        matrix[line][column] = max;
    }
}

//OUTPUT
console.log(matrix[h][w]);
