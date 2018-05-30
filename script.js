/*
    random[R/G/B] - generated R/G/B values (0...255)
    randomColorHex - generated R/G/B in HEX
    current[R/G/B] - current R/G/B values (0...255)
    currentColorHex - current R/G/B in HEX
    difference[R/G/B] - difference between generated and current R/G/B values (in degrees)
    percentageTotal - total difference between generated and current R/G/B values (in perentage)
*/

orientationDefined = false //for saving compass heading on first page load
normalizeAlpha = false //for normalizing compass heading if comppass bug happened
showHints = false //for toggling hints

window.onload = function() {
    
    //generate random color HEX
    randomColorR = Math.floor(Math.random() * (255 + 1))
    randomColorG = Math.floor(Math.random() * (255 + 1))
    randomColorB = Math.floor(Math.random() * (255 + 1))
    randomColorHex =
        ("00" + randomColorR.toString(16)).slice(-2) +
        ("00" + randomColorG.toString(16)).slice(-2) +
        ("00" + randomColorB.toString(16)).slice(-2)
    document.getElementById("generatedColor").style.backgroundColor = "#" + randomColorHex
    
    window.addEventListener('deviceorientation', deviceOrientation) //update device orientation
    window.addEventListener('touchstart', function() {showHints = !showHints}) //listen for touch to enable hints
}

function deviceOrientation(eventData) {
    
    //get eventData
    currentBeta = Math.floor(eventData.beta)
    currentGamma = Math.floor(eventData.gamma)
    currentAlpha = Math.floor(eventData.alpha)
    
    //check if values out of bounds
    currentAlpha = currentAlpha < 180 ? currentAlpha + 180 : currentAlpha
    currentAlpha = currentAlpha > 180 ? currentAlpha - 180 : currentAlpha
    
    //runs on first load to save starting position and catch bugs
    if (orientationDefined === false) {
        originalAlpha = currentAlpha
        if (originalAlpha < 135) {
            originalAlpha += 90
            normalizeAlpha = true
        }
        originalAlpha = (
            currentBeta === 359 || currentBeta === 0 || currentBeta === 1
            ? originalAlpha + 45
            : originalAlpha
        )
        orientationDefined = true
    }
    
    //if alpha needs to be normalized
    currentAlpha = normalizeAlpha === true ? currentAlpha + 90 : currentAlpha
    
    //calculate RED
    currentColorR = (
        -45 < currentBeta && currentBeta < 45
        ? Math.floor((currentBeta + 44) / 88 * 255)
        : (
            currentColorR =
            currentBeta <= -45
            ? 0 :
            255
        )
    )
    
    //calculate GREEN
    currentColorG = (
        -45 < currentGamma && currentGamma < 45
        ? Math.floor((currentGamma + 44) / 88 * 255)
        : (
            currentColorG =
            currentGamma <= -45
            ? 0 :
            255
        )
    )
    
    //calculate BLUE
    currentColorB = (
        1 <= currentAlpha && currentAlpha <= 90
        ? Math.floor(((currentAlpha * -1 + 90) - 45) / 90 * 255)
        : currentAlpha
    )
    currentColorB = (
        90 < currentAlpha && currentAlpha <= 180
        ? Math.floor(((currentAlpha * -1 + 270) - 45) / 90 * 255)
        : currentColorB
    )
    //if left tilting bug happened
    currentColorB = (
        currentAlpha > 180
        ? Math.floor((currentAlpha * -1 + 225) * 2 / 90 * 127)
        : currentColorB
    )
    
    //check if colors out of bounds
    currentColorB = currentColorB < 0 ? 0 : currentColorB
    currentColorB = currentColorB > 255 ? 255 : currentColorB
    
    //RGB to HEX
    currentColorHex =
        ("00" + currentColorR.toString(16)).slice(-2) +
        ("00" + currentColorG.toString(16)).slice(-2) +
        ("00" + currentColorB.toString(16)).slice(-2)
    
    //update background color
    document.getElementById("currentColor").style.backgroundColor = "#" + currentColorHex
    
    differenceR = randomColorR - currentColorR
    differenceR = differenceR < 0 ? differenceR * -1 : differenceR
    
    differenceG = randomColorG - currentColorG
    differenceG = differenceG < 0 ? differenceG * -1 : differenceG
    
    differenceB = randomColorB - currentColorB
    differenceB = differenceB < 0 ? differenceB * -1 : differenceB
    
    percentageTotal = Math.floor(((100 - ((differenceR * (100/360)) + (differenceG * (100/360)) + (differenceB * (100/360))) / 3) - 29) / 71 * 102)
    
    //change circle size
    if (percentageTotal < 10) {
        document.getElementById("percentage").style.width = "50px"
        document.getElementById("percentage").style.height = "50px"
        document.getElementById("percentage").style.lineHeight = "50px"
    } else if (percentageTotal > 99) {
        document.getElementById("percentage").style.width = "90px"
        document.getElementById("percentage").style.height = "90px"
        document.getElementById("percentage").style.lineHeight = "90px"
    } else {
        document.getElementById("percentage").style.width = "70px"
        document.getElementById("percentage").style.height = "70px"
        document.getElementById("percentage").style.lineHeight = "70px"
    }
    
    //display percentage
    document.getElementById("percentage").innerHTML = percentageTotal + "%"
    
    //display hint
    if (showHints === true) {
        document.getElementById("generatedColor").innerHTML =
            "HEX:" + "<br>" +
            randomColorHex +
            "<br><br>" +
            "R: " + randomColorR +
            "<br>" +
            "G: " + randomColorG +
            "<br>" +
            "B: " + randomColorB

        document.getElementById("currentColor").innerHTML =
            "HEX:" + "<br>" +
            currentColorHex +
            "<br><br>" +
            "R: " + currentColorR +
            "<br>" +
            "G: " + currentColorG +
            "<br>" +
            "B: " + currentColorB
    } else {
        document.getElementById("generatedColor").innerHTML = ""
        document.getElementById("currentColor").innerHTML = ""
    }
    
    //next level
    if (percentageTotal > 97) {
        location.reload()
    }
}