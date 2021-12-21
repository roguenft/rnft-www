// import { GameState, Map } from "rnft-client";
// import { memory } from "rnft-client/rnft_client_bg";

// const CELL_SIZE = 48; // px
const GRAY = "#CCCCCC";
const WHITE = "#FFFFFF";
const BLACK = "#000000";

// const state = GameState.new();
// const width = state.get_map_width();
// const height = state.get_map_height();

// Give the canvas room for all of our cells and a 1px border
// around each of them.
// const canvas = document.getElementById("rogue-canvas");
// canvas.width = CELL_SIZE * width;
// canvas.height = CELL_SIZE * height;

// const ctx = canvas.getContext('2d');
// ctx.font = '64px serif';

// let animationId = null;

import { Display } from "rot-js";

let o = {
	width: 11,
	height: 5
}
let d = new Display(o);
document.body.appendChild(d.getContainer());

for (let i=0; i<o.width; i++) {
	for (let j=0; j<o.height; j++) {
		if (!i || !j || i+1 == o.width || j+1 == o.height) {
			d.draw(i, j, "#", "gray");
		} else {
			d.draw(i, j, ".", "#666");
		}
	}
}
d.draw(o.width >> 1, o.height >> 1, "@", "goldenrod");

// const displayOptions = {
//     // Configure the display
//     bg: "white", // background
//     fg: "dimGrey", // foreground
//     fontFamily: "Fira Mono", // font (use a monospace for esthetics)
//     width: 25,
//     height: 20, // canvas height and width
//     fontSize: 18, // canvas fontsize
//     forceSquareRatio: true // make the canvas squared ratio
// };

// // Object containing colors per tile
// // you may add as much as you want corresponding to characters
// // they will then be customly applied to each character
// const colors = {
//     ".": "lightgrey" // the moveable path
// };

// // const sleep = require('sleep-promise');
// let Game = {
//     map: [],
//     win: false,
//     // initialize the game at start time
//     init: async function () {
//         // we make the init function sleep to help load fonts
//         await sleep(500).then(() => {
//         // pass the configuration defined as arguments
//         Display = new ROT.Display(displayOptions);
//         let canvas = document.getElementById("rogue-canvas");
//         // append the created display to the HTML element
//         canvas.appendChild(Display.getContainer());
//       });
//       Display.clear(); // remove anything displayed
//       this.createLevel(); // create level
//       Player.init(); // initialize the player attributes
//       this.engine(); // start the game engine
//       this.draw();
//     },
//     engine: async function () {
//       // this is responsible of watching the player move and updating
//       // the display accordingly. It is all we need as engine
//       while (true) {
//         await Player.act();
//         this.draw();
//       }
//     },
//     // we seperate the generating function so as to help recall it anytime,
//     // in case we need a new generated level
//     createLevel: function () {
//       GameWorld.generate();
//     },

//     draw: function () {
//       Display.clear();
//       GameWorld.draw();
//       Player.draw();
//     },

//     // when the game is over, we end it.
//     endGame: function () {
//       this.win = true;
//       Display.clear();
//       Display.draw(8, 8, "You logged the rocket!", "violet");
//     }
// };

// let GameWorld = {
//     map: [],
//     moveSpace: [],
//     generate: function () {
//       let map = [];
//       for (let i = 0; i < displayOptions.width; i++) {
//         map[i] = [];
//         for (let j = 0; j < displayOptions.height; j++) {
//           map[i][j] = "+"; // create the walls around the map
//         }
//       }
//       let freeCells = []; // this is where we shall store the moveable space
//       // we create a cellular map using RotJS
//       let digger = new ROT.Map.Cellular(
//         displayOptions.width - 2,
//         displayOptions.height - 2
//       );
//       // randomize(probability) set all cells to "alive" with a
//       // given probability (0 = no cells, 1 = all cells)
//       digger.randomize(0.4);
//       digger.create((x, y, value) => {
//         if (value) {
//           map[x + 1][y + 1] = "🌖"; // create the walls
//         } else {
//           freeCells.push({ x: x + 1, y: y + 1 });
//           map[x + 1][y + 1] = "."; // add . to every free space just for esthetics
//         }
//       });

