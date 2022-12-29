
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
    this.hits >= this.length ? this.sunk = true : this.sunk = false;
}

function Gameboard() {
    this.missed = [];
    this.shipsHit = [];
    this.shipsAt = [];
}
//
Gameboard.prototype.placeShip = function(ship, startCoord, endCoord) {
    let newPush
    if (startCoord.at(0) === endCoord.at(0)) {
        for (let i = 0; i < ship.length; i++) {
            newPush = startCoord.slice();
            ship.coordinates.push(newPush);
            this.shipsAt.push(newPush);
            startCoord[1] += 1
        }
    } else if (startCoord.at(1) === endCoord.at(1)) {
        for (let i = 0; i < ship.length; i++) {
            newPush = startCoord.slice();
            ship.coordinates.push(newPush);
            this.shipsAt.push(newPush);
            startCoord[0] += 1
        }
    }
};

function arrayOfShortArraysSearch(array, value) {
    for (let index = 0; index < array.length; index++) {
        if (array[index][0] === value[0] && array[index][1] === value[1]) {
            return index
        }
    }
}

module.exports = { Ship, Gameboard, arrayOfShortArraysSearch };