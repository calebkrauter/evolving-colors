/**
 * @author Caleb Krauter
 * @version 1.0.0
 */
const scale = {
    gridSize: 50,
}


const cellDefaultState = {
    alive: false,
    width: (50 - scale.gridSize) + 10,
    height: (50 - scale.gridSize) + 10,
    animat: false,
    plant: false,
    maturity: 0,
    isMature: false,
    h: 0,
    s: 0,
    l: 0,
    numOfLivingHere: 0,
    animatsHere: [/*cellDefaultState*/],
}

const cell = {
    alive: false,
    width: (50 - scale.gridSize) + 10,
    height: (50 - scale.gridSize) + 10,
    animat: false,
    plant: false,
    maturity: 0,
    isMature: false,
    h: 0,
    s: 0,
    l: 0,
    numOfLivingHere: 0,
    animatsHere: [/*cellDefaultState*/],
}
const gridLayers = {
    gridBack: Array.from({ length: scale.gridSize }, () => Array.from({ length: scale.gridSize }, () => cell)),
    gridFront: Array.from({ length: scale.gridSize }, () => Array.from({ length: scale.gridSize }, () => cell)),
    gridWidth: scale.gridSize,
    gridHeight: scale.gridSize
}
/**
 * -x-y, x,-y
 * -x,y, x,y
 * 
 * bounds:
 * when x is 0
 * when y is 0
 * when x is length-1
 * when y is length -1
 */
const bounds = {
    north: 0,
    south: gridLayers.gridHeight,
    east: gridLayers.gridWidth,
    west: 0,
}

class MyAutomata {

    constructor(game) {
        Object.assign(this, { game });

        MyAutomata.debug = false;
        MyAutomata.debugBox = document.getElementById("debug");
        MyAutomata.gridBox = document.getElementById("grid");
        MyAutomata.chaosBox = document.getElementById("chaoticMode");
        MyAutomata.sourSkittlesBox = document.getElementById("sourSkittlesMode");
        MyAutomata.speedSlider = document.getElementById("speed");
        MyAutomata.speedSlider.value = 15;
        MyAutomata.maturitySlider = document.getElementById("maturity");
        MyAutomata.maturitySlider.value = 50;

        MyAutomata.sourSkittlesMode = false;
        MyAutomata.sourSkittlesBox.checked = false;
        MyAutomata.gridBox.checked = true;
        MyAutomata.chaosBox.checked = false;
        MyAutomata.enableGrid = true;
        MyAutomata.chaoticMode = false;
        MyAutomata.debugBox.checked = false;
        this.colorCycleIterator = 0;
        this.R = 0;
        this.G = 0;
        this.B = 0;
        this.tick = 0;
        this.count = 0;
        this.countCycles = 0;
        this.count = 0;
        this.tick = 0;
        this.canvas = document.getElementById("gameWorld");
        this.speed = parseInt(document.getElementById("speed").value, 10);
        this.maturity = parseInt(document.getElementById("maturity").value, 10);

        this.size = parseInt(document.getElementById("size").value, 10);
        this.sizeSlider = document.getElementById("size");
        this.sizeSlider.value = 50;
        scale.gridSize = 50;

        this.initGridBack();
        this.initGridFront();
        this.updateGridFront();

    }


    runPresetA() {
        gridLayers.gridBack[0][1].alive = true;
        gridLayers.gridBack[1][1].alive = true;
        gridLayers.gridBack[2][1].alive = true;
        gridLayers.gridBack[0][1].plant = true;
        gridLayers.gridBack[1][1].plant = true;
        gridLayers.gridBack[2][1].plant = true;
        gridLayers.gridBack[3][1].alive = true;
        gridLayers.gridBack[3][1].animat = true;

    }

