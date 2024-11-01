import React from "react"
import Image from "next/image"
import Link from "next/link"

const StaticProductTemplate: React.FC = () => {
  return (
    <>
      <div
        className="content-container pt-14 flex flex-col small:flex-row small:items-start py-6 relative gap-8 max-w-4xl w-full mx-auto "
        data-testid="static-product-container"
      >
        <div className="block w-full max-w-[400px]">
          {/* Static image using Next.js Image component */}
          <Image
            src="/cat1.webp" // Use the direct path from the public directory
            alt="Product"
            width={400} // Set width and height as needed
            height={400} // Use exact dimensions for best optimization
            className="object-cover"
          />
        </div>
        <div className="flex flex-col w-full small:max-w-[600px] gap-y-8">
          {/* Static title */}
          <h1 className="text-2xl font-bold">Sustain Me</h1>

          {/* Static description */}
          <p className="text-lg text-gray-700">
            Feeling tired of chasing quick fixes and fad diets? In Sustain Me,
            renowned health expert Barbara O&apos;Neill unveils a revolutionary
            approach to well-being built on nine core principles. This
            easy-to-understand guide consisting of over 240 pages and full color
            graphics offers a roadmap to lasting health.
          </p>

          {/* Button to navigate to the purchase page */}
          <Link href="/purchase-page-url">
            <a className="bg-blue-600 text-white py-2 px-4 rounded text-center inline-block">
              Buy Now
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default StaticProductTemplate
