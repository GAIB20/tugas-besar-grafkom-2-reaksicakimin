// Frame controller

import AnimationController from "../animation/animationController.js";
var animationController = new AnimationController();
var isEditing = false;
console.log("Frame controller loaded");

document.addEventListener('DOMContentLoaded', () => {
  let currentFrame = 1;
  let totalFrames = 9;
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
            onChangeFrame();
            pauseAnimation();
            return;
          }
        } else {
          if (currentFrame < 1) {
            resetFrame(totalFrames);
          } else if (currentFrame > totalFrames) {
            resetFrame(1);
          } else {
            onChangeFrame();
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

  document.getElementById('frame-add').addEventListener('click', () => {
    const frameAddIndex = document.getElementById('frame-add-input');
    const index = parseInt(frameAddIndex.value, 10);
    if (index > 0 && index <= totalFrames) {
      totalFrames++;
      animationController.addFrame(index - 1);
      onChangeFrame();
      updateFrameIndicator();
      updateButtons();
    }
  });

  document.getElementById('frame-swap').addEventListener('click', () => {
    const frameSwapIndex1 = document.getElementById('frame-swap-input-1');
    const frameSwapIndex2 = document.getElementById('frame-swap-input-2');
    const index1 = parseInt(frameSwapIndex1.value, 10);
    const index2 = parseInt(frameSwapIndex2.value, 10);
    if (index1 > 0 && index1 <= totalFrames && index2 > 0 && index2 <= totalFrames) {
      animationController.swapFrames(index1 - 1, index2 - 1);
      onChangeFrame();
    }
  });

  document.getElementById('frame-delete').addEventListener('click', () => {
    const frameDeleteIndex = document.getElementById('frame-delete-input');
    const index = parseInt(frameDeleteIndex.value, 10);
    if (index > 0 && index <= totalFrames) {
      totalFrames--;
      animationController.deleteFrame(index - 1);
      onChangeFrame();
      updateFrameIndicator();
      updateButtons();
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

  document.getElementById('import-animation').addEventListener('click', () => {
    document.getElementById('file-input').click();
  });

  document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const json = JSON.parse(e.target.result);
            animationController = AnimationController.fromJSON(json);
        };
        reader.readAsText(file);
    }
  });

  document.getElementById('export-animation').addEventListener('click', async (event) => {
    event.preventDefault();
    const json = animationController.toJSON();
    const jsonString = JSON.stringify(json, null, 2);
    if (!window.showSaveFilePicker) {
        alert('Your browser does not support the File System Access API.');
        return;
    }

    try {
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: 'animation.json',
            types: [{
                description: 'JSON Files',
                accept: {
                    'application/json': ['.json']
                }
            }]
        });

        const writable = await fileHandle.createWritable();
        await writable.write(jsonString);
        await writable.close();

    } catch (error) {
        console.error('Error exporting animation:', error);
        alert('An error occurred while exporting the animation.');
    }
  });
  
  function onChangeFrame(){
    clampFrame();
    console.log("Frame changed to: " + currentFrame);
    animationController.setCurrentFrame(currentFrame - 1);
    if (!isEditing){
        const tweeningType = document.getElementById('tweening-type').value;
        animationController.applyCurrentFrameToScene(fps, tweeningType);
    } else {
        animationController.updateCurrentFrame();
    }
  }

  function addFrame(){
      if (isEditing) onChangeFrame();
      currentFrame++;
      if (!isEditing) onChangeFrame();
  }

  function subtractFrame(){
      if (isEditing) onChangeFrame();
      currentFrame--;
      if (!isEditing) onChangeFrame();
  }

  function resetFrame(frameNum){
      if (isEditing) onChangeFrame();
      currentFrame = frameNum;
      if (!isEditing) onChangeFrame();
  }

  function clampFrame(){
      if (currentFrame < 1){
          currentFrame = 1;
      } else if (currentFrame > totalFrames){
          currentFrame = totalFrames;
      }
  }

});
