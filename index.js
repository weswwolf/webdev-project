// js script for index.html
function toggleBackgroundDrawing() {
    var checkbox = document.getElementById("draw-bg-checkbox");
    var iframe = document.getElementById("pong");
    iframe.contentWindow.setBackgroundDrawing(checkbox.checked);
}