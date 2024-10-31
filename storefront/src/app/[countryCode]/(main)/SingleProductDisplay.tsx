"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"

import ProductTemplate from "@modules/products/templates"
import { getRegion, listRegions } from "@lib/data/regions"
import { getProductByHandle, getProductsList } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

// Define your product ID constant
const HOME_PRODUCT_ID = "prod_01JB8714WV196W7DFPCJQWWKQE"

type SingleProductDisplayProps = {
  countryCode?: string // Optional countryCode for specific region
}

const SingleProductDisplay: React.FC<SingleProductDisplayProps> = ({
  countryCode,
}) => {
  const [products, setProducts] = useState<
    { product: HttpTypes.StoreProduct; region: HttpTypes.StoreRegion }[]
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductsForRegions = async () => {
      try {
        if (countryCode) {
          // Fetch region and product for a single country code if provided
          const region = await getRegion(countryCode)
          if (!region) return notFound()

          const product = await getProductByHandle(HOME_PRODUCT_ID, region.id)
          if (!product) return notFound()

          setProducts([{ product, region }])
        } else {
          // Fetch regions and products for all country codes if no countryCode is provided
          const countryCodes = await listRegions().then(
            (regions) =>
              regions
                ?.map((r) => r.countries?.map((c) => c.iso_2))
                .flat()
                .filter(Boolean) as string[]
          )

          const productsList = await Promise.all(
            countryCodes.map(async (code) => {
              const region = await getRegion(code)
              if (!region) return null

              const product = await getProductByHandle(
                HOME_PRODUCT_ID,
                region.id
              )
              return product ? { product, region } : null
            })
          )

          setProducts(
            productsList.filter(Boolean) as {
              product: HttpTypes.StoreProduct
              region: HttpTypes.StoreRegion
            }[]
          )
        }
      } catch (error) {
        console.error("Error fetching products or regions:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchProductsForRegions()
  }, [countryCode])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="pt-10">
      {products.map(({ product, region }) => (
        <ProductTemplate
          key={product.id}
          product={product}
          region={region}
          countryCode={region.countries?.[0]?.iso_2 || ""}
        />
      ))}
    </div>
  )
}

export default SingleProductDisplay
