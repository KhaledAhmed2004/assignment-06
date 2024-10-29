// import React from "react";
// import { FaUserSecret } from "react-icons/fa";
// import { FiTarget } from "react-icons/fi";
// import { GiLightBulb } from "react-icons/gi";

// const page = () => {
//   return (
//     <div>
//       <div className="container mx-auto px-5">
//         <div className="container mx-auto px-4 py-6">
//           <h1 className="text-4xl font-bold mb-4 text-primary-text">
//             About TechTalk
//           </h1>
//           <p className="text-xl text-secondary-text">
//             Empowering Tech Enthusiasts Worldwide
//           </p>
//         </div>

//         <main className="container mx-auto px-4 py-5">
//           <section className="bg-white p-6 rounded-lg shadow-md mb-4 md:mb-12">
//             <h2 className="text-3xl font-semibold mb-2 md:mb-4 text-primary-text">
//               Our Story
//             </h2>
//             <p className="text-lg mb-2 text-secondary-text">
//               TechTalk was created from a deep passion for technology and the
//               desire to build a community where tech enthusiasts can come
//               together to share knowledge, exchange experiences, and stay
//               updated on the latest innovations. Launched in 2024, TechTalk has
//               quickly gained recognition as a comprehensive platform for
//               practical tech solutions, expert insights, and innovative trends.
//               Our mission is to empower individuals to navigate the
//               ever-changing tech landscape by providing a space where everyone
//               from beginners to seasoned professionals can access valuable
//               resources. We cover everything from troubleshooting common tech
//               issues to exploring new software, gadgets, and digital tools.
//               Whether you&apos;re looking for product reviews, tutorials, or
//               hands-on advice from industry experts, TechTalk has something for
//               everyone. What sets TechTalk apart is our commitment to fostering
//               a vibrant, interactive community. Users can not only learn but
//               also contribute their own insights and experiences, enriching the
//               platform with diverse perspectives. Additionally, TechTalk offers
//               personalized content, user-generated discussions, and premium
//               features for those who want to delve deeper into specific tech
//               topics. With a focus on collaboration, innovation, and education,
//               TechTalk is your go-to destination for staying ahead in the
//               fast-paced world of technology.
//             </p>
//           </section>

//           <section className="grid md:grid-cols-3 gap-8 mb-4 md:mb-12">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <FaUserSecret className="w-12 h-12 text-primary-blue mb-4" />
//               <h3 className="text-xl font-semibold mb-2 text-primary-text">
//                 Our Team
//               </h3>
//               <p className="text-secondary-text">
//                 Our team consists of passionate tech enthusiasts, developers,
//                 and industry experts dedicated to making technology accessible
//                 to everyone. Together, we work to simplify tech, share
//                 knowledge, and empower users to navigate the ever-evolving
//                 digital landscape with confidence.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <GiLightBulb className="w-12 h-12 text-primary-blue mb-4" />
//               <h3 className="text-xl font-semibold mb-2 text-primary-text">
//                 Our Mission
//               </h3>
//               <p className="text-secondary-text">
//                 Our mission is to equip individuals with the knowledge and tools
//                 to confidently navigate and succeed in the digital world,
//                 empowering them to stay informed, solve problems, and embrace
//                 new technologies with ease.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <FiTarget className="w-12 h-12 text-primary-blue mb-4" />
//               <h3 className="text-xl font-semibold mb-2 text-primary-text">
//                 Our Vision
//               </h3>
//               <p className="text-secondary-text">
//                 Our vision is to be the world’s leading platform for tech
//                 education, problem-solving, and community-driven innovation,
//                 creating a space where individuals collaborate, learn, and
//                 advance together in the ever-evolving technology landscape.
//               </p>
//             </div>
//           </section>

//           <section className="bg-white p-6 rounded-lg shadow-md mb-4 md:mb-12">
//             <h2 className="text-3xl font-semibold mb-6 text-primary-text">
//               What We Offer
//             </h2>
//             <ul className="list-disc list-inside text-lg space-y-2 text-secondary-text marker:text-primary-blue">
//               <li>Expert advice on a wide range of tech topics</li>
//               <li>User-generated content and personal experiences</li>
//               <li>Tutorials and guides for common tech issues</li>
//               <li>
//                 Reviews and recommendations for the latest gadgets and software
//               </li>
//               <li>A vibrant community of tech enthusiasts</li>
//               <li>Premium content for those seeking in-depth knowledge</li>
//             </ul>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default page;

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
            className="text-4xl font-bold mb-4 text-primary-text dark:text-white"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            About TechTalk
          </motion.h1>
          <motion.p
            className="text-xl text-secondary-text dark:text-gray-400"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Empowering Tech Enthusiasts Worldwide
          </motion.p>
        </div>

        <div className="container mx-auto px-4 py-5">
          <section className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                className="text-4xl font-bold text-primary-text dark:text-white mb-6"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Our Story
              </motion.h2>
              <motion.p
                className="text-lg text-secondary-text dark:text-gray-400 mb-8"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                At{" "}
                <span className="text-primary-blue dark:text-blue-400 font-semibold">
                  tacQue
                </span>
                , we believe in more than just providing services—we believe in
                creating memorable experiences. Our journey started with a
                simple vision: to redefine the way you connect with technology,
                making it fast, reliable, and accessible for everyone.
              </motion.p>
              <motion.p
                className="text-lg text-secondary-text dark:text-gray-400 mb-8"
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
                <span className="text-primary-blue dark:text-blue-400 font-semibold">
                  tacQue
                </span>
                , it’s always been about you and your success.
              </motion.p>
              <motion.p
                className="text-lg text-secondary-text dark:text-gray-400 mb-10"
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
      
      <section className="container mx-auto px-4 py-10">
        <motion.h2
          className="text-3xl font-bold text-center text-primary-text dark:text-white mb-8"
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
                <FaRocket className="w-12 h-12 text-primary-blue dark:text-blue-400 mb-4 mx-auto" />
              ),
              title: "Fast & Reliable",
              description:
                "Experience the speed and reliability you need to stay ahead in the tech world. Our services are designed for seamless and efficient performance.",
            },
            {
              icon: (
                <FaUsers className="w-12 h-12 text-primary-blue dark:text-blue-400 mb-4 mx-auto" />
              ),
              title: "Community Support",
              description:
                "Join a thriving community of tech enthusiasts. Share insights and seek help from like-minded individuals to enhance your skills.",
            },
            {
              icon: (
                <FaTools className="w-12 h-12 text-primary-blue dark:text-blue-400 mb-4 mx-auto" />
              ),
              title: "Hands-On Tools",
              description:
                "Access a variety of tools and resources to troubleshoot and resolve your tech challenges. We equip you with the right tools for success.",
            },
            {
              icon: (
                <FaGraduationCap className="w-12 h-12 text-primary-blue dark:text-blue-400 mb-4 mx-auto" />
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
              <h3 className="text-xl font-semibold text-center text-primary-text dark:text-white mb-2">
                {card.title}
              </h3>
              <p className="text-secondary-text dark:text-gray-400 text-center">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="text-center pb-6">
        <motion.h2
          className="text-3xl font-semibold mb-4 text-primary-text dark:text-white"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          Join Our Engineering Community
        </motion.h2>
        <motion.p
          className="mb-8 text-secondary-text dark:text-gray-400"
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