    runPresetB() {
        gridLayers.gridBack[1][2].alive = true;
        gridLayers.gridBack[1][3].alive = true;
        gridLayers.gridBack[1][4].alive = true;
        gridLayers.gridBack[2][5].alive = true;
        gridLayers.gridBack[3][5].alive = true;
        gridLayers.gridBack[4][5].alive = true;
        gridLayers.gridBack[5][2].alive = true;
        gridLayers.gridBack[5][3].alive = true;
        gridLayers.gridBack[5][4].alive = true;
        gridLayers.gridBack[2][1].alive = true;
        gridLayers.gridBack[3][1].alive = true;
        gridLayers.gridBack[4][1].alive = true;
    }


    initGridFront() {
        for (let x = 0; x < scale.gridSize; x++) {
            for (let y = 0; y < scale.gridSize; y++) {
                gridLayers.gridFront[x][y] = structuredClone(gridLayers.gridBack[x][y]);
            }
        }
        return gridLayers.gridFront;

    }

    updateGridFront() {
        this.nextItr = true;
        for (let x = 0; x < scale.gridSize; x++) {

            for (let y = 0; y < scale.gridSize; y++) {
                let curX = x;
                let curY = y;
                // console.log(gridLayers.gridBack[curX][curY]);
                if (gridLayers.gridBack[curX][curY].alive && Math.random() < 0.01) {
                    gridLayers.gridFront[curX][curY] = structuredClone(cellDefaultState);
                }
                if (gridLayers.gridFront[curX][curY].alive) {
                    gridLayers.gridFront[curX][curY].maturity++;
                    gridLayers.gridFront[curX][curY].h = gridLayers.gridFront[curX][curY].maturity;

                }
                if (gridLayers.gridBack[curX][curY].animat && gridLayers.gridBack[curX][curY].alive) {

                    if (gridLayers.gridBack[curX][curY].animat) {

                        // TODO Update this to use a slider for animat growth
                        // TODO make sure that plants cannot override animats.
                        // console.log(gridLayers.gridFront[curX][curY].maturity);
                        if (gridLayers.gridFront[curX][curY].maturity >= MyAutomata.maturitySlider.value) {
                            let animat = true;
                            let birthedCellLocation = this.birthNewCell(curX, curY, 0, animat);
                            gridLayers.gridFront[curX][curY].h = gridLayers.gridFront[curX][curY].maturity;
                            // gridLayers.gridFront[birthedCellLocation[0]][birthedCellLocation[1]].animat = true;
                            gridLayers.gridFront[birthedCellLocation[0]][birthedCellLocation[1]].l = 50;
                            // gridLayers.gridFront[birthedCellLocation[0]][birthedCellLocation[1]] = structuredClone(cellDefaultState);
                            gridLayers.gridFront[birthedCellLocation[0]][birthedCellLocation[1]].h = gridLayers.gridFront[curX][curY].maturity;
                        } else {
                            gridLayers.gridFront[curX][curY].alive = true;
                            gridLayers.gridFront[curX][curY].animat = true;
                        }

                    }
                    if (gridLayers.gridFront[curX][curY].maturity >= 360) {
                        gridLayers.gridFront[curX][curY].maturity = 360;
                    }

                    // gridLayers.gridFront[curX][curY].animat = true;
                    gridLayers.gridFront[curX][curY].h = gridLayers.gridFront[curX][curY].maturity;
                    gridLayers.gridFront[curX][curY].l = 50;
                }
                if (gridLayers.gridBack[curX][curY].plant) {
                    // console.log("PLANT")
                    if (gridLayers.gridBack[curX][curY].alive) {
                        gridLayers.gridFront[curX][curY].alive = true;
                        // console.log("ALIVE")
                        if (gridLayers.gridFront[curX][curY].alive) {
                            if (gridLayers.gridFront[curX][curY].maturity >= MyAutomata.maturitySlider.value) {
                                let randomNewPlant = Math.floor(Math.random() * 8);
                                let birthedCellLocation = this.birthNewCell(curX, curY, randomNewPlant);
                                // gridLayers.gridFront[birthedCellLocation[0]][birthedCellLocation[1]].h = 1 + MyAutomata.maturitySlider.value * (360 - 1);
                                // if (!gridLayers.gridFront[birthedCellLocation[0]][birthedCellLocation[1]].animat) {

                                //     gridLayers.gridFront[birthedCellLocation[0]][birthedCellLocation[1]].plant = true;
                                // }

                            } else {
                                // gridLayers.gridFront[curX][curY].s = gridLayers.gridFront[curX][curY].maturity;

                            }
                            if (gridLayers.gridFront[curX][curY].maturity >= 360) {
                                gridLayers.gridFront[curX][curY].maturity = 360;
                            }

                            gridLayers.gridFront[curX][curY].plant = true;
                            gridLayers.gridFront[curX][curY].h = gridLayers.gridFront[curX][curY].maturity;
                            gridLayers.gridFront[curX][curY].l = 50;
                        }
                    }
                }
                if (gridLayers.gridFront[curX][curY].plant && gridLayers.gridFront[curX][curY].animat) {
                    gridLayers.gridFront[curX][curY].plant = false;
                }
            }

        }
        gridLayers.gridBack = structuredClone(gridLayers.gridFront);
        return gridLayers.gridFront;
    }

