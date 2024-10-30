"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaRocket, FaTools, FaUsers } from "react-icons/fa";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const AboutPage = () => {
  return (
    <main className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <section className="container mx-auto px-5">
        <div className="container mx-auto px-4 py-6 text-center">
          <motion.h1
            className="text-4xl font-bold mb-4 dark:text-white"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            About TechTalk
          </motion.h1>
          <motion.p
            className="text-xl dark:text-gray-400"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Empowering Tech Enthusiasts Worldwide
          </motion.p>
        </div>

        <div className="container mx-auto px-4 pb-6">
          <section className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                className="text-4xl font-bold dark:text-white mb-6"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Our Story
              </motion.h2>
              <motion.p
                className="text-lg dark:text-gray-400 mb-8"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                At{" "}
                <span className="dark:text-blue-400 font-semibold">
                  tacQue
                </span>
                , we believe in more than just providing services—we believe in
                creating memorable experiences. Our journey started with a
                simple vision: to redefine the way you connect with technology,
                making it fast, reliable, and accessible for everyone.
              </motion.p>
              <motion.p
                className="text-lg dark:text-gray-400 mb-8"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                From our humble beginnings, we’ve grown into a team that’s
                dedicated to innovation and excellence. With every project, we
                strive to deliver more than just solutions—we deliver a promise
                of quality, trust, and a passion for pushing boundaries. At the
                heart of{" "}
                <span className="dark:text-blue-400 font-semibold">
                  tacQue
                </span>
                , it’s always been about you and your success.
              </motion.p>
              <motion.p
                className="text-lg dark:text-gray-400 mb-10"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 1 }}
              >
                Join us on this journey, as we continue to create a community
                where technology is not just a tool, but a gateway to endless
                possibilities.
              </motion.p>
            </div>
          </section>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-6">
        <motion.h2
          className="text-3xl font-bold text-center dark:text-white mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          What We Offer
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: (
                <FaRocket className="w-12 h-12 dark:text-blue-400 mb-4 mx-auto" />
              ),
              title: "Fast & Reliable",
              description:
                "Experience the speed and reliability you need to stay ahead in the tech world. Our services are designed for seamless and efficient performance.",
            },
            {
              icon: (
                <FaUsers className="w-12 h-12 dark:text-blue-400 mb-4 mx-auto" />
              ),
              title: "Community Support",
              description:
                "Join a thriving community of tech enthusiasts. Share insights and seek help from like-minded individuals to enhance your skills.",
            },
            {
              icon: (
                <FaTools className="w-12 h-12 dark:text-blue-400 mb-4 mx-auto" />
              ),
              title: "Hands-On Tools",
              description:
                "Access a variety of tools and resources to troubleshoot and resolve your tech challenges. We equip you with the right tools for success.",
            },
            {
              icon: (
                <FaGraduationCap className="w-12 h-12 dark:text-blue-400 mb-4 mx-auto" />
              ),
              title: "Learning Resources",
              description:
                "Explore tutorials, articles, and guides to expand your knowledge and stay updated on the latest trends in technology.",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg max-w-sm"
              whileHover="hover"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
            >
              {card.icon}
              <h3 className="text-xl font-semibold text-center dark:text-white mb-2">
                {card.title}
              </h3>
              <p className="dark:text-gray-400 text-center">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="text-center pb-6">
        <motion.h2
          className="text-3xl font-semibold mb-4 dark:text-white"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          Join Our Engineering Community
        </motion.h2>
        <motion.p
          className="mb-8 dark:text-gray-400"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          Ready to enhance your engineering knowledge and connect with
          like-minded enthusiasts?
        </motion.p>
        <Link passHref href="/sign-in">
          <motion.div
            className="inline-block"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-500 dark:hover:bg-blue-400 rounded-xl shadow-md transition duration-300 font-semibold">
              Sign Up Now
            </button>
          </motion.div>
        </Link>
      </section>
    </main>
  );
};

export default AboutPage;
