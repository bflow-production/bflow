import React, { useEffect, useRef, useState } from "react";
import { processPlayerImage } from "../services/imageProcessing";
import "../PlayerCard.css";

const PlayerCard = ({
  rating,
  name,
  position,
  image,
  pace,
  shooting,
  passing,
  dribbling,
  defending,
  physical,
}) => {
  const canvasRef = useRef(null);
  const [processedImage, setProcessedImage] = useState(null);  // State to hold the processed image URL
  
///This is just an example how t use the imageservice. The player image should be only drawn once in to the card
///and then stored this component should only get that card and draw the numbers and name to it.
  useEffect(() => {
    const loadProcessedImage = async () => {
      // Use the service to process the player image and get the base64 image URL
      const processedImageUrl = await processPlayerImage(image);
      setProcessedImage(processedImageUrl);  // Set processed image URL to state
    };

    loadProcessedImage();  // Call the function to load and process the image
  }, [image]);  

  useEffect(() => {
    if (processedImage) {
      const drawCard = async () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const cardImg = new Image();
        cardImg.src = "/Card.png";
        await new Promise((resolve) => (cardImg.onload = resolve));

        canvas.width = cardImg.width;
        canvas.height = cardImg.height;
        ctx.drawImage(cardImg, 0, 0, canvas.width, canvas.height);

        // Create an image element from the processed image (base64)
        const playerImg = new Image();
        playerImg.src = processedImage;
        playerImg.onload = () => {
        
          const targetWidth = 250; // Target space width
          const targetHeight = 250; // Target space height
          
          const originalWidth = playerImg.width;
          const originalHeight = playerImg.height;

          const aspectRatio = originalWidth / originalHeight;
          let newWidth = targetWidth;
          let newHeight = targetHeight;

          if (originalWidth > originalHeight) {
            newHeight = targetWidth / aspectRatio; // Landscape image
          } else {
            newWidth = targetHeight * aspectRatio; // Portrait image
          }

          const playerX = 312 - 60; //Position centre of the image on x
          const playerY = 312 - newHeight; // position y relative to height

          // Draw the resized player image
          ctx.drawImage(playerImg, playerX, playerY, newWidth, newHeight);

          // Draw text on the card
          ctx.font = "bold 60px Arial";
          ctx.fillStyle = "gold";
          ctx.textAlign = "center";
          ctx.fillText(`${rating}`, 200, 130);

          ctx.font = "bold 30px Arial";
          ctx.fillText(`${position}`, 200, 170);

          ctx.font = "bold 30px Arial";
          ctx.fillStyle = "black";
          ctx.fillText(name, 320, 350);

          ctx.fillStyle = "#FFD700";
          ctx.fillStyle = "gold";
          ctx.font = "bold 40px Arial";
          ctx.fillText(`${pace}`, 200, 423);
          ctx.fillText(`${shooting}`, 200, 463);
          ctx.fillText(`${passing}`, 200, 503);
          ctx.fillText(`${dribbling}`, 348, 423);
          ctx.fillText(`${defending}`, 348, 463);
          ctx.fillText(`${physical}`, 348, 503);
        };
      };

      drawCard();
    }
  }, [processedImage, rating, name, position, pace, shooting, passing, dribbling, defending, physical]);

  return (
    <div className="card">
      <canvas ref={canvasRef} width={300} height={450}></canvas>
    </div>
  );
};

export default PlayerCard;










