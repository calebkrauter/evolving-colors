const cell = {
    alive: false,
    width: 100,
    height: 100,
    random: {
        R: Math.floor(Math.random() * 256),
        G: Math.floor(Math.random() * 256),
        B: Math.floor(Math.random() * 256)
    },
    flowCycle: {
        R: 0,
        G: 0,
        B: 0,
        RGB: `rgb(${this.R}, ${this.G}, ${this.B})`
    }
}

const gridLayers = {
    gridBack: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => 0)),
    gridFront: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => cell)),
    gridWidth: 10,
    gridHeight: 10
}

const colorFlowType = {
    random: {
        R: 0,
        G: 0,
        B: 0
    },
    flowCycle: {
        R: 0,
        G: 0,
        B: 0,
        RGB: `rgb(${this.R}, ${this.G}, ${this.B})`
    }

}

//
boundsOfCell = {
    x: {
        b1: this.x - 1,
        b2: this.x,
        b3: this.x + 1,
    },
    y: {
        b1: this.y - 1,
        b2: this.y,
        b3: this.y + 1,
    }
}
class MyAutomata {
    x = 1;
    y = 1;
    i = 0;
    R = 0;
    G = 0;
    B = 0;



    countCycles = 0;

    constructor(game) {
        Object.assign(this, { game });

        // make an array that contains 10x10 based position values.
        // Might be easier to make this in the terminal first.
        // this.fillGridBack();
        // console.log(this.fillGridBack());
        // console.log(this.fillGridFront());
        this.nextItr = false;

        this.initGridBack();
        // Test that cells are acurately set to live and die randomly.
        // this.testRandomLife();
        // this.testAFewCells();
        this.testFourByFour();
        // this.testRandomLife();
        this.initGridFront();
        this.updateGridFront();
    }

    testFourByFour() {
        // L
        // gridLayers.gridBack[1][2].alive = true;
        // gridLayers.gridBack[1][3].alive = true;
        // gridLayers.gridBack[2][3].alive = true;
        // gridLayers.gridBack[3][3].alive = true;


        // Tests birth upon 3 neighbors birthing 2,3
        // gridLayers.gridBack[3][3].alive = true;
        // gridLayers.gridBack[2][2].alive = true;
        // gridLayers.gridBack[3][2].alive = true;

        // Tests birth upon 3 neighbors birthing 1,2 by corner of grid.
        // gridLayers.gridBack[1][1].alive = true;
        // gridLayers.gridBack[2][2].alive = true;
        // gridLayers.gridBack[2][1].alive = true;

        // gridLayers.gridBack[1][1].alive = true;


        // gridLayers.gridBack[2][2].alive = true;
        // gridLayers.gridBack[3][1].alive = true;
        // gridLayers.gridBack[1][3].alive = true;
        // gridLayers.gridBack[3][3].alive = true;

        gridLayers.gridBack[2][3].alive = true;
        gridLayers.gridBack[3][3].alive = true;
        gridLayers.gridBack[4][3].alive = true;


        //

        // //                  X  Y
        // // Left wall
        // gridLayers.gridBack[1][1].alive = true;
        // gridLayers.gridBack[1][2].alive = true;
        // gridLayers.gridBack[1][3].alive = true;
        // // Floor
        // gridLayers.gridBack[1][3].alive = true;
        // gridLayers.gridBack[2][3].alive = true;
        // gridLayers.gridBack[3][3].alive = true;
        // // Right wall
        // gridLayers.gridBack[3][1].alive = true;
        // gridLayers.gridBack[3][2].alive = true;
        // gridLayers.gridBack[3][3].alive = true;
        // // Ceiling
        // gridLayers.gridBack[1][1].alive = true;
        // gridLayers.gridBack[2][1].alive = true;
        // gridLayers.gridBack[3][1].alive = true;
    }

