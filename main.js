var img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects" ; 
    console.log("START is Started");
}

function modelLoaded() {
    console.log("model is loaded");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
        console.log(results);
        objects = results;

}

function draw() {
    image(video,0,0,380,380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("noo").innerHTML = "Number of objects detected are "+objects.length;
            fill(r,g,b);
            percent = Math.floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent +"%",objects[i].x+4,objects[i].y+12);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);           
        }
    }
}

