"use client"

import { Heading } from "@medusajs/ui"
import { Button } from "@nextui-org/react"
import heroImage1 from "../../../../../public/hero.jpeg"
import heroImage2 from "../../../../../public/hero.jpeg"
import heroImage3 from "../../../../../public/hero.jpeg"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

const Hero = () => {
  const heroImages = [heroImage1, heroImage2, heroImage3]

  return (
    <div className="relative h-[20vh] md:h-[75vh] w-full border-b border-ui-border-base">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="h-full w-full"
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            <Image
              src={image}
              fill
              alt={`Hero Background ${index + 1}`}
              className="object-cover object-right"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Content */}
      <div className="absolute hidden md:flex inset-0 z-20 flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-6xl text-white mb-5 font-semibold"
          >
            Welcome to Our Store
          </Heading>
        </span>
        <LocalizedClientLink href="/store">
          <Button className="bg-primary text-white" size="lg" variant="solid">
            Shop Now
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
