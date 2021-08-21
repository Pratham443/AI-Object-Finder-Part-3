status = "";
object = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    objectDetector.detect(video, gotResult);
    object = document.getElementById("object_name").value
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status != "") {
        for(i = 0; i < objects.length; i++) {
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == object) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = object + " detected";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object + " detected");
                synth.speak(utterThis);
            }

            else {
                document.getElementById("status").innerHTML = object + " not detected";
            }
        }
    }
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }

    objects = results;
}