import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';

const ContactPage = () => {
    return (
      <div className="md:min-h-screen flex items-center justify-center bg-jaffa-500 bg-gradient-to-br from-[#FFD3A8] via-[#FFB370] to-[#FF8736]">
        <div className="bg-white border-4 border-jaffa-400 p-8 lg:rounded-2xl shadow-md w-full max-w-4xl flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Get in touch</h2>
            <p className="mb-6 text-gray-700">Send us a message if you have any question, we are here to help!</p>
            <form>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Your name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your Email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Write your message"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="hover:bg-jaffa-600 transition-all duration-700 bg-jaffa-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                >
                  Send Now
                </button>
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/5">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">Address</h3>
              <p className="text-gray-700">Philippines</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">Contact number</h3>
              <p className="text-gray-700"> 1234-567-8900 </p>
            </div>
            <div className="mt-4 flex space-x-4">
              {/* Replace with actual icons and links */}
              <a href="#" ><FontAwesomeIcon icon={faFacebookF} className="size-4"/></a>
              <a href="#" ><FontAwesomeIcon icon={faTwitter} className="size-4" /></a>
              <a href="#" ><FontAwesomeIcon icon={faInstagram} className="size-4" /></a>
              <a href="#" ><FontAwesomeIcon icon={faGoogle} className="size-4" /></a>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ContactPage