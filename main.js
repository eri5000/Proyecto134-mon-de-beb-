song="";
status="";
objects = [];

function preload(){
    song=loadSound("alarma.mp3");
}

function setup(){
  canvas= createCanvas(450,250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  video.size(450,250)
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Estatus:detectando objetos";
}
function modelLoaded(){
  console.log("¡Modelo cargado!");
  status = true;
  objectDetector.detect(video,gotResult);
}
function gotResult(error,results){
 if(error){
  console.log(error);
 }
 console.log(results);
 objects = results;
}
function draw(){
    image(video,0,0,450,250);
    if(status !=""){
      r = random(255);
      g = random(255);
      b = random(255);
      objectDetector.detect(video, gotResult);
     for(i= 0; i< objects.length; i++){
      document.getElementById("status").innerHTML ="Estatus del objecto detectado";
      document.getElementById("number_of_objects").innerHTML = "Numero de objetos detectados:" + objects.length;

      fill(r,g,b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + "" + percent + "%" , objects[i].x+15, objects[i].y+15);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x, objects[i].y,objects[i].width , objects[i].height);
      if(objects[i].label == "person"){
        document.getElementById("number_of_objects").innerHTML = "Se encontro el bebé";
        console.log("stop");
        song.stop();
      }else{
        document.getElementById("number_of_objects").innerHTML = "No se encontro el bebé";
        console.log("play");
        song.play();
      }
     }
     if(objects.length==0){
      document.getElementById("number_of_objects").innerHTML = "No se encontro el bebé";
      console.log("play");
      song.play();
     }
    }

}
