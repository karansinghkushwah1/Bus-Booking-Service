import Image from "next/image";
import { FC } from "react";
import icon1 from "@/public/homePage/icon1.png";
import icon2 from "@/public/homePage/icon2.png";
import icon3 from "@/public/homePage/icon3.png";
import Footer from "@/components/homePage/Footer";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/homePage/Navbar";
import { HeroParallax } from "@/components/ui/hero-parallax";
import Clients from "@/components/clients";
import { products } from "@/data";

const Home: FC = () => {
  return (
    <>
      <Navbar />
      <HeroParallax products={products} />
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">

        <main className="flex flex-col justify-center items-center">
        <section className="features my-8 text-center">
          <h2 className="text-center text-4xl font-extrabold dark:text-white pb-10">
            Why Choose <span className="text-emerald-400">Padharo Hamare Desh?</span>
          </h2>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5 lg:w-10/12 w-11/12 mx-auto my-4">

            <Card className="flex flex-col items-center p-5 h-80">
              <Image src={icon1} alt="Easy online booking" width={400} height={300} className="h-48" />
              <p className="text-emerald-500 text-xl font-bold text-center mt-5">
                Easy online booking
              </p>
              <p className="text-gray-400 text-center mt-2 max-h-16 overflow-hidden">
                Our user-friendly platform allows you to book your bus tickets in just a few clicks, 
                making travel planning a breeze.
              </p>
            </Card>

            <Card className="flex flex-col items-center p-5 h-80">
              <Image src={icon2} alt="Wide network of bus operators" width={400} height={300} className="h-48" />
              <p className="text-emerald-500 text-xl font-bold text-center mt-5">
                Wide network of bus operators
              </p>
              <p className="text-gray-400 text-center mt-2 max-h-16 overflow-hidden">
                We partner with a diverse range of bus operators to offer you the best routes and 
                schedules tailored to your travel needs.
              </p>
            </Card>

            <Card className="flex flex-col items-center p-5 h-80">
              <Image src={icon3} alt="Secure payment gateway" width={400} height={300} className="h-48" />
              <p className="text-emerald-500 text-xl font-bold text-center mt-5">
                Secure payment gateway
              </p>
              <p className="text-gray-400 text-center mt-2 max-h-16 overflow-hidden">
                Your security is our priority. Our payment gateway is encrypted and secure, ensuring 
                a safe transaction every time you book.
              </p>
            </Card>

          </div>
        </section>


          <Clients />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;
