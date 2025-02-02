import React, { useState } from "react";

import "../components/ProductDetail/productDispDetail.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useDispatch } from "react-redux";
import Rodal from "rodal";
import { addItem, setCartIsOpen } from "../features/counter/cartSlice";
import "rodal/lib/rodal.css";

import itemData from "../shared/itemdata";

function DesireToFlyDetail() {

  return (
    <div className="detail-view">

      <div className="body-container">
      </div>
    </div>
  );
}

export default DesireToFlyDetail;
