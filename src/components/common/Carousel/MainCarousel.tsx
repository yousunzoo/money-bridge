import "@/styles/carousel.css";
import { Carousel } from "antd";
import { ReactNode } from "react";

function MainCarousel({ children, className }: { children: ReactNode; className: string }) {
  return (
    <Carousel draggable={true} autoplay dotPosition="top" className={`${className} mainCarousel`}>
      {children}
    </Carousel>
  );
}

export default MainCarousel;
