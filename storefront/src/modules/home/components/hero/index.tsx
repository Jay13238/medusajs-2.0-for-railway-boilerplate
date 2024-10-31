import { useState } from "react"
import { Heading } from "@medusajs/ui"
import { Button } from "@nextui-org/react"
import heroImage from "../../../../../public/hero.jpeg"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const images = [
  "/images/product1.jpg",
  "/images/product2.jpg",
  "/images/product3.jpg",
  "/images/product4.jpg",
]

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

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

      {/* Custom Image Slider */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center p-4 bg-black/60">
        <div className="relative w-full max-w-2xl flex justify-center items-center">
          <button
            onClick={handlePrevious}
            className="absolute left-0 p-2 text-white bg-black/50 rounded-full"
          >
            ❮
          </button>
          <Image
            src={images[currentIndex]}
            width={150}
            height={150}
            alt={`Product ${currentIndex + 1}`}
            className="rounded-lg"
          />
          <button
            onClick={handleNext}
            className="absolute right-0 p-2 text-white bg-black/50 rounded-full"
          >
            ❯
          </button>
        </div>
        <div className="flex mt-4 gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              } cursor-pointer`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
