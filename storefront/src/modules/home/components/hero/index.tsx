import { Github } from "@medusajs/icons"
import { Heading } from "@medusajs/ui"
import { Button, ButtonGroup } from "@nextui-org/react"
import heroImage from "../../../../../public/hero.jpeg"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className=" h-[20vh]  md:h-[75vh] w-full border-b border-ui-border-base relative">
      <Image
        src={heroImage}
        fill
        alt="Hero Background"
        className="absolute inset-0 h-full w-full object-cover object-right "
      />

      {/* Dark Overlay */}


      <div className="absolute hidden md:flex inset-0 z-20  flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-6xl leading-10 text-ui-fg-base mb-5 text-white font-semibold"
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
