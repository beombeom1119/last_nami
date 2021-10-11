import React, { useState, useEffect, Fragment } from 'react'
import * as tmImage from '@teachablemachine/image'
import html2canvas from 'html2canvas';
import $ from 'jquery';


export default function WelcomePage() {
  const [openVal, setOpenVal] = useState(false);
 

  const URL = "https://teachablemachine.withgoogle.com/models/pg97lEWuB/"
  let model;
  let webcam;
  let labelContainer;
  
  let maxPredictions;

  useEffect(() => {
  init()
   
  }, [])

  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true; 
    webcam = new tmImage.Webcam(200, 200, flip);
    
    
  
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);
    webcam.canvas.id="WebCam"
    document.getElementById("webcam-container").appendChild(webcam.canvas);
  
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { 
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {

    const prediction = await model.predict(webcam.canvas);
       if (prediction[0].probability.toFixed(2) >= 0.7) {
      setOpenVal(true);
    } else {
      setOpenVal(false);
    }
    
  }

  function downImg(){
    html2canvas($("#WebCam")[0]).then(function(canvas){
        var myImage = canvas.toDataURL();
        downloadURI(myImage, "촬영한 사진.png") 
    });
}
function downloadURI(uri, name){
  var link = document.createElement("a")
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
}

  return (
    <Fragment>
    <>
    <div>
      <div id="webcam-container"></div>
      <div id="label-container"></div>
      <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>
      </div>
      </>
      <button type="text" onClick={downImg}>클릭</button>
      </Fragment>
    
  )
  }
