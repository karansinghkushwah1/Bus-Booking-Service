import Image from "next/image";
import { FC } from "react";
import logo from "@/public/homePage/logoDesign.png";
import icon1 from "@/public/homePage/icon1.png";
import icon2 from "@/public/homePage/icon2.png";
import icon3 from "@/public/homePage/icon3.png";
import textimonial from "@/public/homePage/testimonial1.png";
import textimonial1 from "@/public/homePage/testimonial2.png";
import landscape from "@/public/homePage/landscape.png";
import Footer from "@/components/homePage/Footer";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/homePage/Navbar";
import { HeroParallax } from "@/components/ui/hero-parallax";
import Link from "next/link";
import Clients from "@/components/clients";
import volvoThumbnail from "@/public/buses/volvo.jpg"; // Import the thumbnail for Volvo Buses
import miniBusThumbnail from "@/public/buses/mini.jpg"; // Add the correct path for mini bus
import touristBusThumbnail from "@/public/buses/tourist.jpg"; // Add the correct path for tourist bus
import staffBusThumbnail from "@/public/buses/staff.jpg"; // Add the correct path for staff bus


export const products = [
  {
    title: "Volvo Buses",
    link: "",
    thumbnail:
      volvoThumbnail,
  },
  {
    title: "Mini Buses",
    link: "",
    thumbnail:
      miniBusThumbnail,
  },
  {
    title: "Tourist Buses",
    link: "",
    thumbnail:
      touristBusThumbnail,
  },
 
  {
    title: "Staff Buses",
    link: "",
    thumbnail:
      staffBusThumbnail,
  },
  
  
];

const Home: FC = () => {
  return (
    <>
      <Navbar />
      <HeroParallax products={products} />;
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        
        <main className="flex flex-col justify-center items-center">
          <section className="features my-4 text-center">
            <h2 className="text-2xl font-bold">
              Why Choose Padharo Hamare Desh?
            </h2>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5 lg:w-10/12 w-11/12 mx-auto my-4">
              <Card className="flex flex-col items-center p-5">
                <Image src={icon1} alt="inventory" width={400} height={400} />
                <p className="text-blue-500 text-xl font-bold text-center">
                  Easy online booking
                </p>
              </Card>

              <Card className="flex flex-col items-center p-5">
                <Image
                  src={icon2}
                  alt="repair service"
                  width={400}
                  height={400}
                />
                <p className="text-blue-500 text-xl font-bold text-center">
                  Wide network of bus operators
                </p>
              </Card>

              <Card className="flex flex-col items-center p-5">
                <Image src={icon3} alt="job order" width={400} height={400} />
                <p className="text-blue-500 text-xl font-bold text-center">
                  Secure payment gateway
                </p>
              </Card>
            </div>
            {/* <h2 className="text-2xl font-bold">
            Why Choose Padharo Hamare Desh?
          </h2>
          <ul className="flex justify-around mt-4">
            <li className="flex flex-col items-center">
              <Image src={icon1} alt="Easy Booking" width={50} height={50} />
              <p className="text-lg">Easy online booking</p>
            </li>
            <li className="flex flex-col items-center">
              <Image src={icon2} alt="Wide Network" width={50} height={50} />
              <p className="text-lg">Wide network of bus operators</p>
            </li>
            <li className="flex flex-col items-center">
              <Image src={icon3} alt="Secure Payment" width={50} height={50} />
              <p className="text-lg">Secure payment gateway</p>
            </li>
          </ul> */}
          </section>
          <section className="testimonials text-center">
            {/* <h2 className="text-2xl font-bold">What Our Customers Say</h2> */}
            <Clients/>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;
