
const sounds = {
    click: new Audio("sounds/click.mp3")
};

function playSound(name) {
    const sound = sounds[name];

    if (!sound) {
        return;
    }

    sound.pause();
    sound.currentTime = 0;
    sound.play().catch(function (error) {
        console.log("Sound could not play:", error);
    });
}
