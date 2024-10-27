import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import logo from "../../../../../public/logo.png"
import Image from "next/image"
import { IoCart } from "react-icons/io5"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="absolute top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto duration-200  border-ui-border-base">
        <nav className="content-container  text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              <div className="block md:hidden">
                <Image
                  src={logo}
                  width={170}
                  height={64}
                  alt="Medusa Store logo"
                />
              </div>

              <div className="hidden md:block">
                <Image
                  src={logo}
                  width={250}
                  height={64}
                  alt="Medusa Store logo"
                />
              </div>
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <div className="text-lg">
                    <p className=" flex">
                      <IoCart className="text-2xl" aria-hidden="true" />0
                    </p>
                  </div>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
