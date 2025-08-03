import React from "react";
import { amenityIcons } from "../services/utils/amenities";

export function StayInformation({ amenities }) {
  const information = [
    {
      key: "Pets allowed",
      text: "This stay accepts pets, feel free to have your pets along for the ride!",
      icon: amenityIcons["Pets allowed"],
    },
    {
      key: "Bath-Tools",
      text: "This stay has a variety of shampoos and additional usable shower accessories, so you don't have to carry it along the way.",
      icon: amenityIcons["Shampoo"],
    },
    {
      key: "Bake & Cook Course",
      text: "30 minute drive onto the best cooking course in the city placed amongst the nicest mountains in the area.",
      icon: amenityIcons["Kitchen"],
    },
  ];

  return (
    <div className="stay-information">
      {information.map(({ key, text, icon }) => (
        <div key={key} className="info-item">
          <img src={icon} alt={key} className="info-icon" />
          <div className="info-text">
            <h6>{key}</h6>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