    testAFewCells() {
        // square
        gridLayers.gridBack[10][10].alive = true;
        gridLayers.gridBack[11][10].alive = true;
        gridLayers.gridBack[12][10].alive = true;

        // boat
        gridLayers.gridBack[20][10].alive = true;
        gridLayers.gridBack[21][10].alive = true;
        gridLayers.gridBack[20][9].alive = true;
        gridLayers.gridBack[21][9].alive = true;

        gridLayers.gridBack[23][8].alive = true;
        gridLayers.gridBack[24][8].alive = true;
        gridLayers.gridBack[23][7].alive = true;
        gridLayers.gridBack[24][7].alive = true;

        // Cross
        gridLayers.gridBack[5 + 20][5 + 12].alive = true;
        gridLayers.gridBack[5 + 21][5 + 12].alive = true;
        gridLayers.gridBack[5 + 20][5 + 9].alive = true;
        gridLayers.gridBack[5 + 21][5 + 9].alive = true;

        gridLayers.gridBack[5 + 23][5 + 8].alive = true;
        gridLayers.gridBack[5 + 24][5 + 8].alive = true;
        gridLayers.gridBack[5 + 23][5 + 7].alive = true;
        gridLayers.gridBack[5 + 24][5 + 7].alive = true;

        // Circle
        gridLayers.gridBack[10 + 30][10 + 10].alive = true;
        gridLayers.gridBack[10 + 31][10 + 10].alive = true;
        gridLayers.gridBack[10 + 30][10 + 9].alive = true;
        gridLayers.gridBack[10 + 31][10 + 9].alive = true;
        gridLayers.gridBack[12 + 30][10 + 10].alive = true;
        gridLayers.gridBack[12 + 31][10 + 10].alive = true;
        gridLayers.gridBack[12 + 30][10 + 9].alive = true;
        gridLayers.gridBack[12 + 31][10 + 9].alive = true;

        // Big dipper
        gridLayers.gridBack[14 + 30][10 + 10].alive = true;
        gridLayers.gridBack[14 + 31][10 + 10].alive = true;
        gridLayers.gridBack[14 + 30][10 + 9].alive = true;
        gridLayers.gridBack[14 + 31][10 + 9].alive = true;
        gridLayers.gridBack[16 + 30][10 + 10].alive = true;
        gridLayers.gridBack[16 + 31][10 + 10].alive = true;
        gridLayers.gridBack[16 + 30][10 + 9].alive = true;
        gridLayers.gridBack[16 + 31][10 + 9].alive = true;

        gridLayers.gridBack[17 + 30][10 + 10].alive = true;
        gridLayers.gridBack[17 + 31][10 + 10].alive = true;
        gridLayers.gridBack[17 + 30][10 + 9].alive = true;
        gridLayers.gridBack[17 + 31][10 + 9].alive = true;
        gridLayers.gridBack[6 + 30][10 + 10].alive = true;
        gridLayers.gridBack[6 + 31][10 + 10].alive = true;
        gridLayers.gridBack[6 + 30][10 + 9].alive = true;
        gridLayers.gridBack[6 + 31][10 + 9].alive = true;
        // Start chaos
        // gridLayers.gridBack[25][10].alive = true;
        // gridLayers.gridBack[26][10].alive = true;
        // gridLayers.gridBack[25][9].alive = true;
        // gridLayers.gridBack[26][9].alive = true;

        // gridLayers.gridBack[23][10].alive = true;
        // gridLayers.gridBack[24][10].alive = true;
        // gridLayers.gridBack[23][9].alive = true;
        // gridLayers.gridBack[24][9].alive = true;


    }
    // TODO - create a method that updates the front grid using the
    // back grid's data and following rules while staying within bounds.
    initGridFront() {
        for (let x = 1; x < gridLayers.gridBack.length - 1; x++) {
            for (let y = 1; y < gridLayers.gridBack.length - 1; y++) {
                gridLayers.gridFront[x][y] = { ...gridLayers.gridBack[x][y] };
                if (x == 0 || y == 0 || x == gridLayers.gridBack.length - 1 || y == gridLayers.gridBack.length - 1) {
                    gridLayers.gridFront[x][y].alive = false;
                }
            }
        }
        return gridLayers.gridFront;

    }

    clearGridBack() {
        for (let x = 0; x < gridLayers.gridBack.length; x++) {
            for (let y = 0; y < gridLayers.gridBack.length; y++) {
                gridLayers.gridBack[x][y].alive = false;
            }
        }
        return gridLayers.gridBack;
    }

