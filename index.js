import { GameState, Map } from "rnft-client";
import { memory } from "rnft-client/rnft_client_bg";

const CELL_SIZE = 48; // px
const GRAY = "#CCCCCC";
const WHITE = "#FFFFFF";
const BLACK = "#000000";

const state = GameState.new();
const width = state.get_map_width();
const height = state.get_map_height();

// Give the canvas room for all of our cells and a 1px border
// around each of them.
const canvas = document.getElementById("game-of-life-canvas");
canvas.width = CELL_SIZE * width;
canvas.height = CELL_SIZE * height;

const ctx = canvas.getContext('2d');
ctx.font = '64px serif';

let animationId = null;

const renderLoop = () => {
    drawMap();
    drawCharacter();

    //animationId = requestAnimationFrame(renderLoop);
};

const play = () => {
  renderLoop();
};

const getIndex = (row, column) => {
    return row * width + column;
};

const getRow = (idx) => {
    return idx / width;
}

const getCol = (idx) => {
    return idx % width;
}

const drawMap = () => {
    ctx.beginPath();
    ctx.fillStyle = WHITE;

    for (let row = 0; row < height; row++) {
        for(let col = 0; col < width; col++) {
            console.log(state.get_map_tile(getIndex(0, 21)))
            ctx.fillText(
                // String.fromCharCode((getIndex(row, col) % 10)+48),
                state.get_map_tile(getIndex(row, col)),
                col * CELL_SIZE,
                row * CELL_SIZE+CELL_SIZE,
            )
        }
    }
    ctx.stroke();
}

const drawCharacter = (character) => {
    let char_pos = state.get_char_pos();
    ctx.fillText(state.get_char_tile(), getCol(char_pos)*CELL_SIZE, getRow(char_pos)*CELL_SIZE+CELL_SIZE);
}

// canvas.addEventListener("click", event => {
//   const boundingRect = canvas.getBoundingClientRect();

//   const scaleX = canvas.width / boundingRect.width;
//   const scaleY = canvas.height / boundingRect.height;

//   const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
//   const canvasTop = (event.clientY - boundingRect.top) * scaleY;

//   const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
//   const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

//   universe.toggle_cell(row, col);

//   drawCells();
//   drawGrid();
// });

play();
