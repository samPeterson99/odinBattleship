

const ships = [];


function Ship(color, length, name) {
    this.color = color;
    this.length = length;
    this.name = name;
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
        this.display.classList.add('sunk')
    }
    isItOver();
}

Ship.prototype.displayInDOM = function(box) {
    this.display = document.createElement('h2');
    this.display.innerHTML = `${this.name}`;
    box.appendChild(this.display);

    this.display.classList.add('shipDisplay');


}

function Gameboard(color) {
    this.color = color;
    this.missed = [];
    this.shipsHit = [];
    this.shipsAt = [];
    this.spotPlayed = [];
}

function Player(color) {
    this.color = color;
    this.health = 5;
    this.board = new Gameboard(this.color);
    this.carrier = new Ship(color, 5, 'Carrier');
    this.battleship = new Ship(color, 4, 'Battleship');
    this.cruiser = new Ship(color, 3, 'Cruiser');
    this.submarine = new Ship(color, 3, 'Submarine');
    this.destroyer = new Ship(color, 2, 'Destroyer');
}

const blue = new Player("blue");
const red = new Player("red");

function isItOver() {
    if (red.carrier.sunk && red.battleship.sunk && red.cruiser.sunk && red.submarine.sunk && red.destroyer.sunk) {
        alert('blue wins')
    } else if ( blue.carrier.sunk && blue.battleship.sunk && blue.cruiser.sunk && blue.submarine.sunk && blue.destroyer.sunk) {
        alert('red wins')
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
    console.log(ship)
    let color = this.color;
    if (startCoord.at(0) === endCoord.at(0)) {
        for (let i = 0; i < ship.length; i++) {
            newPush = startCoord.slice();

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

function whoDidItHit(attackCoord, color) {
    for (let ship of ships) {
        let index = arrayOfShortArraysSearch(ship.coordinates, attackCoord)
        console.log(ship.color)
        if (Number.isInteger(index) && ship.color === color) {
            ship.hit();
            console.log(ship)
        }
    }
}

Gameboard.prototype.receiveAttack = function(attackCoord) {
    let index = arrayOfShortArraysSearch(this.shipsAt, attackCoord);
    let color = this.color;
    //add already played conition?
    if (index === null) {
        this.missed.push(attackCoord);
        this.spotPlayed.push(attackCoord);
        missInDOM(`.${color}${attackCoord.join('')}`);

    } else {
        this.shipsHit.push(attackCoord);
        this.spotPlayed.push(attackCoord)
        whoDidItHit(attackCoord, this.color);
        console.log(this.color)
        hitInDOM(`.${color}${attackCoord.join('')}`);

    }


}







module.exports = { Ship, Player, Gameboard, arrayOfShortArraysSearch, red, blue};