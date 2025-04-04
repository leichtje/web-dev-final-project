function getWinningLines(gridSize){
    const lines = [];

    //horizontal lines
    for(let row = 0; row < gridSize; row++){
        const rowLine = [];
        for(let col = 0; col < gridSize; col ++){
            rowLine.push(row * gridSize + col)
        }
        lines.push(rowLine)
    }
    //vertical lines
    for(let col = 0; col < gridSize; col++){
        const colLine = [];
        for(let row = 0; row < gridSize; row ++){
            colLine.push(row * gridSize + col)
        }
        lines.push(colLine)
    }
    const leftDiag = [];
    for (let i = 0; i < gridSize; i++){
        leftDiag.push(i * gridSize + i);
    }
    lines.push(leftDiag);

    const rightDiag = [];
    for (let i = 0; i < gridSize; i++){
        rightDiag.push(i * gridSize + (gridSize - 1 - i))
    }
    lines.push(rightDiag);

    return lines
}
export function checkWinningLines(gridSize, squares){
    const lines = getWinningLines(gridSize);

    for (const line of lines){
        const lineValues = line.map((index) => squares[index]);
        if (lineValues.every((val) => val && val === lineValues[0])){
            return lineValues[0]
        }
    }
}