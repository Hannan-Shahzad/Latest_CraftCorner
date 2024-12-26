

"use client";
import React from "react";
import Slider from "react-slick";
import Slide from "./Slide";

const Hero = () => {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slideData = [
    {
      id: 1,
      img: "/crochet1.jpg",
      title: "Trending Items",
      mainTitle: "WOMEN'S LATEST FASHION SALE",
      price: "$15",
    },
    {
      id: 2,
      img: "/crochet2.jpg",
      title: "Trending Items",
      mainTitle: "WOMEN'S LATEST FASHION SALE",
      price: "$20",
    },
    {
      id: 3,
      img: "/crochet3.jpg",
      title: "Trending Items",
      mainTitle: "WOMEN'S LATEST FASHION SALE",
      price: "$25",
    },
  ];

  return (
    <div>
      <div className="container pt-6 lg:pt-0">
        <Slider {...settings}>
          {slideData.map((item) => (
            <Slide
              key={item.id}
              img={item.img}
              title={item.title}
              mainTitle={item.mainTitle}
              price={item.price}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
