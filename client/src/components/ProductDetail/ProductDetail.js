import React, { useState, useRef, useEffect } from "react";

import './productDispDetail.css';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useDispatch } from 'react-redux';
import { addItem, setCartIsOpen } from '../../features/counter/cartSlice';
import 'rodal/lib/rodal.css';

import imageData from "../../shared/itemdata";
import "./productDetail.css";
import Rodal from "rodal";

const ProductDetail = ({ productId, detailRef }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("small");
    const sliderRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState("nfu1.jpg");

    const smallScreenMediaQuery = '(max-width: 700px)';
    const iconSize = 28;
    const delta = 5;
    let startX;
    let startY;

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "30px",
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 800,
        swipe: true,
        touchMove: true,
    };

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const handleSizeChart = (image) => {
        setIsModalOpen(true);
        const imageModal = document.getElementById("image-modal");
        imageModal.src = image;

    };

    const handleAddToCart = (item) => {
        dispatch(addItem({ newItem: item, size: size, newQuantity: quantity }));
        dispatch(setCartIsOpen(true));
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getCustomStyles = () => {
        return {
            width: window.matchMedia(smallScreenMediaQuery).matches ? "70%" : "50%",
            height: window.matchMedia(smallScreenMediaQuery).matches ? "35%" : "80.5%",
            borderRadius: "3px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "auto",
            padding: 0,
            overflow: "hidden"
        };
    };

    const customStyles = getCustomStyles();

    const imageNFY = imageData.find((img) => img.id === productId);

    return (
        <div className="product-detail" ref={detailRef}>
            {(imageNFY.id === productId) ?

                <div className="product-detail-container">
                    <div className="product-detail-card">
                        <div className="product-detail-image">
                            <img
                                onClick={() => handleSizeChart(require(`../../shared/${imageNFY.images[0]}`))}
                                src={require(`../../shared/${imageNFY.images[0]}`)}
                                alt='shirt1'
                                className="carousel-image"
                            />
                        </div>
                        <div className="product-detail-below-image">
                            <p className="product-detail-description">{imageNFY.description}</p>
                        </div>
                    </div>

                    <div className="product-detail-card">
                        <div className="product-detail-image">
                            <img
                                onClick={() => handleSizeChart(require(`../../shared/${imageNFY.images[1]}`))}
                                src={require(`../../shared/${imageNFY.images[1]}`)}
                                alt='shirt1'
                                className="carousel-image"
                            />
                        </div>
                        <div className="product-detail-below-image">
                            <h3>{imageNFY.name}</h3>
                            <h4>C${imageNFY.priceInCad}</h4>
                            <div className='product-form-container'>

                                <h4 style={{ paddingTop: '1rem', color: 'grey' }}>Quantity</h4>
                                <label >
                                    <input
                                        type="number"
                                        min={1}
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                    />
                                </label>
                                <h4 style={{ paddingTop: '0.2rem', color: 'grey' }}>Size</h4>
                                <div className='dropdown'>
                                    <FormControl sx={{ height: '30px', minWidth: 90 }} size="small">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={size}
                                            onChange={handleSizeChange}
                                        >
                                            <MenuItem value="small">Small</MenuItem>
                                            <MenuItem value="medium">Medium</MenuItem>
                                            <MenuItem value="large">Large</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <br />
                                <div className="product-detail-buttons">
                                    <button className='button-cart-add' onClick={() => handleAddToCart(imageNFY)}>Add to Cart</button>
                                    <br />
                                    <button className='button-cart-size' onClick={() => handleSizeChart(require(`../../shared/asset.png`))}>Size Chart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                :
                <div>
                </div>
            }

            <div className="rodal-parent">
                <Rodal
                    visible={isModalOpen}
                    onClose={closeModal}
                    customStyles={customStyles}
                >
                    <div>
                        <img
                            src={require(`../../shared/asset.png`)}
                            alt="enlarged"
                            className="enlarged-image"
                            style={{ width: '100%' }}
                            id="image-modal"
                        />
                    </div>
                </Rodal>
            </div>
        </div>
    );
}

export default ProductDetail;