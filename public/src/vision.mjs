// Copyright 2023 The MediaPipe Authors.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//      http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Import the required package.
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
} from "https://cdn.skypack.dev/@mediapipe/tasks-vision@latest";

import {
  calculateArea,
  determineDistance,
  setZeroDistance,
  averagePoint,
  calculateAngle,
  boundVelocity,
} from "./mathhelp.js";

import {
  VIDEO_HEIGHT_PX, VIDEO_WIDTH_PX, VIDEO_HEIGHT, VIDEO_WIDTH
} from "./constants.js";

// Create required variables.
let gestureRecognizer = null;
let runningMode = "VIDEO";
let webcamRunning = false;

const videoHeight = VIDEO_HEIGHT_PX;
const videoWidth = VIDEO_WIDTH_PX;

let car_velocity = 0;
let car_angle = 0;

const allEqual = (arr) => arr.every((val) => val === arr[0]);

// Initialize the object detector.
async function initializeGestureRecognizer() {
  const visionFilesetResolver = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  gestureRecognizer = await GestureRecognizer.createFromOptions(
    visionFilesetResolver,
    {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task",
      },
      numHands: 2,
      runningMode: runningMode,
    }
  );

  console.log("Gesture Recognizer initialized.");
}

// Call the initialize function
initializeGestureRecognizer();

const imageContainers = document.getElementsByClassName("detectOnClick");

for (let imageContainer of imageContainers) {
  imageContainer.children[0].addEventListener("click", handleClick);
}

/********************************************************************
 *   Continuously grab image from webcam stream and detect it
 ********************************************************************/

let video = document.getElementById("webcam");
let canvasElement = document.getElementById("output_canvas");
let canvasCtx = canvasElement.getContext("2d");
let gestureOutput = document.getElementById("gesture_output");
// Check if webcam access is supported.
function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

// If webcam supported, add event listener to button for when user
// wants to activate it.
if (!hasGetUserMedia()) {
  console.warn("getUserMedia() is not supported by your browser");
}

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
    video.addEventListener("loadeddata", predictWebcam);
  })
  .catch((err) => {
    console.error(err);
  });

let lastVideoTime = -1;
let results = undefined;
const webcamElement = document.getElementById("webcam");
async function predictWebcam() {
  // Run video object detection.
  let nowInMs = Date.now();
  if (video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    results = gestureRecognizer.recognizeForVideo(video, nowInMs);
  }

  displayVideoDetections(results);
  // Call this function again to keep predicting when the browser is ready
  window.requestAnimationFrame(predictWebcam);
}

function displayVideoDetections(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  const drawingUtils = new DrawingUtils(canvasCtx);

  canvasElement.style.height = videoHeight;
  webcamElement.style.height = videoHeight;
  canvasElement.style.width = videoWidth;
  webcamElement.style.width = videoWidth;

  let handGestures = [];
  let leftHandPos = { x: 0, y: 0 };
  let rightHandPos = { x: 0, y: 0 };

  if (results.gestures.length > 1) {
    let leftHandIndex = 0;

    if (results.handedness[0][0].categoryName === "Right") {
      leftHandIndex = 1;
    }

    for (let gesture of results.gestures) {
      handGestures.push(gesture[0].categoryName);
    }

    let areas = [];
    for (let i = 0; i < results.landmarks.length; i++) {
      let landmarks = results.landmarks[i];
      const outerLandmarks = [
        landmarks[6],
        landmarks[10],
        landmarks[14],
        landmarks[18],
        landmarks[17],
        landmarks[13],
        landmarks[9],
        landmarks[5],
      ];

      areas.push(calculateArea(outerLandmarks));

      // calc area and avg
      let average = averagePoint(outerLandmarks);

      if (i === leftHandIndex) {
        leftHandPos = average;
      } else {
        rightHandPos = average;
      }

      drawingUtils.drawConnectors(
        landmarks,
        GestureRecognizer.HAND_CONNECTIONS,
        {
          color: "#00FF00",
          lineWidth: 5,
        }
      );

      drawingUtils.drawLandmarks(landmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
    }

    let distance = determineDistance(areas);

    // Zeroing Check
    if (allEqual(handGestures)) {
      if (handGestures[0] === "None") {
        setZeroDistance(areas);
        distance = 0;
      }
    }

    const angle = calculateAngle([leftHandPos, rightHandPos]);
    car_velocity = boundVelocity(distance);
    car_angle = angle;

    // Draw line between hands
    drawLine(canvasCtx, leftHandPos, rightHandPos);
  }
  else {
    car_velocity = 0;
    car_angle = undefined;
  }
}

function drawLine(canvasCtx, start, end) {
  canvasCtx.restore();
  canvasCtx.beginPath();
  canvasCtx.moveTo(start.x * VIDEO_WIDTH * 2 + 180, start.y * VIDEO_HEIGHT * 2);
  canvasCtx.lineTo(end.x * VIDEO_WIDTH * 2 + 180, end.y * VIDEO_HEIGHT * 2);
  canvasCtx.strokeStyle = "red";
  canvasCtx.lineWidth = 5;
  canvasCtx.stroke();
}
export function getCarVelocity() {
  return car_velocity;
}

export function getCarAngle() {
  return car_angle;
}
