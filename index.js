const colorPicker = document.getElementById("color-picker")
const numberPicker = document.getElementById("number-picker")
const numberDiv = document.getElementById("number-number")
const truePicker = document.getElementById("true-picker")
const pickerPreview = document.getElementById("picker-preview")
const bestColorsDiv = document.getElementById("best-colors")



function seperateHex(val) {
    const red = parseInt(`0x${val.slice(0, 2)}`,16)
    const green = parseInt(`0x${val.slice(2, 4)}`,16)
    const blue = parseInt(`0x${val.slice(4)}`,16)
    return { red, green, blue }
} 

function evaluatePantone() {

    const pickedColor = seperateHex(colorPicker.value)

    const bestColors = [{diff: parseFloat("Infinity")}]

    Object.keys(pantoneNumbers).forEach(key => {
        const color = pantoneNumbers[key] 
        const compColor = seperateHex(color.hex)

        const redDiff = Math.abs(pickedColor.red - compColor.red )
        const greenDiff = Math.abs(pickedColor.green - compColor.green )
        const blueDiff = Math.abs(pickedColor.blue - compColor.blue )

        const totalDiff = redDiff + greenDiff + blueDiff

        let i = 0
        while (i < bestColors.length) {
            const bestC = bestColors[i]
            if(bestC.diff > totalDiff) {
                bestColors.splice(i, 0, {diff: totalDiff, color: {...color, code: key}})
                i = numberPicker.value + 1 
            }
            i++
        }
        if(bestColors.length > numberPicker.value) {
            bestColors.splice(numberPicker.value)
        }
        
        
    })
    return bestColors
}

function createBox(color) {
    const box = document.createElement("div")    
    box.classList.add("preview")
    box.style.backgroundColor = `#${color.hex}`
    const nameSpan = document.createElement("span")
    nameSpan.innerHTML = color.name

    const hexSpan = document.createElement("span")
    hexSpan.innerHTML = color.hex

    const codeSpan = document.createElement("span")
    codeSpan.innerHTML = color.code
    box.appendChild(nameSpan)
    box.appendChild(hexSpan)
    box.appendChild(codeSpan)
    return box
}

function drawColors(bestColors) {
    bestColorsDiv.innerHTML = ""
    bestColors.forEach(color => {
        const box = createBox(color.color)
        bestColorsDiv.appendChild(box)
    })
}


function mainLoop() {
    if(colorPicker.value.length != 6) {
        return
    }
    truePicker.value = `#${colorPicker.value}`
    pickerPreview.style.backgroundColor = `#${colorPicker.value}`

    const bestColors = evaluatePantone()
    drawColors(bestColors)
}

function trueChange() {
    colorPicker.value = truePicker.value.slice(1)
    mainLoop()
}

function numberChange() {
    numberDiv.innerHTML = numberPicker.value
    mainLoop()
}

colorPicker.oninput = mainLoop
truePicker.oninput = trueChange
numberPicker.oninput = numberChange
console.log(Object.keys(pantoneNumbers).length)
mainLoop()