    /*
     * For wrap around just use mod operator. Do current index mod length. 
     */
    snapshotOfNeighborhood(theX, theY) {
        let aliveCellsCount = 0;
        // console.log(gridLayers.gridWidth)
        if (gridLayers.gridBack[this.getWrapAroundVal(theX - 1)][this.getWrapAroundVal(theY - 1)].alive) {
            aliveCellsCount++;
        }
        if (gridLayers.gridBack[this.getWrapAroundVal(theX)][this.getWrapAroundVal(theY - 1)].alive) {
            aliveCellsCount++;
        }
        if (gridLayers.gridBack[this.getWrapAroundVal(theX + 1)][this.getWrapAroundVal(theY - 1)].alive) {
            aliveCellsCount++;
        }
        if (gridLayers.gridBack[this.getWrapAroundVal(theX - 1)][this.getWrapAroundVal(theY)].alive) {
            aliveCellsCount++;
        }
        if (gridLayers.gridBack[this.getWrapAroundVal(theX + 1)][this.getWrapAroundVal(theY)].alive) {
            aliveCellsCount++;
        }
        if (gridLayers.gridBack[this.getWrapAroundVal(theX - 1)][this.getWrapAroundVal(theY + 1)].alive) {
            aliveCellsCount++;
        }
        if (gridLayers.gridBack[this.getWrapAroundVal(theX)][this.getWrapAroundVal(theY + 1)].alive) {
            aliveCellsCount++;
        }
        if (gridLayers.gridBack[this.getWrapAroundVal(theX + 1)][this.getWrapAroundVal(theY + 1)].alive) {
            aliveCellsCount++;
        }
        return aliveCellsCount;
    }
    birthNewCell(theX, theY, theNeighbor, animat = false) {
        let birthLocation = [];
        let delta = 360;
        let curDelta = 0;
        let curCellHue = gridLayers.gridBack[theX][theY].h;
        // console.log(curCellHue - gridLayers.gridBack[this.getWrapAroundVal(theX - 1)][this.getWrapAroundVal(theY - 1)].h);
        let deltas = [];
        let size = 0;
        if (animat === true) {
            if (gridLayers.gridBack[this.getWrapAroundVal(theX - 1)][this.getWrapAroundVal(theY - 1)].alive) {
                size++;
                curDelta = Math.abs(curCellHue - gridLayers.gridBack[this.getWrapAroundVal(theX - 1)][this.getWrapAroundVal(theY - 1)].h);
                // delta = curDelta < delta ? curDelta : delta;
                deltas.push(curDelta);
                theNeighbor = deltas.indexOf((Math.min(...deltas)));
            }
            if (gridLayers.gridBack[this.getWrapAroundVal(theX)][this.getWrapAroundVal(theY - 1)].alive) {
                size++;

                curDelta = Math.abs(curCellHue - gridLayers.gridBack[this.getWrapAroundVal(theX)][this.getWrapAroundVal(theY - 1)].h);

                // delta = curDelta < delta ? curDelta : delta;
                deltas.push(curDelta);
                theNeighbor = deltas.indexOf((Math.min(...deltas)));
            }
            if (gridLayers.gridBack[this.getWrapAroundVal(theX + 1)][this.getWrapAroundVal(theY - 1)].alive) {
                size++;

                curDelta = Math.abs(curCellHue - gridLayers.gridBack[this.getWrapAroundVal(theX + 1)][this.getWrapAroundVal(theY - 1)].h);

                // delta = curDelta < delta ? curDelta : delta;
                deltas.push(curDelta);
                theNeighbor = deltas.indexOf((Math.min(...deltas)));
            }
            if (gridLayers.gridBack[this.getWrapAroundVal(theX - 1)][this.getWrapAroundVal(theY)].alive) {
                size++;

                curDelta = Math.abs(curCellHue - gridLayers.gridBack[this.getWrapAroundVal(theX - 1)][this.getWrapAroundVal(theY)].h);

                // delta = curDelta < delta ? curDelta : delta;
                deltas.push(curDelta);
                theNeighbor = deltas.indexOf((Math.min(...deltas)));
            }
            if (gridLayers.gridBack[this.getWrapAroundVal(theX + 1)][this.getWrapAroundVal(theY)].alive) {
                size++;

                curDelta = Math.abs(curCellHue - gridLayers.gridBack[this.getWrapAroundVal(theX + 1)][this.getWrapAroundVal(theY)].h);

                // delta = curDelta < delta ? curDelta : delta;
                deltas.push(curDelta);
                theNeighbor = deltas.indexOf((Math.min(...deltas)));
            }
            if (gridLayers.gridBack[this.getWrapAroundVal(theX - 1)][this.getWrapAroundVal(theY + 1)].alive) {
                size++;

                curDelta = Math.abs(curCellHue - gridLayers.gridBack[this.getWrapAroundVal(theX - 1)][this.getWrapAroundVal(theY + 1)].h);

                // delta = curDelta < delta ? curDelta : delta;
                deltas.push(curDelta);
                theNeighbor = deltas.indexOf((Math.min(...deltas)));
            }
            if (gridLayers.gridBack[this.getWrapAroundVal(theX)][this.getWrapAroundVal(theY + 1)].alive) {
                size++;

                curDelta = Math.abs(curCellHue - gridLayers.gridBack[this.getWrapAroundVal(theX)][this.getWrapAroundVal(theY + 1)].h);

                // delta = curDelta < delta ? curDelta : delta;
                deltas.push(curDelta);
                theNeighbor = deltas.indexOf((Math.min(...deltas)));
            }
            if (gridLayers.gridBack[this.getWrapAroundVal(theX + 1)][this.getWrapAroundVal(theY + 1)].alive) {
                size++;

                curDelta = Math.abs(curCellHue - gridLayers.gridBack[this.getWrapAroundVal(theX + 1)][this.getWrapAroundVal(theY + 1)].h);

                // delta = curDelta < delta ? curDelta : delta;
                deltas.push(curDelta);
                theNeighbor = deltas.indexOf((Math.min(...deltas)));
            }
        }
        // for (let k = 0; k < size; k++) {
        //     console.log(deltas[k]);

        // }
        // theNeighbor = deltas.indexOf((Math.min(...deltas)));
        switch (theNeighbor) {
            case 0:
                birthLocation = [this.getWrapAroundVal(theX - 1), this.getWrapAroundVal(theY - 1)];
                // gridLayers.gridBack[this.getWrapAroundVal(theX - 1)][this.getWrapAroundVal(theY - 1)] = structuredClone(cellDefaultState);
                break;
            case 1:
                birthLocation = [this.getWrapAroundVal(theX), this.getWrapAroundVal(theY - 1)];
                // gridLayers.gridBack[this.getWrapAroundVal(theX)][this.getWrapAroundVal(theY - 1)] = structuredClone(cellDefaultState);
                break;
            case 2:
                birthLocation = [this.getWrapAroundVal(theX + 1), this.getWrapAroundVal(theY - 1)];
                // gridLayers.gridBack[this.getWrapAroundVal(theX + 1)][this.getWrapAroundVal(theY - 1)] = structuredClone(cellDefaultState);
                break;
            case 3:
                birthLocation = [this.getWrapAroundVal(theX - 1), this.getWrapAroundVal(theY)];
                // gridLayers.gridBack[this.getWrapAroundVal(theX - 1)][this.getWrapAroundVal(theY)] = structuredClone(cellDefaultState);
                break;
            case 4:
                birthLocation = [this.getWrapAroundVal(theX + 1), this.getWrapAroundVal(theY)];
                // gridLayers.gridBack[this.getWrapAroundVal(theX + 1)][this.getWrapAroundVal(theY)] = structuredClone(cellDefaultState);
                break;
            case 5:
                birthLocation = [this.getWrapAroundVal(theX - 1), this.getWrapAroundVal(theY + 1)];
                // gridLayers.gridBack[this.getWrapAroundVal(theX - 1)][this.getWrapAroundVal(theY + 1)] = structuredClone(cellDefaultState);
                break;
            case 6:
                birthLocation = [this.getWrapAroundVal(theX), this.getWrapAroundVal(theY + 1)];
                // gridLayers.gridBack[this.getWrapAroundVal(theX)][this.getWrapAroundVal(theY + 1)] = structuredClone(cellDefaultState);
                break;
            case 7:
                birthLocation = [this.getWrapAroundVal(theX + 1), this.getWrapAroundVal(theY + 1)];
                // gridLayers.gridBack[this.getWrapAroundVal(theX + 1)][this.getWrapAroundVal(theY + 1)] = structuredClone(cellDefaultState);
                break;
        }
        if (animat) {
            gridLayers.gridBack[birthLocation[0]][birthLocation[1]].plant = false;
            gridLayers.gridBack[birthLocation[0]][birthLocation[1]].alive = false;
            gridLayers.gridBack[birthLocation[0]][birthLocation[1]] = structuredClone(cellDefaultState);
            gridLayers.gridFront[birthLocation[0]][birthLocation[1]] = structuredClone(cellDefaultState);
            gridLayers.gridBack[theX][theY] = structuredClone(cellDefaultState);
            gridLayers.gridFront[theX][theY] = structuredClone(cellDefaultState);
            gridLayers.gridBack[birthLocation[0]][birthLocation[1]].alive = true;
            gridLayers.gridBack[birthLocation[0]][birthLocation[1]].animat = true;
            gridLayers.gridFront[birthLocation[0]][birthLocation[1]].s = gridLayers.gridFront[theX][theY].s + 1;

        }
        if (!gridLayers.gridBack[birthLocation[0]][birthLocation[1]].animat && !animat) {
            gridLayers.gridBack[birthLocation[0]][birthLocation[1]].alive = true;
            gridLayers.gridFront[birthLocation[0]][birthLocation[1]].alive = true;
            gridLayers.gridFront[birthLocation[0]][birthLocation[1]].plant = true;
            gridLayers.gridFront[birthLocation[0]][birthLocation[1]].s = gridLayers.gridFront[theX][theY].s + 1;
        }
        return birthLocation;
    }

