/* eslint-disable @next/next/no-img-element */
import React from "react";

const AboutPage = () => {
  return (
    <div>
      <section className="relative py-5 lg:pt-32 overflow-hidden pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 mb-24 lg:grid-cols-12 xl:gap-24 lg:gap-6 gap-4 items-center">
            <div className="w-full lg:col-span-5 lg:pb-0 pb-12 md:order-first">
              <div className="text-center lg:text-left lg:max-w-xl">
                <h1 className="pb-5 text-center text-gray-900 font-extrabold font-manrope text-5xl lg:text-left">
                  It&apos;s all about the
                  <span className="block text-jaffa-600 font-extrabold font-manrope text-5xl leading-relaxed">
                    learning journey
                  </span>
                </h1>
              </div>
            </div>
            <div className="w-full lg:col-span-7 ">
              <p className="text-lg text-gray-500 font-normal text-center lg:text-right max-w-xl mx-auto lg:mr-0">
                At Code Spirited, we are dedicated to transforming aspiring
                developers into skilled professionals. Our unique peer-to-peer
                learning approach ensures that every participant not only learns
                coding but also builds invaluable connections within the tech
                community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative bg-cover bg-center w-full h-auto py-12 bg-jaffa-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-[240px] lg:max-w-xs text-white font-manrope font-extrabold text-5xl leading-tight lg:text-7xl text-right ml-auto lg:leading-[1.4]">
            Unlock Your Coding Potential
          </h2>
        </div>
      </div>

      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-medium text-sm text-jaffa-500 uppercase mb-2 max-md:text-center">
            CODE SPIRITED
          </p>
          <h2 className="font-manrope font-semibold text-4xl md:text-5xl text-gray-900 max-w-4xl md:leading-snug mb-6 max-md:text-center">
            &quot;Empowering Through Collaboration: A New Era in Coding
            Education&quot;
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-3 mb-12 lg:mb-24">
            <p className="font-normal text-lg text-gray-500 max-md:text-center">
              Our &apos;Empowering Through Collaboration: A New Era in Coding
              Education&apos; module forms the backbone of our bootcamp,
              harmonizing individual growth with collective learning.
            </p>
            <p className="font-normal text-lg text-gray-500 max-md:text-center">
              This component embodies a suite of thoughtfully designed courses,
              hands-on projects, and collaborative exercises aimed at enhancing
              technical skills and fostering a supportive learning environment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
