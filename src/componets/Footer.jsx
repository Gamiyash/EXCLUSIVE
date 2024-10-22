import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 w-full">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4 sm:px-6 md:px-8 lg:px-12">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Shop</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-white transition-colors">New Arrivals</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Best Sellers</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Sale</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Collections</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Size Guide</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">About Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-white transition-colors">Our Story</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Press</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Sustainability</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Cookie Policy</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Accessibility</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Stay Connected</h3>
          <p className="text-sm mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
          <form className="space-y-2">
            <input type="email" placeholder="Enter your email" className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
            <button type="submit" className="w-full bg-white text-gray-900 hover:bg-gray-200">Subscribe</button>
          </form>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              < FaGithub size={20} />
              <span className="sr-only">Github</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedin size={20} />
              <span className="sr-only">Linkedin</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaTwitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaEnvelope size={20} />
              <span className="sr-only">Mail</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
        <p>&copy; 2024 Your E-commerce Store. All rights reserved.</p>
      </div>
    </footer>
  )
}