//       // put the exit gate on the last free cell
//       const lastFreeCell = freeCells.pop();
//       map[lastFreeCell.x][lastFreeCell.y] = "🌍";
//       this.map = map;
//       this.freeCells = freeCells;
//     },
//     // make it impossible to pass through if across an obstacle
//     isPassable: function (x, y) {
//       if (GameWorld.map[x][y] === "+" || GameWorld.map[x][y] === "🌖") {
//         return false;
//       } else {
//         return true;
//       }
//     },
//     draw: function () {
//       this.map.forEach((element, x) => {
//         element.forEach((element, y) => {
//           Display.draw(x, y, element, colors[element] || "red");
//         });
//       });
//     }
//   };

//   let Player = {
//     x: null,
//     y: null,
//     init: function () {
//       let playerStart = GameWorld.freeCells[0]; // put the player in the first available freecell
//       this.x = playerStart.x;
//       this.y = playerStart.y;
//     },
//     draw: function () {
//       Display.draw(this.x, this.y, "🚀", "black");
//     },
//     act: async function () {
//       let action = false;
//       while (!action) {
//         await new Promise((resolve) => setTimeout(resolve, 100));
//         let e = await new Promise((resolve) => {
//           window.addEventListener("keydown", resolve, { once: true });
//         });
//         action = this.handleKey(e);
//       } //Await a valid movement
//       // make it end when the rocket reaches the earth
//       if (GameWorld.map[this.x][this.y] === "🌍") {
//         Game.endGame();
//         Game.createLevel();
//         this.init();
//       }
//     },
//     handleKey: function (e) {
//       var keyCode = [];
//       //Arrows keys
//       keyCode[38] = 0; // key-up
//       keyCode[39] = 2; // key-right
//       keyCode[40] = 4; // key-down
//       keyCode[37] = 6; // key-left
//       var code = e.keyCode;
//       if (!(code in keyCode)) {
//         return false;
//       }
//       let diff = ROT.DIRS[8][keyCode[code]];
//       if (GameWorld.isPassable(this.x + diff[0], this.y + diff[1])) {
//         this.x += diff[0];
//         this.y += diff[1];
//         this.justMoved = true;
//         return true;
//       } else {
//         return false;
//       }
//     }
//   };

// // listen to keystrokes
// window.addEventListener(
//     "keydown",
//     function (e) {
//       // space and arrow keys
//       if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
//         e.preventDefault();
//       }
//     },
//     false
//   );
//   // load the game
//   window.onload = Game.init();
//   // focus on the canvas
//   window.focus();


// const renderLoop = () => {
//     drawMap();
//     drawCharacter();

//     //animationId = requestAnimationFrame(renderLoop);
// };

// const play = () => {
//   renderLoop();
// };

// const getIndex = (row, column) => {
//     return row * width + column;
// };

// const getRow = (idx) => {
//     return idx / width;
// }

// const getCol = (idx) => {
//     return idx % width;
// }

// const drawMap = () => {
//     ctx.beginPath();
//     ctx.fillStyle = WHITE;

//     for (let row = 0; row < height; row++) {
//         for(let col = 0; col < width; col++) {
//             console.log(state.get_map_tile(getIndex(0, 21)))
//             ctx.fillText(
//                 // String.fromCharCode((getIndex(row, col) % 10)+48),
//                 state.get_map_tile(getIndex(row, col)),
//                 col * CELL_SIZE,
//                 row * CELL_SIZE+CELL_SIZE,
//             )
//         }
//     }
//     ctx.stroke();
// }

// const drawCharacter = (character) => {
//     let char_pos = state.get_char_pos();
//     ctx.fillText(state.get_char_tile(), getCol(char_pos)*CELL_SIZE, getRow(char_pos)*CELL_SIZE+CELL_SIZE);
// }

// // canvas.addEventListener("click", event => {
// //   const boundingRect = canvas.getBoundingClientRect();

// //   const scaleX = canvas.width / boundingRect.width;
// //   const scaleY = canvas.height / boundingRect.height;

// //   const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
// //   const canvasTop = (event.clientY - boundingRect.top) * scaleY;

// //   const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
// //   const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

// //   universe.toggle_cell(row, col);

// //   drawCells();
// //   drawGrid();
// // });

// play();
