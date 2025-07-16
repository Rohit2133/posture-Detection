let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(800, 600);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function(results) {
    poses = results;
  });

  textFont("sans-serif");
}

function modelReady() {
  console.log("✅ PoseNet model loaded");
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);

  drawOverlay();

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    let skeleton = poses[i].skeleton;

    // 🔴 Draw glowing keypoints
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.3) {
        drawGlowingKeypoint(keypoint.position.x, keypoint.position.y);
      }
    }

    // 🔵 Draw colorful skeleton
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0].position;
      let partB = skeleton[j][1].position;
      stroke((j * 30) % 255, 255, 200);
      strokeWeight(4);
      line(partA.x, partA.y, partB.x, partB.y);
    }
  }
}

// 🟢 Fancy glowing effect for keypoints
function drawGlowingKeypoint(x, y) {
  noStroke();
  for (let r = 20; r > 0; r -= 5) {
    fill(0, 255, 150, map(r, 20, 0, 0, 180));
    ellipse(x, y, r, r);
  }
}

// 🟡 UI Overlay
function drawOverlay() {
  fill(0, 100);
  noStroke();
  rect(0, 0, width, 40);
  fill(255);
  textSize(16);
  text("Press SPACE to toggle effects (coming soon)", 10, 25);
}
