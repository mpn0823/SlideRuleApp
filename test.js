(() => {
    "use strict";
    const displayWidth = 7; // range of scale display
    const scaleSize = 360; // scale resolution
    const zeroArr = new Array(scaleSize).fill(0);

    // C/D scale
    const cScale = zeroArr.map((_, i, zeroArr) => Math.pow(10, i / zeroArr.length));
    const dScale = cScale;

    // S scale
    const sScale = zeroArr.map((_, i, zeroArr) => Math.asin(Math.pow(10, i / zeroArr.length) / 10) * (180 / Math.PI));

    // Slider elements
    const cSlider = document.getElementById("cSlider");
    const dSlider = document.getElementById("dSlider");
    const sSlider = document.getElementById("sSlider");

    // Adjust slider settings for given display width and add event listeners
    Array.from(document.getElementsByClassName("slider")).forEach(slider => {
        slider.setAttribute("max", scaleSize - displayWidth);
        slider.addEventListener("input", () => {
            updateDisplay();
            updatePointerDisplay();
        });
    });

    // Scale display elements
    const cDisplay = document.getElementById("cDisplay");
    const dDisplay = document.getElementById("dDisplay");
    const sDisplay = document.getElementById("sDisplay");

    updateDisplay();
    updatePointerDisplay();

    function rotateScale(n, scale) {
        return scale.slice(n, scale.length).concat(scale.slice(0, n));
    }

    function renderScale(scale, display, n) {
        scale.slice(0, n).forEach(element => {
            let th = document.createElement("th");
            if (element.toFixed(2).length === 4) th.textContent = "0" + element.toFixed(2);
            else th.textContent = element.toFixed(2);
            display.append(th);
        });
    }

    // Clears child elements from every element in given array
    function clearDisplay(displays) {
        displays.forEach(display => {
            while (display.firstChild) {
                display.removeChild(display.firstChild);
            }
        });
    }

    function updateDisplay() {
        clearDisplay([cDisplay, dDisplay, sDisplay]);
        renderScale(rotateScale(cSlider.value, cScale), cDisplay, displayWidth);
        renderScale(rotateScale(dSlider.value, dScale), dDisplay, displayWidth);
        renderScale(rotateScale(sSlider.value, sScale), sDisplay, displayWidth);
    }

    function updatePointerDisplay() {
        clearDisplay([cDisplay, dDisplay, sDisplay]);
        let cScale_ = rotateScale(cSlider.value, cScale);
        let dScale_ = rotateScale(dSlider.value, dScale);
        let sScale_ = rotateScale(sSlider.value, sScale);
        renderScale(rotateScale(pSlider.value, cScale_), cDisplay, displayWidth);
        renderScale(rotateScale(pSlider.value, dScale_), dDisplay, displayWidth);
        renderScale(rotateScale(pSlider.value, sScale_), sDisplay, displayWidth);
    }


})();