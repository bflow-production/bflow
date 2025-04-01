import * as bodyPix from "@tensorflow-models/body-pix";
import "@tensorflow/tfjs";

/**
 * Processes the player image by removing the background, cropping it to the player's bounding box,
 * and returning the processed image as a base64 URL.
 * @param {string} imageUrl - The URL of the player image to process.
 * @returns {Promise<string>} - The base64 URL of the processed image.
 */
export const processPlayerImage = async (imageUrl) => {
  const playerImg = new Image();
  playerImg.crossOrigin = "anonymous";
  playerImg.src = imageUrl;

  await new Promise((resolve) => (playerImg.onload = resolve));

  // Load BodyPix model
  const net = await bodyPix.load();
  const segmentation = await net.segmentPerson(playerImg, {
    internalResolution: "medium", // These can be adjusted to get a better bg removal
    segmentationThreshold: 0.7,
  });


  // Create an offscreen canvas to process the segmented image
  const offscreenCanvas = document.createElement("canvas");
  const offscreenCtx = offscreenCanvas.getContext("2d");
  offscreenCanvas.width = playerImg.width;
  offscreenCanvas.height = playerImg.height;

  offscreenCtx.drawImage(playerImg, 0, 0);

  // Get image data from offscreen canvas 
  const imageData = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
  const pixelData = imageData.data;

  // Mask the background 
  for (let i = 0; i < pixelData.length; i += 4) {
    if (segmentation.data[i / 4] === 0) {
      pixelData[i + 3] = 0; // Set alpha to 0 
    }
  }

  offscreenCtx.putImageData(imageData, 0, 0);

  let minX = offscreenCanvas.width;
  let minY = offscreenCanvas.height;
  let maxX = 0;
  let maxY = 0;

  // Find edges of the non-transparent pixels
  for (let y = 0; y < offscreenCanvas.height; y++) {
    for (let x = 0; x < offscreenCanvas.width; x++) {
      const index = (y * offscreenCanvas.width + x) * 4;
      const alpha = pixelData[index + 3]; // Check alpha channel 
      if (alpha > 0) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const cropWidth = maxX - minX;
  const cropHeight = maxY - minY;

  const cropCanvas = document.createElement("canvas");
  cropCanvas.width = cropWidth;
  cropCanvas.height = cropHeight;
  const cropCtx = cropCanvas.getContext("2d");

  cropCtx.drawImage(
    offscreenCanvas,
    minX, minY, cropWidth, cropHeight, 
    0, 0, cropWidth, cropHeight 
  );

  // Return the image as a base64 URL
  return cropCanvas.toDataURL();
};



