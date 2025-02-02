import React, { useState } from "react";
import itemData from "../shared/itemdata";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function MenuContainer() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const navigate = useNavigate();
  const handleShopNowClick = (item) => {
    const nameInLowerCase = item.name.replace(/\s/g, "").toLowerCase();
    navigate(`${nameInLowerCase}`);
  };

  return (
    <section className="menuSection">
      <div className="megaContainer">
        {itemData.map((item, index) => {
          return (
            <div key={item.id} className="itemContainer">
              {/* title */}
              <div key={index} className="itemText sectionContainer">
                <div className="horizontalLine"></div>
                <div className="itemTitle">
                  <h2>{item.name}</h2>
                </div>
                <div className="horizontalLine"></div>
              </div>

              {/* img carausal */}
              <div
                className="itemImageContainer wrapper"
                onMouseEnter={() => {
                  if (item.id === "dtf") {
                    setIsHovered(true);
                  } else if (item.id === "nfy") {
                    setIsHovered2(true);
                  }
                }}
                onMouseLeave={() => {
                  if (item.id === "dtf") {
                    setIsHovered(false);
                  } else if (item.id === "nfy") {
                    setIsHovered2(false);
                  }
                }}
              >
                {item.images.map((img, index) => {
                  return (
                    <div>
                      {isHovered && (
                        <>
                          {/* {show now } */}
                          <div
                            className={
                              isHovered
                                ? "shopNowBanner show"
                                : "displayNone hide"
                            }
                          >
                            <button
                              className="shopNowButton"
                              onClick={() => handleShopNowClick(item)}
                            >
                              <h2>shop now</h2>
                            </button>
                          </div>
                        </>
                      )}
                     

                      <div key={index} className="item">
                        <img src={img} alt={img}></img>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MenuContainer;
