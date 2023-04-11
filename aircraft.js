/*
There are enemy aircraft (> or <) in the sky (made of .). Each turn they move one cell forward. You are in charge of shooting them with a surface-to-air missile (^). You can only shoot vertically. Each turn your missiles move one cell up.

Note: When you shoot, the missile appears at the same altitude as the launcher. Each turn, the missile moves one cell up. The plane disappears after beeing shot, so does the missiles after having shot a plane. Every plane is shootable. There isn't any collision between planes, you have to shoot them all.

You have to print, each turn, if you WAIT or if you SHOOT. You have to shoot all the enemy aircraft, and your stock is just enough, so don't SHOOT if you can't hit an aircraft. After shooting every missile, do not print the last WAITs.
*/

// VARIABLES
const n = +readline();
const line = [];
const launcherCommand = [];

// INPUTS
for (let i = 0; i < n; i++) {
    line[i] = readline();
}

// BODY
const launcherPosition = line[n - 1].indexOf('^');

for (let i = n - 2; i >= 0; i--) {
    let skyLevel = n - i;
    let plane = -1;
    while ((plane = line[i].indexOf('>', plane + 1)) > -1) {
        launcherCommand[launcherPosition - plane - skyLevel] = 'SHOOT';
    }
    plane = -1;
    while ((plane = line[i].indexOf('<', plane + 1)) > -1) {
        launcherCommand[plane - launcherPosition - skyLevel] = 'SHOOT';
    }
}

// OUTPUT
const output = launcherCommand
    .join('\n')
    .replaceAll('\n', 'WAIT\n')
    .replaceAll('SHOOTWAIT', 'SHOOT');
console.log(output);
