import React from "react";
import Carousel from "antd/lib/carousel";
import "@/styles/carousel.css";

function MainCarousel({ children, className }: { children: React.ReactNode; className: any }) {
  return (
    <Carousel autoplay dotPosition="top" className={className} style={{ width: 408, height: 235, display: "flex" }}>
      {children}
    </Carousel>
  );
}

export default MainCarousel;