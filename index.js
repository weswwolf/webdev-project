window.addEventListener('message', function (event) {
    const message = event.data;
    console.log(message);
});

window.addEventListener('resize', resizeInputs);

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


function scrollToSection(event, section, offset) {
    event.preventDefault();
    var target_position = document.querySelector(section).offsetTop - offset
    window.scrollTo({
        top: target_position,
        behavior: 'smooth'
    });
}

function resizeInputs() {
    const name_input = document.getElementById('name');
    const email_input = document.getElementById('email');
    const message_input = document.getElementById('message');
    const window_size = window.innerWidth;

    if (window_size < 414) {
        name_input.setAttribute('size', '15');
        email_input.setAttribute('size', '15');
        message_input.setAttribute('cols', '15');
        return;
    }
    if (window_size < 700) {
        name_input.setAttribute('size', '30');
        email_input.setAttribute('size', '30');
        message_input.setAttribute('cols', '30');
        return;
    }
    name_input.setAttribute('size', '45');
    email_input.setAttribute('size', '45');
    message_input.setAttribute('cols', '45');
    return;
}

resizeInputs();