window.addEventListener('message', function (event) {
    const message = event.data;
    console.log(message);
});

// js script for index.html
function toggleBackgroundDrawing() {
    var checkbox = document.getElementById("draw-bg-checkbox");
    var iframe = document.getElementById("pong");
    iframe.contentWindow.setBackgroundDrawing(checkbox.checked);
}

function togglePerfectAI() {
    var checkbox = document.getElementById("perfect-ai-checkbox");
    var iframe = document.getElementById("pong");
    iframe.contentWindow.setPerfectAI(checkbox.checked);
}

function toggleUISlider() {
    var checkbox = document.getElementById("UI-slider-checkbox");
    var iframe = document.getElementById("pong");
    iframe.contentWindow.setUISlider(checkbox.checked);
}

function toggleAIWarfare() {
    var checkbox = document.getElementById("AI-warfare-checkbox");
    var iframe = document.getElementById("pong");
    iframe.contentWindow.setAIWarfare(checkbox.checked);
}