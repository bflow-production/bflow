import React, { useState } from "react";
import "./Tutorial.css";

const TutorialPopup = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Tervetuloa käyttämään B'Flow:ta!",
      content:
        "Tämä on lyhyt opastus sovelluksen käyttöön. B'Flown avulla voit seurata omaa edistymistäsi eri harjoituksissa.",
    },
    {
      title: "Valikko",
      content:
        "Sivun vasemmasta reunasta löydät navigointivalikon, jonka takaa löydät eri osiot.",
    },
    {
      title: "Profiili",
      content: "Profiilin takaa löydät omat tietosi ja voit muokata niitä.",
    },
    {
      title: "Tilastot",
      content:
        "Tilastot näkymästä löydät kaikki harjoituksesi ja niiden tilastot.",
    },
    {
      title: "Tee harjoitus",
      content:
        "Tee harjoitus näkymässä voit lisätä uusia harjoituksia, jotka tilastoituu sen jälkeen tilastot näkymään.",
    },
    {
      title: "Tehdyt harjoitukset",
      content:
        "Tehdyt harjoitukset näkymästä löydät kaikki tekemäsi harjoitukset.",
    },
    {
      title: "Liity joukkueeseen",
      content:
        "Kun valmentaja ja sinä olette luoneet yhteyden toisiinne profiilissa, voit liittyä joukkueeseen.",
    },
    {
      title: "Asetukset",
      content:
        "Asetuksista löydät mahdollisuuden muuttaa salasanaasi, jakaa harjoituksia sekä vaihtaa kielen.",
    },
    {
      title: "Kirjaudu ulos",
      content:
        "Kun olet lopettamassa B'flow käyttöä, voit kirjautua ulos valikon alareunasta.",
    },
    {
      title: "Valmista!",
      content: "Nyt olet valmis käyttämään sovellusta. Mukavaa harjoittelua!",
    },
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else onClose();
  };

  // Move to previous step
  /*const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };*/

  const skipTutorial = () => {
    onClose();
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-popup">
        <button className="close-button" onClick={skipTutorial}>
          ✕
        </button>

        <div className="tutorial-content">
          <h2>{tutorialSteps[currentStep].title}</h2>
          <p>{tutorialSteps[currentStep].content}</p>
        </div>

        <div className="tutorial-buttons">
            <button className="tutorial-btn skip" onClick={skipTutorial}>
              Ohita
            </button>
          
          <button className="tutorial-btn next" onClick={nextStep}>
            {currentStep === tutorialSteps.length - 1 ? "Valmis" : "Seuraava"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialPopup;
