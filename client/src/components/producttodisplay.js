import React, { useRef } from 'react';
import Slider from 'react-slick';

import imagesData from '../images/DTF.json'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/productDisp.css'

function ProductDisplayTemp(props) {

    const sliderRef = useRef(null);
    // Find the image object with the matching ID

    const imageMain = imagesData.find(img => img.id === mainId);

    let slideInterval = null;

    const handleMouseEnter = (direction) => {
        if (sliderRef.current) {
          const { slideCount } = sliderRef.current.innerSlider;
          const { currentSlide } = sliderRef.current.state;
    
          const nextSlide = direction === 'left' ? currentSlide - 1 : currentSlide + 1;
    
          if (nextSlide < 0) {
            sliderRef.current.slickGoTo(slideCount - 1);
          } else if (nextSlide >= slideCount) {
            sliderRef.current.slickGoTo(0);
          } else {
            sliderRef.current.slickGoTo(nextSlide);
          }
    
          slideInterval = setInterval(() => {
            const { currentSlide } = sliderRef.current.state;
            const nextSlide = direction === 'left' ? currentSlide - 1 : currentSlide + 1;
    
            if (nextSlide < 0) {
              sliderRef.current.slickGoTo(slideCount - 1);
            } else if (nextSlide >= slideCount) {
              sliderRef.current.slickGoTo(0);
            } else {
              sliderRef.current.slickGoTo(nextSlide);
            }
          }, 1000);
        }
    };
    
    const handleMouseLeave = () => {
    clearInterval(slideInterval);
    };
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '60px',
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false,
            },
        }],
    };      

    return (
        <div className='displayProductContents'>
            <div className="productTitle">
                <h1>Desire To Fly</h1>
            </div>
            <div className="product-container" >
                {/* Grid to display the main product with the middle for modal  */}
                <div className="sideImageProduct-1">
                    <img className='sideImage' src={imageMain.icon}/>
                </div>
                <div className="mainImageProduct">
                    <div>
                    <img className='mainImage' src={imageMain.icon}/>
                    </div>
                </div>
                <div className="sideImageProduct-2">
                    <img className='sideImage' src={imageMain.icon}/>
                </div>
            </div>
            <div className="carousel-container">
                <Slider {...settings} ref={sliderRef}>
                    <div>
                        <div
                            className="image-container"
                            onMouseEnter={() => handleMouseEnter('left')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img src={imageMain.icon} alt="Image 1" className="carousel-image" />
                        </div>
                    </div>
                    <div>
                        <div className="image-container">
                            <img src={imageMain.icon} alt="Image 2" className="carousel-image" />
                        </div>
                    </div>
                    <div>
                        <div className="image-container">
                            <img src={imageMain.icon} alt="Image 3" className="carousel-image" />
                        </div>
                    </div>
                    <div>
                        <div
                            className="image-container"
                            onMouseEnter={() => handleMouseEnter('right')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img src={imageMain.icon} alt="Image 4" className="carousel-image" />
                        </div>
                    </div>
                    <div>
                        <div className="image-container">
                            <img src={imageMain.icon} alt="Image 5" className="carousel-image" />
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    );

}

export default ProductDisplayTemp;