    clearGridFront() {
        for (let x = 0; x < gridLayers.gridFront.length; x++) {
            for (let y = 0; y < gridLayers.gridFront.length; y++) {

                gridLayers.gridFront[x][y].alive = false;
            }
        }
        return gridLayers.gridFront;
    }
    updateGridFront() {
        // if (this.nextItr === false) {
        this.nextItr = true;
        for (let x = 1; x < gridLayers.gridBack.length - 1; x++) {
            for (let y = 1; y < gridLayers.gridBack.length - 1; y++) {
                // Check rules and update gridFront based on gridBack.
                // xy 
                // gridLayers.gridFront[x][y] = { ...gridLayers.gridBack[x][y] };
                // take a snapshot of current surounding 8 cells. Count how many are living.
                let suroundingAliveCells = this.snapshotOfNeighborhood(x, y);
                // let suroundingAliveCells = 2;

                if (gridLayers.gridBack[x][y].alive && suroundingAliveCells < 2) {
                    gridLayers.gridFront[x][y].alive = false;
                }
                if (gridLayers.gridBack[x][y].alive && suroundingAliveCells === 2) {
                    gridLayers.gridFront[x][y].alive = true;
                }
                if (gridLayers.gridBack[x][y].alive && suroundingAliveCells === 3) {
                    gridLayers.gridFront[x][y].alive = true;
                }
                // // // else 
                if (gridLayers.gridBack[x][y].alive && suroundingAliveCells > 3) {
                    gridLayers.gridFront[x][y].alive = false;
                }
                // // // else 
                if (gridLayers.gridBack[x][y].alive === false && suroundingAliveCells === 3) {
                    gridLayers.gridFront[x][y].alive = true;
                }

                // Dies from under/over population
                // if (gridLayers.gridBack[x][y].alive && (suroundingAliveCells < 2)) {
                //     gridLayers.gridFront[x][y].alive = false;
                // }
                // if (gridLayers.gridBack[x][y].alive && (suroundingAliveCells > 3)) {
                //     gridLayers.gridFront[x][y].alive = false;
                // }
                // if (gridLayers.gridBack[x][y].alive && (suroundingAliveCells == 2 || suroundingAliveCells == 3)) {
                //     gridLayers.gridFront[x][y].alive = true;
                // }
                // if (gridLayers.gridBack[x][y].alive == false && suroundingAliveCells == 3) {
                //     gridLayers.gridFront[x][y].alive = true;
                // }
                // if (gridLayers.gridBack[x][y].alive && (suroundingAliveCells < 2 || suroundingAliveCells > 3)) {
                //     gridLayers.gridFront[x][y].alive = false;
                // }

                // if (gridLayers.gridBack[x][y].alive && (suroundingAliveCells == 2 || suroundingAliveCells == 3)) {
                //     gridLayers.gridFront[x][y].alive = true;
                // }
                // else 
                // if (gridLayers.gridBack[x][y].alive == false && suroundingAliveCells == 3) {
                //     gridLayers.gridFront[x][y].alive = true;
                // }
            }
        }

        // } else if (this.nextItr === true) {
        gridLayers.gridBack = structuredClone(gridLayers.gridFront);

        // this.clearGridBack();
        // Why does clearing the front delete the back?
        // this.clearGridFront();
        this.nextItr = false;

        // }
        // this.clearGridFront();


        return gridLayers.gridFront;

    }
    //

    /* 
    x-1,y-1 x,y-1   x+1,y-1
    1      2     3
    x-1,y  x,y    x+1,y
    4      5     6
    x-1,y+1 x,y+1 x+1,y+1
    7      8     9

    
    */
    snapshotOfNeighborhood(theX, theY) {

        let aliveCellsCount = 0;
        if (gridLayers.gridBack[theX - 1][theY - 1].alive) {
            aliveCellsCount++;
            // console.log("at 1: " + aliveCellsCount)
        }
        if (gridLayers.gridBack[theX][theY - 1].alive) {
            aliveCellsCount++;
            // console.log("at 2: " + aliveCellsCount)

        }
        if (gridLayers.gridBack[theX + 1][theY - 1].alive) {
            aliveCellsCount++;
            // console.log("at 3: " + aliveCellsCount)

        }
        if (gridLayers.gridBack[theX - 1][theY].alive) {
            aliveCellsCount++;
            // console.log("at 4: " + aliveCellsCount)

        }
        if (gridLayers.gridBack[theX + 1][theY].alive) {
            aliveCellsCount++;
            // console.log("at 5: " + aliveCellsCount)

        }
        if (gridLayers.gridBack[theX - 1][theY + 1].alive) {
            aliveCellsCount++;
            // console.log("at 6: " + aliveCellsCount)

        }
        if (gridLayers.gridBack[theX][theY + 1].alive) {
            aliveCellsCount++;
            // console.log("at 7: " + aliveCellsCount)

        }
        if (gridLayers.gridBack[theX + 1][theY + 1].alive) {
            aliveCellsCount++;
            // console.log("at 3: " + aliveCellsCount)

        }
        if (theX == 2 && theY == 4) {
            // console.log(theX + ", " + " " + theY + ": " + aliveCellsCount);
        }
        return aliveCellsCount;
    }

    initGridBack() {
        for (let x = 0; x < gridLayers.gridBack.length; x++) {
            for (let y = 0; y < gridLayers.gridBack.length; y++) {
                gridLayers.gridBack[x][y] = { ...cell };
                if (x == 0 || y == 0 || x == gridLayers.gridBack.length - 1 || y == gridLayers.gridBack.length - 1) {
                    gridLayers.gridBack[x][y].alive = false;
                }

            }
        }
        return gridLayers.gridBack;
    }

