import React, { useState, useEffect } from 'react'
import * as tmImage from '@teachablemachine/image'

export default function WelcomePage({GetTeachValue}) {
  const [openVal, setOpenVal] = useState(false);
  const [state, setstate] = useState({
    iswebcam : false,
  })
  // const URL = "https://teachablemachine.withgoogle.com/models/pg97lEWuB/"  //원래
  const URL = "https://teachablemachine.withgoogle.com/models/ukHIXusf5/" //4개 분류
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
    webcam = new tmImage.Webcam(500, 500, flip); 
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
    setstate({
      high : prediction[0].probability.toFixed(2),
      middle : prediction[1].probability.toFixed(2),
      low : prediction[2].probability.toFixed(2),
      good : prediction[3].probability.toFixed(2),
    })
    function SetTeachValue(){
      GetTeachValue(prediction[0].probability.toFixed(2),prediction[1].probability.toFixed(2),prediction[2].probability.toFixed(2),prediction[3].probability.toFixed(2))
    }
    SetTeachValue()
    if (prediction[0].probability.toFixed(2) >= 0.7) {
      setOpenVal(true);
    } else {
      setOpenVal(false);
    }
    
  }


  return (
    <div>
      
      <div id="webcam-container"></div>
      <div id="label-container">{/* <h3>탈모일 확률 : {state.result1} <br></br> 정상일 확률 : {state.result2}</h3> */}</div>
      <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>
    </div>
  )
}