    getWrapAroundVal(theCurVal) {
        // console.log(theCurVal % gridLayers.gridWidth + " gridlayerwidth " + gridLayers.gridWidth + " curVal " + theCurVal)
        return ((theCurVal % scale.gridSize) + scale.gridSize) % scale.gridSize;
    }
    initGridBack() {
        for (let x = 0; x < scale.gridSize; x++) {
            for (let y = 0; y < scale.gridSize; y++) {
                gridLayers.gridBack[x][y] = structuredClone(cellDefaultState);
            }
        }
        return gridLayers.gridBack;
    }

    testRandomLife() {
        for (let x = 0; x < scale.gridSize; x++) {
            for (let y = 0; y < scale.gridSize; y++) {
                let aliveChance = Math.random();
                let aliveChanceAnimat = Math.random();
                if (aliveChance > 0.5 && !gridLayers.gridBack[x][y].animat) {
                    gridLayers.gridBack[x][y].alive = true;
                    gridLayers.gridBack[x][y].plant = true;

                } else {
                    gridLayers.gridBack[x][y].alive = structuredClone(cellDefaultState);
                }
                if (aliveChanceAnimat > 0.5) {
                    gridLayers.gridBack[x][y].alive = true;
                    gridLayers.gridBack[x][y].animat = true;

                } else {
                    gridLayers.gridBack[x][y].alive = structuredClone(cellDefaultState);
                }
            }
        }
    }

