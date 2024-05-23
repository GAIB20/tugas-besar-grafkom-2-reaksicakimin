// Frame controller

import AnimationController from "../animation/animationController.js";
const animationController = new AnimationController();
var isEditing = false;
console.log("Frame controller loaded");

document.addEventListener('DOMContentLoaded', () => {
  let currentFrame = 1;
  const totalFrames = 9;
  let interval = null;
  let isReversed = false;
  let isAutoReplay = false;

  const fpsInput = document.getElementById('frame-per-second-input');

  let fps = parseInt(fpsInput.value, 10) || 30;
  let intervalDuration = 1000 / fps;

  fpsInput.addEventListener('input', () => {
    fps = parseInt(fpsInput.value, 10);
    intervalDuration = 1000 / fps;

    if (interval !== null) {
      clearInterval(interval);
      playAnimation();
    }
  });

  // Update frame indicator label
  function updateFrameIndicator() {
    const frameIndicator = document.querySelector('.frame-number');
    if (frameIndicator) {
      frameIndicator.textContent = `${currentFrame} / ${totalFrames}`;
    }
  }

  // Update controller buttons state
  function updateButtons() {
    const prevButton = document.getElementById('frame-prev');
    const nextButton = document.getElementById('frame-next');
    const firstButton = document.getElementById('frame-first');
    const lastButton = document.getElementById('frame-last');

    prevButton.disabled = (currentFrame === 1);
    nextButton.disabled = (currentFrame === totalFrames);
    firstButton.disabled = (currentFrame === 1);
    lastButton.disabled = (currentFrame === totalFrames);
  }

  // Play animation frame
  function playAnimation() {
    const playButton = document.getElementById('frame-play');
    playButton.style.color = 'var(--accent-color)';
    if (interval === null) {
      interval = setInterval(() => {
        if (isReversed) {
          currentFrame--;
        } else {
          currentFrame++;
        }
  
        if (!isAutoReplay) {
          if (currentFrame < 1 || currentFrame > totalFrames) {
            clampFrame();
            pauseAnimation();
            return;
          }
        } else {
          if (currentFrame < 1) {
            resetFrame(totalFrames);
          } else if (currentFrame > totalFrames) {
            resetFrame(1);
          } else {
            clampFrame();
          }
        }
  
        updateFrameIndicator();
        updateButtons();
      }, intervalDuration);
    }
  }
  
  // Pause animation frame
  function pauseAnimation() {
    const playButton = document.getElementById('frame-play');
    playButton.style.color = 'var(--text-color)';
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
  }

  updateFrameIndicator();
  updateButtons();

  document.getElementById('frame-prev').addEventListener('click', () => {
    if (currentFrame > 1) {
      subtractFrame();
      updateFrameIndicator();
      updateButtons();
    }
  });

  document.getElementById('frame-next').addEventListener('click', () => {
    if (currentFrame < totalFrames) {
      addFrame();
      updateFrameIndicator();
      updateButtons();
    }
  });

  document.getElementById('frame-first').addEventListener('click', () => {
    resetFrame(1);
    updateFrameIndicator();
    updateButtons();
  });

  document.getElementById('frame-last').addEventListener('click', () => {
    resetFrame(totalFrames);
    updateFrameIndicator();
    updateButtons();
  });

  document.getElementById('frame-play').addEventListener('click', playAnimation);
  document.getElementById('frame-pause').addEventListener('click', pauseAnimation);

  document.getElementById('frame-reverse').addEventListener('click', () => {
    isReversed = !isReversed;
    const reverseButton = document.getElementById('frame-reverse');
    if (isReversed) {
      reverseButton.style.color = 'var(--accent-color)';
    } else {
      reverseButton.style.color = 'var(--text-color)';
    }
  });

  document.getElementById('frame-autoreplay').addEventListener('click', () => {
    isAutoReplay = !isAutoReplay;
    const autoReplayButton = document.getElementById('frame-autoreplay');
    if (isAutoReplay) {
      autoReplayButton.style.color = 'var(--accent-color)';
    } else {
      autoReplayButton.style.color = 'var(--text-color)';
    }
  });

  document.getElementById('start-recording').addEventListener('click', () => {
    isEditing = !isEditing;
    const editButton = document.getElementById('start-recording');
    if (isEditing) {
      editButton.style.color = 'var(--accent-color)';
    } else {
      editButton.style.color = 'var(--text-color)';
    }
  });

  document.getElementById('save-frame').addEventListener('click', () => {
    if (isEditing) {
      onChangeFrame();
    }
  });
  
  function onChangeFrame(){
    console.log("Frame changed");
    animationController.setCurrentFrame(currentFrame - 1);
    if (!isEditing){
      animationController.applyCurrentFrameToScene();
    } else {
      saveSceneToFrame();
    }
  }

  function saveSceneToFrame(){
    animationController.updateCurrentFrame();
  }

  function addFrame(){
    currentFrame++;
    clampFrame();
  }

  function subtractFrame(){
    currentFrame--;
    clampFrame();
  }

  function clampFrame(){
    if (currentFrame < 1){
      currentFrame = 1;
    } else if (currentFrame > totalFrames){
      currentFrame = totalFrames;
    }
    onChangeFrame();
  }

  function resetFrame(frameNum){
    currentFrame = frameNum;
    clampFrame();
  }
});
