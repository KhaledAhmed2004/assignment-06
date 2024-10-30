"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaPhone, FaClock } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion from framer-motion

const ContactPage = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormVisible(false); // Hide form after submission
  };

  // Show the form with a fade-in effect
  useEffect(() => {
    setFormVisible(true);
  }, []);

  // Define animation variants for the main sections
  const fadeInFromRight = {
    initial: { opacity: 0, x: 100 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }, // Place transition here
    },
  };
  return (
    <main>
      <section className="container px-5 grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-8 lg:py-10 mx-auto">
        <motion.div
          className="h-full"
          variants={fadeInFromRight} // Use the defined animation
          initial="initial"
          animate="animate"
        >
          <p className="mt-3 mb-12 text-lg dark:text-gray-200">
            Have questions or need help? Our team is here to assist you.
          </p>
          <ul className="mb-6 md:mb-0">
            {/* Contact Info Items */}
            <motion.li
              className="flex mb-4 transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0, x: 100 }} // Start off-screen
              animate={{ opacity: 1, x: 0 }} // Move to original position
              transition={{ duration: 0.5, delay: 0.1 }} // Add delay for staggered effect
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-500 text-gray-50 transition ease-in duration-300">
                <FaMapMarkerAlt className="h-6 w-6" />
              </div>
              <div className="ml-4 mb-4">
                <h3 className="mb-2 text-lg font-medium leading-6 dark:text-gray-200">
                  Our Office
                </h3>
                <p className="dark:text-gray-400">123 React Lane</p>
                <p className="dark:text-gray-400">Feni, Bangladesh</p>
              </div>
            </motion.li>

            <motion.li
              className="flex mb-4 transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0, x: 100 }} // Start off-screen
              animate={{ opacity: 1, x: 0 }} // Move to original position
              transition={{ duration: 0.5, delay: 0.2 }} // Add delay for staggered effect
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-500 text-gray-50 transition ease-in duration-300">
                <FaPhone className="h-6 w-6" />
              </div>
              <div className="ml-4 mb-4">
                <h3 className="mb-2 text-lg font-medium leading-6 dark:text-gray-200">
                  Get in Touch
                </h3>
                <p className="dark:text-gray-400">Phone: +880 123 456 789</p>
                <p className="dark:text-gray-400">
                  Email: support@drivenow.com
                </p>
              </div>
            </motion.li>

            <motion.li
              className="flex mb-4 transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0, x: 100 }} // Start off-screen
              animate={{ opacity: 1, x: 0 }} // Move to original position
              transition={{ duration: 0.5, delay: 0.3 }} // Add delay for staggered effect
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-500 text-gray-50 transition ease-in duration-300">
                <FaClock className="h-6 w-6" />
              </div>
              <div className="ml-4 mb-4">
                <h3 className="mb-2 text-lg font-medium leading-6 dark:text-gray-200">
                  Office Hours
                </h3>
                <p className="dark:text-gray-400">
                  Monday - Friday: 09:00 - 18:00
                </p>
                <p className="dark:text-gray-400">Saturday: 10:00 - 14:00</p>
                <p className="dark:text-gray-400">Closed on Sundays</p>
              </div>
            </motion.li>
          </ul>
        </motion.div>

        <motion.div
          className={`w-full p-6 lg:p-8 shadow-lg rounded-xl transition-opacity duration-700`}
          id="form"
          initial={{ opacity: 0, x: 100 }} // Start off-screen
          animate={{
            opacity: isFormVisible ? 1 : 0,
            x: isFormVisible ? 0 : 100,
          }} // Animate based on visibility
          transition={{ duration: 0.5 }} // Animation duration
        >
          <h2 className="text-2xl dark:text-white lg:text-3xl font-semibold text-center mb-3">
            Reach Out to Us
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="mx-0 mb-1 sm:mb-4">
                <label
                  htmlFor="name"
                  className="pb-1 text-xs uppercase tracking-wider dark:text-gray-300"
                ></label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="w-full mb-0.5 rounded-md shadow-sm dark:focus:border-blue-600 dark:bg-gray-800 dark:text-gray-200 border outline-none py-1.5 lg:py-2 px-3"
                  name="name"
                />
              </div>
              <div className="mx-0 mb-1 sm:mb-4">
                <label
                  htmlFor="email"
                  className="pb-1 text-xs uppercase tracking-wider dark:text-gray-300"
                ></label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email address"
                  className="w-full mb-0.5 rounded-md shadow-sm dark:focus:border-blue-600 dark:bg-gray-800 dark:text-gray-200 border outline-none py-1.5 lg:py-2 px-3"
                  name="email"
                />
              </div>
              <div className="mx-0 mb-1 sm:mb-4">
                <label
                  htmlFor="textarea"
                  className="pb-1 text-xs uppercase tracking-wider dark:text-gray-300"
                ></label>
                <textarea
                  id="textarea"
                  name="message"
                  cols={30}
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full mb-0.5 rounded-md shadow-sm dark:focus:border-blue-600 dark:bg-gray-800 dark:text-gray-200 border outline-none py-1.5 lg:py-2 px-3"
                ></textarea>
              </div>
            </div>
            <div className="text-center">
              <button className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition duration-300 font-semibold">
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto mt-10 mb-8 p-4">
        <h2 className="text-2xl dark:text-white font-semibold text-center mb-4">
          Find Us Here
        </h2>
        <div className="rounded-lg shadow-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.5475569046163!2d91.56612031522268!3d23.00042958470349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad3aef88f47c3f%3A0x575d0fbbeb77a40d!2sReact%20Lane%2C%20Feni%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1634235873870!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Google Map Location"
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
