import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "/Card.png";  

    const playerImg = new Image();
    playerImg.src = image;

    img.onload = () => {
     
      canvas.width = img.width; 
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      playerImg.onload = () => {
        const playerWidth = 200; 
        const playerHeight = 200;
        const playerX = 280; 
        const playerY = 115; 

        ctx.drawImage(playerImg, playerX, playerY, playerWidth, playerHeight);


      // Set text styles
      ctx.font = "bold 60px Arial";
      ctx.fillStyle = "gold";
      ctx.textAlign = "center"

      // Draw player rating
      ctx.fillText(` ${"90"}`, 200, 130); 

      // Draw player position
      ctx.fillStyle = "gold";
      ctx.font = "bold 30px Arial";
      ctx.fillText(` ${"ST"}`, 200, 170); 

      // Draw player name
      ctx.fillStyle = "black";
      ctx.font = "bold 30px Arial";
      ctx.fillText(name, 320, 350);

   
      ctx.fillStyle = "#FFD700";
      ctx.font = "bold 40px Arial";
      ctx.fillText(` ${90}`, 200, 423); // Pace
      ctx.fillText(` ${99}`, 200, 463); // Shooting
      ctx.fillText(` ${99}`, 200, 503); // Passing 
      ctx.fillText(` ${20}`, 348, 423); // Dribbling
      ctx.fillText(` ${3}`,  348, 463); // Defending
      ctx.fillText(` ${99}`, 348, 503); // Physical
    };
  };
  }, [rating, name, position, pace, shooting, passing, dribbling, defending, physical]);

  return (
    <div className="card">
      <canvas ref={canvasRef} width={300} height={450}></canvas>
    </div>
  );
};

export default PlayerCard;






