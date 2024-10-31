import React from "react"
import Image from "next/image"
import anImage from "../../../../public/cat1.webp"

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
            src={anImage} // Replace with your actual image path
            alt="Product"
            width={400} // Set width and height as needed
            height={400} // Use exact dimensions for best optimization
            className="object-cover"
          />
        </div>
        <div className="flex flex-col w-full small:max-w-[600px] gap-y-8">
          {/* Static title */}
          <h1 className="text-2xl font-bold">Product Title</h1>

          {/* Static description */}
          <p className="text-lg text-gray-700">
            This is a static description of the product. It highlights key
            features and details to entice users.
          </p>

          {/* Button to navigate to the purchase page */}
          <a
            href="/purchase-page-url"
            className="bg-blue-600 text-white py-2 px-4 rounded text-center inline-block"
          >
            Buy Now
          </a>
        </div>
      </div>
    </>
  )
}

export default StaticProductTemplate
