
const rows = 20;
const cols = 25;
let grid = createGrid();
let play = false;
 
function createGrid() {
  let result = [];
  for (let i = 0; i < rows; i++) {
    let row = []; 
    for (let j = 0; j < cols; j++) {
      row.push(false);
    }
    result.push(row);
  }
  return result;
}
 
function nextGeneration() {
  let newGrid = createGrid();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Counts the number of alive neighbors
      let directions = [[1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1]];
      let aliveNeighbors = 0;
      for (d of directions) {
        let neighborRow = i + d[0];
        let neighborCol = j + d[1];
        if (neighborRow >= 0 && neighborCol >= 0 && neighborRow < rows && neighborCol < cols) {
          if (grid[neighborRow][neighborCol]) {
            aliveNeighbors++;
          }
        }
      }
      // Decide whether or not the new cell is alive or dead
      if (grid[i][j]) {
        newGrid[i][j] = aliveNeighbors == 2 || aliveNeighbors == 3;
      } else {
        newGrid[i][j] = aliveNeighbors == 3;
      }
    }
  }
  grid = newGrid;
}
 
// Initial call for rows and columns
function setup() {
  let height = 500;
  console.log(grid);
  createCanvas(height * cols/rows, height);
  frameRate(3);
}
 
// Called everytime for each Mouse click
function draw() {
  background(255);
  // Grid Representation
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j]) {
        fill(20);
        rect(j/cols * width, i/rows * height, width/cols, height/rows);
      }
    }
  }
 
  // Horizontal lines for grid
  stroke(200);
  for (let i = 0; i <= rows; i++) {
    line(0, i/rows * height, width, i/rows * height);
  }
 
  // Vertical lins for grid
  for (let i = 0; i <= cols; i++) {
    line(i/cols * width, 0, i/cols * width, width);
  }
  if (play) {
    nextGeneration();
    console.log(grid)
  }
}
 
function mouseClicked() {
  let row = Math.floor(mouseY/height * rows);
  let col = Math.floor(mouseX/width * cols);
  if (row >= 0 && col >= 0 && row < rows && col < cols) {
    grid[row][col] = !grid[row][col];
  }
}
 
let playButton = document.querySelector(".play-button");
playButton.addEventListener("click", function() {
  play = !play;
  if (play) {
    playButton.textContent = "Pause";
  } else {
    playButton.textContent = "Play";
  }
});
let clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", function() {
  grid = createGrid();
});

function addCell(){
    
}