import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import GreenLeaves from "@/assets/green-leaves.jpg"
import { siteConfig } from "@/config/site"

export default function Introduction() {
  return (
    <section className="py-4 md:py-0 min-h-screen grid md:grid-cols-2 place-items-center">
      <div className="w-11/12 md:w-1/2 flex flex-col items-center text-center">
        <h1 className="scroll-m-20 mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl uppercase gradient-text">
          {siteConfig.name}
        </h1>
        <p className="text-center text-sm md:text-base mt-6">
          Your AI-powered companion for plant health and wellness
        </p>
        <p className="text-center text-sm md:text-base mt-2 mb-6">
          Detect diseases • Get treatments • Nurture growth
        </p>
        <Button className="my-7" asChild>
          <Link href="/home">Get Started</Link>
        </Button>
      </div>
      <div className="relative hidden md:block md:w-full md:h-full">
        <Image
          src={GreenLeaves}
          alt="Healthy green plants"
          className="object-cover"
          priority
          fill
        />
      </div>
    </section>
  )
}
