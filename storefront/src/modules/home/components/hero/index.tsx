"use client"

import { useState, useEffect } from "react"
import { Github } from "@medusajs/icons"
import { Heading } from "@medusajs/ui"
import { Button } from "@nextui-org/react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// List of images for the slider
import heroImage1 from "../../../../../public/hero.jpeg"
import heroImage2 from "../../../../../public/hero.jpeg"
import heroImage3 from "../../../../../public/hero.jpeg"

const images = [heroImage1, heroImage2, heroImage3]

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextImage()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="h-[35vh] md:h-[75vh] w-full border-b border-ui-border-base relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="min-w-full h-[35vh] md:h-[75vh] flex-shrink-0 relative"
          >
            <Image
              src={image}
              width={1920}
              height={1080}
              alt={`Hero Image ${index + 1}`}
              className="object-cover object-right w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute hidden md:flex inset-0 z-20 flex-col justify-center items-center text-center p-32 gap-6">
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

      {/* Navigation Controls */}
      <button
        onClick={goToPreviousImage}
        className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-full z-30"
      >
        {"<"}
      </button>

      <button
        onClick={goToNextImage}
        className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full z-30"
      >
        {">"}
      </button>

      {/* Dots for Image Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentImageIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default Hero
