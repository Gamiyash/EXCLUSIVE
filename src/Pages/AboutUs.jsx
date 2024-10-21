import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import './AboutUsPage.css'; // Ensure to add necessary styles in a CSS file

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          {/* <img
            src="./HeroSection.jpg"
            alt="Project workspace"
            className="opacity-30 object-cover w-full h-full"
          /> */}
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">About My Project</h1>
          <p className="mt-6 max-w-3xl text-xl">
            Welcome to my solo e-commerce venture - a passion project built from the ground up.
          </p>
        </div>
      </section>

      {/* Developer's Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">My Journey</h2>
            <p className="mt-4 text-lg text-gray-500">
              As a passionate developer, I embarked on this e-commerce project with a vision to create 
              a unique online shopping experience.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Every line of code, every feature, and every product on this site is a result of countless 
              hours of learning and refining.
            </p>
          </div>
          <div className="relative h-64 sm:h-80 md:h-96">
            <img
              src="./Coder.jpg"
              alt="Developer at work"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Project Vision Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-12">Project Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Innovation", description: "Creative solutions in e-commerce." },
              { title: "Simplicity", description: "Prioritizing simplicity for effortless navigation." },
              { title: "User-Centric", description: "An intuitive shopping experience." },
              { title: "Transparency", description: "Open communication about practices." },
              { title: "Improvement", description: "Evolving with customer needs." },
              { title: "Sustainability", description: "Promoting responsible consumption." },
            ].map((value, index) => (
              <div key={index}>
                <div className="p-6 bg-white shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Used Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-12">Technologies Used</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 ">
          {["React", "Express", "Tailwind CSS", "Node.js", "MongoDB", "RazorpayPayment"].map((tech, index) => (
            <div key={index} className="flex items-center justify-center p-4 bg-white rounded-lg shadow">
              <span className="text-lg font-semibold text-gray-800">{tech}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Future Plans Section */}
      <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-12">Future Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Expanding Product Range", description: "Adding unique, high-quality products." },
              { title: "Enhanced User Experience", description: "Faster load times and personalized experience." },
              { title: "Mobile App Development", description: "A mobile app for a convenient shopping experience." },
              { title: "Community Building", description: "Creating a space for customers to connect." },
            ].map((plan, index) => (
              <div key={index}>
                <div className="p-6 bg-white shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#1a1919] text-primary-foreground py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl mb-6">Join Me on This Journey</h2>
        <p className="text-xl mb-8">
          Your support is crucial in shaping the future of this project. Let's create an amazing shopping experience together.
        </p>
        <button size="lg">
          Explore Products
        </button>
      </section>

      {/* Contact and Social Links */}
      <section className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-8">Connect With Me</h2>
        <div className="flex justify-center space-x-6">
          <a href="https://github.com/Gamiyash" className="text-gray-400 hover:text-white">
            <FaGithub className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaTwitter className="h-6 w-6" />
          </a>
          <a href="https://www.linkedin.com/in/gami-yash-864733257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-400 hover:text-white">
            <FaLinkedin className="h-6 w-6" />
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=yashgami.it.15@gmail.com" className="text-gray-400 hover:text-white">
            <FaEnvelope className="h-6 w-6" />
          </a>
        </div>
      </section>
    </div>
  );
}
