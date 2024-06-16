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
import Link from "next/link";

const Home: FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        {/* <header className="flex justify-between items-center mb-4">
          <div className="logo">
            <Image
              src={logo}
              alt="Padharo Hamare Desh Logo"
              width={150}
              height={50}
            />
          </div>
          <nav className="flex justify-between items-center">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-lg font-bold hover:text-orange-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-bold hover:text-orange-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-bold hover:text-orange-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </header> */}
        <main className="flex flex-col justify-center items-center">
          <section className="hero relative">
            <Image
              src={landscape}
              alt="India's Diverse Landscapes"
              width={1200}
              height={400}
            />
            <div className="hero-overlay absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
              <h1 className="text-4xl font-bold">Padharo Hamare Desh</h1>
              <p className="text-lg">Book bus tickets online with ease</p>
              <Link href={'/auth/signIn'}>
              <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                Book Now
              </button>
              </Link>
              
            </div>
          </section>
          <section className="features my-8 text-center">
            <h2 className="text-2xl font-bold">
              Why Choose Padharo Hamare Desh?
            </h2>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5 lg:w-10/12 w-11/12 mx-auto my-10">
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
          <section className="testimonials my-8 text-center">
            <h2 className="text-2xl font-bold">What Our Customers Say</h2>
            <ul className="flex justify-around mt-4">
              <li className="flex flex-col items-center">
                <Image
                  src={textimonial}
                  alt="Customer Testimonial"
                  width={100}
                  height={100}
                />
                <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
                  <p className="text-lg">
                    "Padharo Hamare Desh made my bus booking experience seamless
                    and hassle-free!" - Rohan, Delhi
                  </p>
                </blockquote>
              </li>
              <li className="flex flex-col items-center">
                <Image
                  src={textimonial1}
                  alt="Customer Testimonial"
                  width={100}
                  height={100}
                />
                <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
                  <p className="text-lg">
                    "I was impressed by the wide range of bus operators
                    available on Padharo Hamare Desh." - Priya, Mumbai
                  </p>
                </blockquote>
              </li>
            </ul>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;
