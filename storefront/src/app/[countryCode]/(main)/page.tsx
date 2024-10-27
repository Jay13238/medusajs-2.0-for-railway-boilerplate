import { Metadata } from "next"
import Image from "next/image"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getCategoriesList } from "@lib/data/categories"
import cat1 from "../../../../public/cat1.webp"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button, Input, Textarea } from "@nextui-org/react"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

//@ts-ignore
export default async function Home({ params: { countryCode } }) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  const { product_categories } = await getCategoriesList(0, 6)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-12 ">
        <div className="max-w-xl w-full mx-auto">
          <p className="text-primary italic text-center pb-10">
            Welcome to The Preparation Ministry. We offer high-quality seminars
            and programs that align with our principles for spiritual, mental,
            and physical well-being. Join us as we empower lives through topics
            like spiritual growth, emotional healing, health, and more.
          </p>
        </div>

        {/* Category List Section */}
        <section className="py-12">
          <h2 className="text-center mb-10">Category List</h2>
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {product_categories?.map((category) => (
              <LocalizedClientLink
                key={category.id}
                href={`/categories/${category.handle}`}
                className="relative w-[350px] h-[250px] block"
              >
                <div className="relative w-full h-full border rounded-md shadow-md p-4 flex items-center justify-center transform transition-transform duration-300 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-black opacity-30 rounded-md z-10"></div>
                  <Image
                    src={cat1}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                  <div className="relative z-20 text-center">
                    <h3 className="text-3xl font-semibold text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="bg-secondary py-16 px-4">
          <h2 className="text-center">Contact us</h2>
          <div className="max-w-md w-full mx-auto">
            <Input
              variant="underlined"
              type="text"
              label="Name"
              placeholder="Enter your name"
              className="w-full"
            />
            <Input
              variant="underlined"
              type="email"
              label="Email"
              placeholder="Enter your email"
              className="w-full"
            />
            <Textarea
              variant="underlined"
              label="Message"
              placeholder="Enter your description"
              className="w-full"
            />
            <Button fullWidth className="mt-3 bg-primary text-white">
              Submit
            </Button>
          </div>
        </section>

        {/* Featured Products */}
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}