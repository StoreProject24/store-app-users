import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import './style.css'
import { XCircleIcon } from "@heroicons/react/24/outline"

export default function ImageGallery({ images, currentIndex, isOpen, toggleVisibility }) {
  return (
    <>
      {isOpen && (
        <div style={overlay} onClick={() => toggleVisibility(!isOpen)}>
          <div style={modal} onClick={e => e.stopPropagation()}>
          <button className="swiper-prev">‹</button>
          <button className="swiper-next">›</button>
            <Swiper
              initialSlide={currentIndex}
              navigation={{
                prevEl: ".swiper-prev",
                nextEl: ".swiper-next"
              }}
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              breakpoints={{
                0: {
                  slidesPerView: 1
                },
                768: {
                  slidesPerView: 1
                }
              }}
            >
              {images.map(img => (
                <SwiperSlide key={img.id}>
                  <img src={img.urlImage} style={image} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button onClick={() => toggleVisibility(!isOpen)} style={closeBtn}>
              <XCircleIcon className="text-white w-10 h-10 z-10" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.8)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

const closeBtn = {
  position: "absolute",
  top: -40,
  right: 0,
  background: "none",
  border: "none",
  color: "white",
  fontSize: 30,
  cursor: "pointer"
}


const modal = {
  position: "relative",
  width: "100%",
  maxWidth: "900px",
  padding: "0 16px"
}

const image = {
  width: "100%",
  height: "80vh",
  objectFit: "contain"
}
