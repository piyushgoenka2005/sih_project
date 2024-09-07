import React from "react";

function Contact() {
  return (
    <div className="flex items-center justify-center mt-10 mb-10 bg-white">
      <div className="w-full max-w-lg p-8 bg-blue-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">
          Contact Us
        </h2>
        <form className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-orange-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 mt-1 text-sm text-gray-700 bg-white border border-orange-300 rounded-md focus:border-orange-500 focus:ring-orange-500"
              placeholder="Enter your name"
            />
          </div>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-orange-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-1 text-sm text-gray-700 bg-white border border-orange-300 rounded-md focus:border-orange-500 focus:ring-orange-500"
              placeholder="Enter your email"
            />
          </div>
          {/* Message Textarea */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-orange-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full px-4 py-2 mt-1 text-sm text-gray-700 bg-white border border-orange-300 rounded-md focus:border-orange-500 focus:ring-orange-500"
              placeholder="Enter your message"
            ></textarea>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:bg-orange-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
