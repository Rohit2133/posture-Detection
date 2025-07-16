let capture;
let posenet;
let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;

function setup() {
  const canvas = createCanvas(760, 440);
  canvas.parent('canvas-container');
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();

  posenet = ml5.poseNet(capture, modelLoaded);
  posenet.on('pose',receivedPoses);

  textFont("sans-serif");
}

function receivedPoses(poses){
    console.log(poses);

    if(poses.length > 0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() {
  background(0);
  image(capture, 0, 0, width, height);
  fill(255,0,0);

    if(singlePose){
        for(let i=0; i<singlePose.keypoints.length; i++){
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y,20);
        }
        stroke(255,255,255);
        strokeWeight(5);
        for(let j=0; j<skeleton.length; j++){
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)
        }
    }
}
//     // 🔵 Draw colorful skeleton
//     for (let j = 0; j < skeleton.length; j++) {
//       let partA = skeleton[j][0].position;
//       let partB = skeleton[j][1].position;
//       stroke((j * 30) % 255, 255, 200);
//       strokeWeight(4);
//       line(partA.x, partA.y, partB.x, partB.y);
//     }
//   }
// }

// // 🟢 Fancy glowing effect for keypoints
// function drawGlowingKeypoint(x, y) {
//   noStroke();
//   for (let r = 20; r > 0; r -= 5) {
//     fill(0, 255, 150, map(r, 20, 0, 0, 180));
//     ellipse(x, y, r, r);
//   }
// }

// // 🟡 UI Overlay
// function drawOverlay() {
//   fill(0, 100);
//   noStroke();
//   rect(0, 0, width, 40);
//   fill(255);
//   textSize(16);
//   text("Press SPACE to toggle effects (coming soon)", 10, 25);
// }
