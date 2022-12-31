import './styles.css';
const { Ship, Player, Gameboard, arrayOfShortArraysSearch, redPlayRandom } = require("./battleshipLogic.js");

const redBox = document.getElementById('redBox');
const controlBox = document.getElementById('control');
const blueBox = document.getElementById('blueBox');

const blue = new Player();
const red = new Player();


(function DOMBasics() {
    const newGameButton = document.createElement('button');
    newGameButton.innerHTML = 'Start New Game';
    controlBox.appendChild(newGameButton)
    generateBoard(redBox, red)
    generateBoard(blueBox, blue)
})();

function generateBoard(element, player) {
    const board = document.createElement('table');
    const body = document.createElement('tbody');

    for (let y = -1; y < 11; y++) {
        const row = document.createElement('tr');
        if (y === -1) {
            for (let i = 0; i < 11; i++) {
                const alph = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
                const cell = document.createElement('td');
                cell.innerHTML = `${alph.at(i)}`;
                row.appendChild(cell);
            }
        } else if (y > 0) {
            for (let x = -1; x < 10; x++) {
                const cell = document.createElement('td');

                if (x === -1) {
                    cell.innerHTML = `${y}`
                } else {
                    cell.addEventListener('click', () => {
                        player.board.receiveAttack([x, y])
                        console.log([x, y])
                    })
                }

                row.appendChild(cell); 
            }
        }
        body.appendChild(row);
    }
    board.appendChild(body);
    element.appendChild(board)
}



