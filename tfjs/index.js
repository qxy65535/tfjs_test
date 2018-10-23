import * as tf from '@tensorflow/tfjs';
import { Webcam } from './webcam';

const webcam = new Webcam(document.getElementById('webcam'));

const MODEL_URL = '/mobilenet3/tensorflowjs_model1712.pb';
const WEIGHTS_URL = './mobilenet3/weights_manifest1712.json';

// const result = ['left', 'right', 'stop']
const result = ['拳头', '手掌']
// const result = ['four', 'five', 'one', 'three', 'two']

var model;
var predicting = false;

async function LoadModel() {
  model = await tf.loadFrozenModel(MODEL_URL, WEIGHTS_URL);
}

async function predict() {
  // console.log("0");
  while (predicting) {
    // console.log("1");

    const predictedClass = tf.tidy(() => {
      const img = webcam.capture();
      const predictions = model.predict(img);
      predictions.print();
      // Returns the index with the maximum probability. This number corresponds
      // to the class the model thinks is the most probable given the input.
      return predictions.as1D().argMax();
    });
    // console.log("2");
    const classId = (await predictedClass.data())[0];
    predictedClass.dispose();

    document.getElementById('predict').innerHTML = result[classId];
    console.log(result[classId]);
    await tf.nextFrame();

  }
}


async function init() {
  try {
    await webcam.setup();
  } catch (e) {
    document.getElementById('no-webcam').style.display = 'block';
  }

  // Warm up the model. This uploads weights to the GPU and compiles the WebGL
  // programs so the first time we collect data from the webcam it will be
  // quick.

  LoadModel();

}

document.getElementById('stop').addEventListener('click', async () => {
  predicting = false;
});
document.getElementById('start').addEventListener('click', async () => {
  if (!predicting) {
    predicting = true;
    predict();
  }
});

// LoadModel();
init();
// predict();