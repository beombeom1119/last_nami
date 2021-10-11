import React, { useState, useEffect } from 'react'
import * as tmImage from '@teachablemachine/image'

export default function WelcomePage({ GetTeachValue }) {
  const [openVal, setOpenVal] = useState(false);
  const [state, setstate] = useState({
    result1: "High",
    result2: "Middle",
    result3: "Low",
    result4: "Good",
    iswebcam: false,
  })

  // const URL = "https://teachablemachine.withgoogle.com/models/pg97lEWuB/"  //원래
  // const URL = "https://teachablemachine.withgoogle.com/models/durPR47Po/" //4개 분류
  const URL = "https://teachablemachine.withgoogle.com/models/Sk5B7BVId/" //최신 


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
    webcam = new tmImage.Webcam(80, 80, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);
    webcam.canvas.id = "WebCam"
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");

    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.appendChild(document.createElement("div"));

    }


    async function loop() {
      webcam.update();
      await predict();
      window.requestAnimationFrame(loop);
    }

    async function predict() {

      const prediction = await model.predict(webcam.canvas);
      setstate({
        high: prediction[0].probability.toFixed(2),
        middle: prediction[1].probability.toFixed(2),
        low: prediction[2].probability.toFixed(2),
        good: prediction[3].probability.toFixed(2),
      })

      function SetTeachValue() {
        GetTeachValue(prediction[0].probability.toFixed(2), prediction[1].probability.toFixed(2), prediction[2].probability.toFixed(2), prediction[3].probability.toFixed(2))
      }


      if (prediction[0].probability.toFixed(2) >= 0.7) {
        setOpenVal(true);
      } else {
        setOpenVal(false);
      }

    }


    return (
      
      <div>

        <div id="webcam-container"></div>
        <div id="label-container"></div>

        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>
      </div>
    )
  }
}