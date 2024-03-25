import { useEffect, useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { useParams, useLocation } from "react-router-dom";

function Gallery() {
  const [filter, setFilter] = useState("all");
  const { selectMenu } = useParams();
  const location = useLocation();

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  useEffect(() => {
    if (selectMenu) {
      setFilter(selectMenu);
    } else {
      setFilter("all");
    }
  }, [location.pathname]);

  const filteredGallery =
    filter === "all" ? gallery : gallery.filter((item) => item.type === filter);

  return (
    <div className="gallery-container">
      <div className="filter-buttons">
        <button
          onClick={() => {
            handleFilterChange("all");
            window.history.pushState({}, "", "/gallery/all");
          }}
        >
          <img src={all} alt="All" className="icon" />
          Tümü
        </button>
        <button
          onClick={() => {
            handleFilterChange("tropical");
            window.history.pushState({}, "", "/gallery/tropical");
          }}
        >
          <img src={tropical} alt="Tropical" className="icon" />
          Tropikal
        </button>
        <button
          onClick={() => {
            handleFilterChange("north-pole");
            window.history.pushState({}, "", "/gallery/north-pole");
          }}
        >
          <img src={snow} alt="Snowflake" className="icon" /> Kuzey Kutbu
        </button>
        <button
          onClick={() => {
            handleFilterChange("tree-house");
            window.history.pushState({}, "", "/gallery/tree-house");
          }}
        >
          <img src={tree} alt="Tree House" className="icon" />
          Ağaç Ev
        </button>
        <button
          onClick={() => {
            handleFilterChange("castle");
            window.history.pushState({}, "", "/gallery/castle");
          }}
        >
          <img src={castle} alt="Castle" className="icon" />
          Kale
        </button>
        <button
          onClick={() => {
            handleFilterChange("game-room");
            window.history.pushState({}, "", "/gallery/game-room");
          }}
        >
          <img src={game} alt="Game" className="icon" />
          Oyun Odası
        </button>
        <button
          onClick={() => {
            handleFilterChange("bungalov");
            window.history.pushState({}, "", "/gallery/bungalov");
          }}
        >
          <img src={bungalov} alt="Bungalov" className="icon" />
          Bungalov
        </button>
        <button
          onClick={() => {
            handleFilterChange("extraordinary");
            window.history.pushState({}, "", "/gallery/extraordinary");
          }}
        >
          <img src={ufo} alt="Extraordinary" className="icon" />
          Olağanüstü
        </button>
      </div>
      <div className="gallery-items">
        {filteredGallery.map((item) => (
          <div className="gallery-item" key={item.id}>
            <img src={item.img} alt={item.desc} />
            <p>{item.desc}</p>
            <div className="item-content">
              <div className="stars">
                <div>
                  {Array.from({ length: 5 }, (_, index) => (
                    <FontAwesomeIcon
                      icon={
                        index + 1 <= parseInt(item.star)
                          ? faStar
                          : index + 0.5 === parseFloat(item.star)
                          ? faStarHalfStroke
                          : ""
                      }
                      key={index}
                    />
                  ))}
                </div>
              </div>

              {item.discount ? <div className="badge">İndirim</div> : <></>}
              <p>{item.info}</p>
              <p className="price">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