    testRandomLife() {
        for (let x = 0; x < gridLayers.gridBack.length; x++) {
            for (let y = 0; y < gridLayers.gridBack.length; y++) {
                let aliveChance = Math.random();
                if (aliveChance > 0.5) {
                    gridLayers.gridBack[x][y].alive = true;
                } else {
                    gridLayers.gridBack[x][y].alive = false;
                }
                if (x == 0 || y == 0 || x == gridLayers.gridBack.length - 1 || y == gridLayers.gridBack.length - 1) {
                    gridLayers.gridBack[x][y].alive = false;
                }

            }
        }
    }

    clicked = false;
    continue = true;
    tick = 0;
    update() {
        document.getElementById("myIterateButton").addEventListener("click", function () {
            MyAutomata.clicked = true;
            MyAutomata.continue = false;
        })
        document.getElementById("myContinueButton").addEventListener("click", function () {
            MyAutomata.continue = true;
        })
        if (MyAutomata.clicked || MyAutomata.continue) {
            MyAutomata.clicked = false;

            this.tick++;
            document.getElementById("ticks").textContent = "Ticks: " + this.tick;
            // this.initGridBack();
            // Test that cells are acurately set to live and die randomly.
            // this.testRandomLife();

            this.updateGridFront();
            // this.initGridFront();
            // To flash all cells as the same random color for each tick.
            // this.randomColors();
            this.i++;
            this.cycleColors();
        } else {
            MyAutomata.clicked = false;
            MyAutomata.continue = false;
        }
    }

    randomColors() {
        this.R = Math.floor(Math.random() * 256);
        this.G = Math.floor(Math.random() * 256);
        this.B = Math.floor(Math.random() * 256);
        return `rgb(${this.R}, ${this.G}, ${this.B})`;
    }

    draw(ctx) {
        let ctx2 = ctx;

        for (let x = 0; x < gridLayers.gridFront.length; x++) {
            for (let y = 0; y < gridLayers.gridFront.length; y++) {

                if (gridLayers.gridBack[x][y].alive) {
                    // To use indvidual R G and B colors cycle
                    ctx2.fillStyle = "Yellow";
                    // To use random colors.
                    // ctx.fillStyle = this.randomColors();
                    ctx2.fillRect(x * cell.width + 10, y * cell.width + 10, cell.width, cell.height);
                }
                if (gridLayers.gridFront[x][y].alive) {
                    // To use indvidual R G and B colors cycle
                    ctx.fillStyle = `rgb(${this.R}, ${this.G}, ${this.B})`;
                    // To use random colors.
                    // ctx.fillStyle = this.randomColors();
                    ctx.fillRect(x * cell.width + 5, y * cell.width + 5, cell.width, cell.height);
                }
                this.drawGridOutline(ctx, x, y);

            }
        }
    }


    cycleColors() {
        if (this.i > 255) {
            this.i = 0
            this.R = 0;
            this.G = 0;
            this.B = 0;
            this.countCycles++;
        }

        if (this.countCycles == 0) {
            this.R++;

        }
        if (this.countCycles == 1) {
            this.G++;
            this.R = 0;

        }
        if (this.countCycles == 2) {
            this.B++;
            this.G = 0;
        }
        if (this.countCycles == 3) {
            this.R++;
            this.G++;
            this.B = 0;
        }
        if (this.countCycles == 4) {
            this.R++;
            this.B++;
            this.G = 0;
        }
        if (this.countCycles == 5) {
            this.G++;
            this.B++;
            this.R = 0;
        }
        if (this.countCycles == 6) {
            this.R++;
            this.G++;
            this.B++;
        }
        if (this.countCycles > 2) {
            this.countCycles = 0;
        }

    }

    getCurrentRGB(colorFlowType) {
        if (colorFlowType == "Random") {

        }
        let R = Math.floor(Math.random() * 256);
        let G = Math.floor(Math.random() * 256);
        let B = Math.floor(Math.random() * 256);
    }

    drawGridOutline(ctx, x, y) {

        ctx.strokeStyle = "Black";
        ctx.lineWidth = 1;

        ctx.fillStyle = "Blue"
        ctx.font = "25px Arial"
        ctx.fillText("(" + x + ",", x * cell.width + 5, y * cell.width + 35);
        ctx.fillText("  " + y + ")", x * cell.width + 20, y * cell.width + 35);

        ctx.strokeRect(x * cell.width + 5, y * cell.width + 5, cell.width, cell.height)
    }
}
