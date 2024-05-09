const cell = {
    alive: false,
    width: 10,
    height: 10,
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
    gridBack: Array.from({ length: 100 }, () => Array.from({ length: 100 }, () => 0)),
    gridFront: Array.from({ length: 100 }, () => Array.from({ length: 100 }, () => 0)),
    gridWidth: 100,
    gridHeight: 100
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
        this.initGridBack();
        // Test that cells are acurately set to live and die randomly.
        // this.testRandomLife();
        this.testAFewCells();
        this.initGridFront();
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
        for (let x = 0; x < gridLayers.gridBack.length; x++) {
            for (let y = 0; y < gridLayers.gridBack.length; y++) {
                gridLayers.gridFront[x][y] = { ...gridLayers.gridBack[x][y] };
            }
        }
        return gridLayers.gridFront;

    }
    updateGridFront() {
        for (let x = 1; x < gridLayers.gridBack.length - 1; x++) {
            for (let y = 1; y < gridLayers.gridBack.length - 1; y++) {
                // Check rules and update gridFront based on gridBack.
                // xy 
                // gridLayers.gridFront[x][y] = { ...gridLayers.gridBack[x][y] };
                // take a snapshot of current surounding 8 cells. Count how many are living.
                let suroundingAliveCells = this.snapshotOfNeighborhood(x, y);
                // let suroundingAliveCells = 2;

                if (gridLayers.gridBack[x][y].alive && (suroundingAliveCells < 2 || suroundingAliveCells > 3)) {
                    gridLayers.gridFront[x][y].alive = false;
                }
                if (gridLayers.gridBack[x][y].alive && suroundingAliveCells == 2) {
                    gridLayers.gridFront[x][y].alive = true;
                }
                if (suroundingAliveCells == 3) {
                    gridLayers.gridFront[x][y].alive = true;
                }
            }
        }
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
        }
        if (gridLayers.gridBack[theX][theY - 1].alive) {
            aliveCellsCount++;
        }
        if (gridLayers.gridBack[theX + 1][theY - 1].alive) {
            aliveCellsCount++;
        }
        if (gridLayers.gridBack[theX - 1][theY].alive) {
            aliveCellsCount++;
        }
        if (gridLayers.gridBack[theX + 1][theY].alive) {
            aliveCellsCount++;
        }
        if (gridLayers.gridBack[theX - 1][theY + 1].alive) {
            aliveCellsCount++;
        }
        if (gridLayers.gridBack[theX][theY + 1].alive) {
            aliveCellsCount++;
        }
        if (gridLayers.gridBack[theX + 1][theY + 1].alive) {
            aliveCellsCount++;
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

    update() {
        // this.initGridBack();
        // Test that cells are acurately set to live and die randomly.
        // this.testRandomLife();
        gridLayers.gridBack = this.updateGridFront();
        // this.initGridFront();
        // To flash all cells as the same random color for each tick.
        // this.randomColors();
        this.i++;
        this.cycleColors();
    }

    randomColors() {
        this.R = Math.floor(Math.random() * 256);
        this.G = Math.floor(Math.random() * 256);
        this.B = Math.floor(Math.random() * 256);
        return `rgb(${this.R}, ${this.G}, ${this.B})`;
    }

    draw(ctx) {

        for (let x = 0; x < gridLayers.gridFront.length; x++) {
            for (let y = 0; y < gridLayers.gridFront.length; y++) {

                this.drawGridOutline(ctx, x, y);

                if (gridLayers.gridFront[x][y].alive) {
                    // To use indvidual R G and B colors cycle
                    ctx.fillStyle = `rgb(${this.R}, ${this.G}, ${this.B})`;
                    // To use random colors.
                    // ctx.fillStyle = this.randomColors();
                    ctx.fillRect(x * cell.width + 5, y * cell.width + 5, cell.width, cell.height);
                }

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
        ctx.strokeRect(x * cell.width + 5, y * cell.width + 5, cell.width, cell.height)
    }
}
