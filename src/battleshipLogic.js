

const ships = [];

function Ship(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.coordinates = [];
}

Ship.prototype.hit = function() {
    this.hits++;
    this.isItSunk();
}

Ship.prototype.isItSunk = function() {
    if (this.hits === this.length) {
        this.sunk = true;
    }
    isItOver();
}

function Gameboard(color) {
    this.color = `${color}`;
    this.missed = [];
    this.shipsHit = [];
    this.shipsAt = [];
    this.spotPlayed = [];
}

function Player(color) {
    this.color = color;
    this.health = 5;
    this.board = new Gameboard(this.color);
    this.carrier = new Ship(5);
    this.battleship = new Ship(4);
    this.cruiser = new Ship(3);
    this.submarine = new Ship(3);
    this.destroyer = new Ship(2);
}

const blue = new Player("blue");
const red = new Player("red");

function isItOver() {
    console.log(red.carrier.sunk)
    if (red.carrier.sunk && red.battleship.sunk && red.cruiser.sunk && red.submarine.sunk && red.destroyer.sunk) {
        console.log('blue wins')
    } else if ( blue.carrier.sunk === true && blue.battleship.sunk === true && blue.cruiser.sunk === true && blue.submarine.sunk === true && blue.destroyer.sunk === true) {
        console.log('red wins')
    }
}

function shipInDOM(occupiedSpace) {
    let selection = document.querySelector(occupiedSpace)
    selection.classList.add("ship");
}

function missInDOM(selectedSpace) {
    let selection = document.querySelector(selectedSpace);
    selection.classList.add('miss');
}

function hitInDOM(selectedSpace) {
    let selection = document.querySelector(selectedSpace);
    selection.classList.add('hit');
    selection.innerHTML = 'X'
}

//how to find what coordinates belong to what ship in the receiveAttack function
Gameboard.prototype.placeShip = function(ship, startCoord, endCoord) {
    let newPush
    ships.push(ship);
    let color = this.color;
    if (startCoord.at(0) === endCoord.at(0)) {
        for (let i = 0; i < ship.length; i++) {
            newPush = startCoord.slice();
            console.log(newPush)
            ship.coordinates.push(newPush);
            this.shipsAt.push(newPush);
            startCoord[1] += 1;
            shipInDOM(`.${color}${newPush.join('')}`);
        }
    } else if (startCoord.at(1) === endCoord.at(1)) {
        for (let j = 0; j < ship.length; j++) {
            newPush = startCoord.slice();
            ship.coordinates.push(newPush);
            this.shipsAt.push(newPush);
            startCoord[0] += 1
            shipInDOM(`.${color}${newPush.join('')}`);
        }
    }
};





function arrayOfShortArraysSearch(array, value) {
    for (let index = 0; index < array.length; index++) {
        if (array[index][0] === value[0] && array[index][1] === value[1]) {
            return index;
        } 
    }
    return null
}

function whoDidItHit(attackCoord) {
    for (let ship of ships) {
        let index = arrayOfShortArraysSearch(ship.coordinates, attackCoord)
        if (Number.isInteger(index)) {
            ship.hit();
        }
    }
}

Gameboard.prototype.receiveAttack = function(attackCoord) {
    let index = arrayOfShortArraysSearch(this.shipsAt, attackCoord);
    console.log(attackCoord)
    let color = this.color;
    //add already played conition?
    if (index === null) {
        this.missed.push(attackCoord);
        this.spotPlayed.push(attackCoord);
        missInDOM(`.${color}${attackCoord.join('')}`);
        console.log('miss')
    } else {
        this.shipsHit.push(attackCoord);
        this.spotPlayed.push(attackCoord)
        whoDidItHit(attackCoord);
        hitInDOM(`.${color}${attackCoord.join('')}`);
        console.log('hit')
    }


}







module.exports = { Ship, Player, Gameboard, arrayOfShortArraysSearch, red, blue};