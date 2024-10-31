"use client"

import { useState, useEffect } from "react"
import { Github } from "@medusajs/icons"
import { Heading } from "@medusajs/ui"
import { Button } from "@nextui-org/react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// List of images for the slider
import heroImage1 from "../../../../../public/hero.jpeg"
import heroImage2 from "../../../../../public/div.jpg"
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
    <div className="h-[20vh] md:h-[75vh] w-full border-b border-ui-border-base relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full h-full relative">
            <Image
              src={image}
              fill
              alt={`Hero Image ${index + 1}`}
              className="h-full w-full object-cover object-right"
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
      <div className="absolute inset-0 flex justify-between items-center px-4 z-30">
        <button
          onClick={goToPreviousImage}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          {"<"}
        </button>
        <button
          onClick={goToNextImage}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          {">"}
        </button>
      </div>
    </div>
  )
}

export default Hero
