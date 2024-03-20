import { useState } from "react";
import gallery from "../../API/Gallery";
import "./Gallery.css";
import snow from "../../assets/snowflake.png";
import ufo from "../../assets/ufo.png";
import bungalov from "../../assets/bungalov.png";
import game from "../../assets/game.png";
import castle from "../../assets/castle.png";
import tree from "../../assets/treehouse.png";
import tropical from "../../assets/tropical.png";
import all from "../../assets/all.png";

function Gallery() {
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const filteredGallery =
    filter === "All" ? gallery : gallery.filter((item) => item.type === filter);

  return (
    <div className="gallery-container">
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange("All")}>
          <img src={all} alt="All" className="icon" />
          Tümü
        </button>
        <button onClick={() => handleFilterChange("Tropical")}>
          <img src={tropical} alt="Tropical" className="icon" />
          Tropikal
        </button>
        <button onClick={() => handleFilterChange("North Pole")}>
          <img src={snow} alt="Snowflake" className="icon" /> Kuzey Kutbu
        </button>
        <button onClick={() => handleFilterChange("Tree House")}>
          <img src={tree} alt="Tree House" className="icon" />
          Ağaç Ev
        </button>
        <button onClick={() => handleFilterChange("Castle")}>
          <img src={castle} alt="Castle" className="icon" />
          Kale
        </button>
        <button onClick={() => handleFilterChange("Game Room")}>
          <img src={game} alt="Game" className="icon" />
          Oyun Odası
        </button>
        <button onClick={() => handleFilterChange("Bungalov")}>
          <img src={bungalov} alt="Bungalov" className="icon" />
          Bungalov
        </button>
        <button onClick={() => handleFilterChange("Extraordinary")}>
          <img src={ufo} alt="Extraordinary" className="icon" />
          Olağanüstü
        </button>
      </div>
      <div className="gallery-items">
        {filteredGallery.map((item) => (
          <div className="gallery-item" key={item.id}>
            <img src={item.img} alt={item.desc} />
            <p>{item.desc}</p>
            <p>{item.info}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
