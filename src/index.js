import './styles.css';
const { Ship, Player, Gameboard, arrayOfShortArraysSearch, red, blue } = require("./battleshipLogic.js");

const redBox = document.getElementById('redBox');
const controlBox = document.getElementById('control');
const blueBox = document.getElementById('blueBox');

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
    

    for (let y = -1; y < 10; y++) {
        const row = document.createElement('tr');
        if (y === -1) {
            for (let i = 0; i < 11; i++) {
                const alph = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
                const cell = document.createElement('td');
                cell.innerHTML = `${alph.at(i)}`;
                row.appendChild(cell);
            }
        } else {
            for (let x = -1; x < 10; x++) {
                const cell = document.createElement('td');

                if (x === -1) {
                    cell.innerHTML = `${y + 1}`
                } else if (player === blue) {
                    cell.classList.add(`${player.color}${x}${y}`);
                } else if (player === red) {
                    cell.classList.add(`${player.color}${x}${y}`);
                
                    //cell.innerHTML = `${x}${y}`;
                    cell.addEventListener('click', () => {
                        player.board.receiveAttack([x, y]);
                        cell.classList.remove('greyed')
                        redPlayRandom();

                    }, {once: true})

                    if (player === red) {
                        cell.classList.add('greyed')
                    }
                
                }

                row.appendChild(cell); 
            }
        }
        body.appendChild(row);
    }
    board.appendChild(body);
    element.appendChild(board)
}

function redPlayRandom() {
    console.log()
    let play
    let testResult

        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);   
        play = [x, y];
        testResult = arrayOfShortArraysSearch(blue.board.spotPlayed, play)

    if (testResult === null) {
        blue.board.receiveAttack(play)
    } else (
        redPlayRandom()
    )
}




blue.board.placeShip(blue.battleship, [0, 6], [0, 9])
blue.board.placeShip(blue.carrier, [0, 0], [4, 0])
blue.board.placeShip(blue.cruiser, [3, 4], [3, 6])
blue.board.placeShip(blue.submarine, [9, 0], [9, 2])
blue.board.placeShip(blue.destroyer, [8, 7], [8, 8])

red.board.placeShip(red.battleship, [0, 6], [0, 9])
red.board.placeShip(red.carrier, [0, 0], [4, 0])
red.board.placeShip(red.cruiser, [3, 4], [3, 6])
red.board.placeShip(red.submarine, [9, 0], [9, 2])
red.board.placeShip(red.destroyer, [8, 7], [8, 8])