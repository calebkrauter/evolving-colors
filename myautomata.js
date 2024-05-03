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
        this.testRandomLife();
        this.initGridFront();
    }

    initGridFront() {
        for (let x = 0; x < gridLayers.gridBack.length; x++) {
            for (let y = 0; y < gridLayers.gridBack.length; y++) {
                gridLayers.gridFront[x][y] = { ...gridLayers.gridBack[x][y] };
            }
        }
        return gridLayers.gridFront;

    }
    initGridBack() {
        for (let x = 0; x < gridLayers.gridBack.length; x++) {
            for (let y = 0; y < gridLayers.gridBack.length; y++) {
                gridLayers.gridBack[x][y] = { ...cell };

            }
        }
        return gridLayers.gridBack;
    }

    // updateGridFront() {

    //     for (let x = 0; x < gridLayers.gridBack.width; x++) {
    //         console.log("Hi")

    //         for (let y = 0; y < gridLayers.gridBack.height; y++) {

    //             if ((x + 1) < gridLayers.gridBack.width && gridLayers.gridBack[x + 1][y].alive) {
    //                 gridLayers.gridFront[x + 1][y].alive = false;
    //                 console.log("Hi")
    //             }

    //         }

    //     }


    // }

    testRandomLife() {
        for (let x = 0; x < gridLayers.gridBack.length; x++) {
            for (let y = 0; y < gridLayers.gridBack.length; y++) {
                let aliveChance = Math.random();
                if (aliveChance > 0.5) {
                    gridLayers.gridBack[x][y].alive = true;
                } else {
                    gridLayers.gridBack[x][y].alive = false;
                }


            }
        }
    }

    updateGrid2WithRules() {
        for (let x = 0; x < gridLayers.gridBack.length; x++) {
            for (let y = 0; y < gridLayers.gridBack.length; y++) {
                if (gridLayers.gridBack[x][y].alive) {
                    gridLayers.gridFront[x][y].alive = true;
                }

            }
        }
    }
    update() {
        // this.initGridBack();
        // Test that cells are acurately set to live and die randomly.
        this.testRandomLife();

        this.initGridFront();
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
