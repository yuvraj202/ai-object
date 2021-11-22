yuvraj="";
objects = [];
word="";



function speak()
{
  var synth = window.speechSynthesis;
  speak_data = 'Object detected matches with the user - '+objects[i].label;
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);

}

function setup()
 {
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
   
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd',modelLoaded);
  document.getElementById("object_status").innerHTML="Status : Detecting Objects";
  word=document.getElementById("object_name_input").value;
}

function modelLoaded()
{
  console.log("model Loaded");
  yuvraj = true;
}

function gotResults(error,results)
{
   if(error)
   {
      console.log("error");
   }
   else
   {
      console.log(results);
      objects=results;
   }
}

function draw() 
{
  image(video,0,0,400,400)
  if(yuvraj !="")
  {
    objectDetector.detect(video,gotResults)
    for( i = 0; i < objects.length; i++)
    {
      percent = floor(objects[i].confidence * 100);
      document.getElementById("object_status").innerHTML = "Status : Object Detected";
      document.getElementById("number_of_object").innerHTML = "Number of objects detected are : "+ objects.length;
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      
      fill("red");
      stroke("red");
      nofill();
      if(objects[i].label == word)
      {
        speak();
        document.getElementById("number_of_object").innerHTML = "Your Object Found ";
      }
      else
      {
        document.getElementById("number_of_object").innerHTML = "Your Object not Found ";
      }
    }
  }
}