    getNewGrid() {
        let newGridBack = Array.from({ length: scale.gridSize }, () => Array.from({ length: scale.gridSize }, () => cell));
        let newGridFront = Array.from({ length: scale.gridSize }, () => Array.from({ length: scale.gridSize }, () => cell));
        for (let x = 0; x < scale.gridSize; x++) {
            for (let y = 0; y < scale.gridSize; y++) {
                if (gridLayers.gridBack[x] === undefined || gridLayers.gridBack[x][y] === undefined) {
                    newGridBack[x][y] = (cellDefaultState);
                    newGridFront[x][y] = (cellDefaultState);
                } else {
                    newGridBack[x][y] = (gridLayers.gridBack[x][y]);
                    newGridFront[x][y] = (gridLayers.gridFront[x][y]);
                }
            }
        }
        gridLayers.gridBack = (newGridBack);
        gridLayers.gridFront = (newGridFront);
        return [newGridBack, newGridFront];
    }

    update() {
        this.listenToUserInput();
        this.speed = parseInt(document.getElementById("speed").value, 10);
        this.maturity = parseInt(document.getElementById("maturity").value, 10);

        this.size = parseInt(document.getElementById("size").value, 10);
        scale.gridSize = this.size;

        document.getElementById("sizeLabel").textContent = "(" + scale.gridSize + "X" + scale.gridSize + ")";

        gridLayers.gridBack = structuredClone(this.getNewGrid()[0]);
        gridLayers.gridFront = structuredClone(this.getNewGrid()[1]);
        let i = scale.gridSize;
        MyAutomata.scaleOffset = 0;
        for (let x = 0; x < scale.gridSize; x++) {
            for (let y = 0; y < scale.gridSize; y++) {
                (gridLayers.gridFront[x][y]).width = (50 - scale.gridSize) + 10;
                (gridLayers.gridFront[x][y]).height = (50 - scale.gridSize) + 10;
                (gridLayers.gridBack[x][y]).width = (50 - scale.gridSize) + 10;
                (gridLayers.gridBack[x][y]).height = (50 - scale.gridSize) + 10;
            }

        }

        if (MyAutomata.clicked || MyAutomata.continue) {
            if ((this.count++ >= this.speed && this.speed != 120) || MyAutomata.clicked) {
                if (MyAutomata.startRandomLife) {
                    this.testRandomLife();
                    MyAutomata.startRandomLife = false;
                }
                if (MyAutomata.presetA) {
                    this.runPresetA();
                    MyAutomata.presetA = false;
                }
                if (MyAutomata.presetB) {
                    this.runPresetB();
                    MyAutomata.presetB = false;
                }

                this.count = 0;
                this.tick++;
                document.getElementById("ticks").textContent = "Ticks: " + this.tick;

                this.updateGridFront();

                if (MyAutomata.chaoticMode) {
                    this.randomColors();
                }
                this.colorCycleIterator++;
                this.cycleColors();
            }
            MyAutomata.clicked = false;

        } else {
            MyAutomata.clicked = false;
            MyAutomata.continue = false;
        }
    }
    listenToUserInput() {
        document.getElementById("myIterateButton").addEventListener("click", function () {
            MyAutomata.clicked = true;
            MyAutomata.continue = false;
        });
        document.getElementById("myContinueButton").addEventListener("click", function () {
            MyAutomata.continue = true;
        });
        document.getElementById("randomLifeButton").addEventListener("click", function () {
            MyAutomata.startRandomLife = true;

        })
        document.getElementById("presetA").addEventListener("click", function () {
            MyAutomata.presetA = true;
        });
        document.getElementById("presetB").addEventListener("click", function () {
            MyAutomata.presetB = true;
        });
        MyAutomata.debugBox.addEventListener("change", function () {
            MyAutomata.debug = MyAutomata.debugBox.checked ? true : false;

        })
        MyAutomata.gridBox.addEventListener("change", function () {
            MyAutomata.enableGrid = MyAutomata.gridBox.checked ? true : false;

        })
        MyAutomata.chaosBox.addEventListener("change", function () {
            MyAutomata.chaoticMode = MyAutomata.chaosBox.checked ? true : false;
        });
        MyAutomata.sourSkittlesBox.addEventListener("change", function () {
            MyAutomata.sourSkittlesMode = MyAutomata.sourSkittlesBox.checked ? true : false;
        })
    }
    randomColors() {
        this.R = Math.floor(Math.random() * 256);
        this.G = Math.floor(Math.random() * 256);
        this.B = Math.floor(Math.random() * 256);
        return `rgb(${this.R}, ${this.G}, ${this.B})`;
    }

