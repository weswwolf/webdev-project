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

function set_size(name, email, message, size) {
    name.setAttribute('size', size);
    email.setAttribute('size', size);
    message.setAttribute('cols', size);
}

function resizeInputs() {
    let name_input = document.getElementById('name');
    let email_input = document.getElementById('email');
    let message_input = document.getElementById('message');
    const window_size = window.innerWidth;

    if (window_size < 350) {
        set_size(name_input, email_input, message_input, 15);
    }
    else if (window_size < 414) {
        set_size(name_input, email_input, message_input, 20);
    }
    else if (window_size < 700) {
        set_size(name_input, email_input, message_input, 35);
    }
    else {
        set_size(name_input, email_input, message_input, 45);
    }
    return;
}

resizeInputs();