//import readline from node library to handle stdin events
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

const TABLE_UPPER_BOUND = 5;
const TABLE_LOWER_BOUND = 0;
const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const COMMANDS = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];
let placed = false;
let robot;

//stdin event listener
rl.on('line', (line) => {
	line = line.split(' ');
	if (!COMMANDS.includes(line[0])) return;
	switch (line[0]) {
		case 'PLACE':
			if (placed) return;
			location = line[1].split(',');
			robot = new Robot(location[0], location[1], location[2]);
			break;
		case 'MOVE':
			if (!placed) return;
			robot.move();
			break;
		case 'LEFT':
			if (!placed) return;
			robot.turn(-1);
			break;
		case 'RIGHT':
			if (!placed) return;
			robot.turn(1);
			break;
		case 'REPORT':
			if (!placed) return;
			console.log(robot.details);
			break;
	}
});

//Robot class and associated methods
class Robot {
	constructor(x, y, direction) {
		if (this.checkValidPlacement(x, y, direction)) {
			this.x = x;
			this.y = y;
			this.direction = direction;
			placed = true;
		} else {
			console.log('Robot parameters are not valid.');
		}
	}

	checkValidPlacement(x, y, direction) {
		if (x === undefined || y === undefined || direction === undefined) {
			return false; //missing parameters
		}
		if (x < TABLE_LOWER_BOUND || x > TABLE_UPPER_BOUND) {
			return false;
		}
		if (y < TABLE_LOWER_BOUND || y > TABLE_UPPER_BOUND) {
			return false;
		}
		if (!(DIRECTIONS.includes(direction))) {
			return false;
		}
		return true;
	}	

	move() {
		//depending on direction, x/y ++/--
		let index = DIRECTIONS.indexOf(this.direction);
		switch (index) {
			case 0:
				if (this.checkValidPlacement(this.x, this.y + 1, this.direction)) this.y++;
				break;
			case 1:
				if (this.checkValidPlacement(this.x + 1, this.y, this.direction)) this.x++;
				break;
			case 2:
				if (this.checkValidPlacement(this.x, this.y - 1, this.direction)) this.y--;
				break;
			case 3:
				if (this.checkValidPlacement(this.x - 1, this.y, this.direction)) this.x--;
				break;
		}
	}

	turn(direction) {
		let index = DIRECTIONS.indexOf(this.direction);
		index = index + direction;
		if (index == -1) index = 3;
		if (index == 4) index = 0;
		this.direction = DIRECTIONS[index];
	}

	get details() {
		return [this.x, this.y, this.direction];
	}
}