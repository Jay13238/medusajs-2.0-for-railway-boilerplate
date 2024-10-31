import { Heading } from "@medusajs/ui"
import { Button } from "@nextui-org/react"
import heroImage from "../../../../../public/hero.jpeg"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"

const Hero = () => {
  return (
    <div className="h-[20vh] md:h-[75vh] w-full border-b border-ui-border-base relative">
      <Image
        src={heroImage}
        fill
        alt="Hero Background"
        className="absolute inset-0 h-full w-full object-cover object-right"
      />

      {/* Dark Overlay */}
      <div className="absolute hidden md:flex inset-0 z-20 flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-6xl text-ui-fg-base mb-5 text-white font-semibold"
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

      {/* Image Slider */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center items-center p-4">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={2}
          className="w-full max-w-2xl"
        >
          <SwiperSlide>
            <Image
              src="/images/product1.jpg"
              width={150}
              height={150}
              alt="Product 1"
              className="rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/product2.jpg"
              width={150}
              height={150}
              alt="Product 2"
              className="rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/product3.jpg"
              width={150}
              height={150}
              alt="Product 3"
              className="rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/product4.jpg"
              width={150}
              height={150}
              alt="Product 4"
              className="rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Hero
