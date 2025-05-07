import Image from "next/image"
import ClickPhoto from "@/assets/click-photo.jpg"
import Processing from "@/assets/processing.jpg"
import Greenry from "@/assets/happy-greens.jpg"
import Header from "@/components/header"
import { siteConfig } from "@/config/site"

export default function HowItWorks() {
  return (
    <section className="container pt-24 px-8">
      <div>
        <Header heading={`How ${siteConfig.name} Works?`} />
      </div>
      <div className="grid md:grid-cols-3 gap-8 w-full mt-16">
        <div>
          <div className="h-72 relative">
            <Image
              src={ClickPhoto}
              alt="A person clicking photo of plant"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="py-4 text-center">
            <p>
            Welcome to Vriddhi, your go-to platform for ensuring the health and vitality of plants. Inspired by the Sanskrit word meaning "growth" and "development," Vriddhi is designed to provide comprehensive support for identifying and diagnosing plant diseases. Our advanced image recognition and analysis technology empower users to detect plant health issues quickly and accurately.
            </p>
          </div>
        </div>
        <div>
          <div className="h-72 relative">
            <Image
              src={Processing}
              alt="Computer Processing the instruction"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="py-4 text-center">
            <p>
            Whether you’re a gardening enthusiast, a horticulturist, or someone who simply loves nature, Vriddhi helps you take the next step in nurturing plants and ensuring they thrive. Through AI-powered health assessments and disease detection, we aim to make plant care easier, one leaf at a time.
            </p>
          </div>
        </div>
        <div>
          <div className="h-72 relative">
            <Image
              src={Greenry}
              alt="Happy and Green Plants"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="py-4 text-center">
            <p>
            Join us in fostering the growth of healthy plants across the world, and let Vriddhi guide you on your green journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