    draw(ctx) {
        let ctx2 = ctx;

        for (let x = 0; x < scale.gridSize; x++) {
            for (let y = 0; y < scale.gridSize; y++) {

                if (MyAutomata.debug && gridLayers.gridBack[x][y].alive) {
                    // To use indvidual R G and B colors cycle
                    ctx2.fillStyle = "Yellow";
                    // To use random colors.
                    ctx2.fillRect(x * cell.width + 10, y * cell.width + 10, cell.width, cell.height);
                }
                if (gridLayers.gridFront[x][y].alive) {
                    // To use indvidual R G and B colors cycle
                    // ctx.fillStyle = `rgb(${this.R}, ${this.G}, ${this.B})`;
                    ctx.fillStyle = hsl(gridLayers.gridFront[x][y].h, gridLayers.gridFront[x][y].s, gridLayers.gridFront[x][y].l);
                    if (MyAutomata.sourSkittlesMode) {
                        ctx.fillStyle = this.randomColors();
                    }
                    // To use random colors.
                    // context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                    ctx.beginPath();
                    // if (gridLayers.gridFront[x][y].animat && gridLayers.gridFront[x][y].plant) {
                    //     gridLayers.gridFront[x][y] = structuredClone(cellDefaultState);
                    // }
                    if (gridLayers.gridFront[x][y].plant) {
                        ctx.fillRect(x * cell.width + 5, y * cell.width + 5, cell.width, cell.height);
                    }
                    if (gridLayers.gridFront[x][y].animat) {
                        ctx.arc(x * cell.width + 10, y * cell.width + 10, cell.width / 4, 0, 2 * Math.PI, false);
                    }
                    // ctx.arc(x * cell.width, y * cell.width, cell.width / 4, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.stroke();
                }
                if (MyAutomata.enableGrid) {
                    this.drawGridOutline(ctx, x, y);
                }

            }
        }
    }


    cycleColors() {
        if (this.colorCycleIterator > 255) {
            this.colorCycleIterator = 0
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

    drawGridOutline(ctx, x, y) {

        ctx.strokeStyle = "Black";
        ctx.lineWidth = 1;
        if (MyAutomata.debug) {

            ctx.fillStyle = "Blue"
            ctx.font = "25px Arial"
            ctx.fillText("(" + x + ",", x * cell.width + 5, y * cell.width + 35);
            ctx.fillText("  " + y + ")", x * cell.width + 20, y * cell.width + 35);
        }

        ctx.strokeRect(x * cell.width + 5, y * cell.width + 5, cell.width, cell.height)
    }
}
