"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image"; // Import Image component for displaying icons
import { motion } from "framer-motion"; // Import motion for animations

const AnimatedNumbers = dynamic(
  () => import("react-animated-numbers"),
  { ssr: false }
);

const achievementsList = [
  {
    metric: "Projects",
    value: "50",
    postfix: "+",
  },
  {
    metric: "Certificates",
    value: "5",
    postfix: "+",
  },
  {
    metric: "Years",
    value: "2",
    postfix: "+",
  },
  {
    metric: "Know about",
    icons: [
      "javascript.png",
      "ts.png",
      "dart.png",
      "python.png",
      "flutter.png",
      "react.png",
      "mui.png",
      "mysql.png",
      "firebase.png", 
    ],
  },
];

const AchievementsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const achievementsSection = document.getElementById("achievements-section");
      const sectionPosition = achievementsSection.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      if (sectionPosition < viewportHeight * 0.8) {
        setIsVisible(true);
        window.removeEventListener("scroll", handleScroll); // Clean up to prevent repeated calls
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up on unmount
  }, []);

  return (
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16" id="achievements-section">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
          >
            {achievement.value ? (
              <h2 className="text-white text-4xl font-bold flex flex-row">
                <AnimatedNumbers
                  includeComma
                  animateToNumber={parseInt(achievement.value)}
                  locale="en-US"
                  className="text-white text-4xl font-bold"
                  configs={(_, index) => ({
                    mass: 1,
                    friction: 100,
                    tensions: 140 * (index + 1),
                  })}
                />
                {achievement.postfix}
              </h2>
            ) : (
              <div className="flex gap-4">
                {achievement.icons?.map((icon, i) => {
                  // Check if the icon is "firebase.png" or "mysql.png" for larger size
                  const isLargeIcon = icon === "firebase.png" || icon === "mysql.png";
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: -20 }} // Start off-screen
                      animate={isVisible ? { opacity: 1, y: 0 } : {}} // Animate to on-screen
                      transition={{ duration: 0.5, delay: i * 0.3 }} // Add delay for sliding effect
                      className="flex justify-center items-center" // Center icon
                    >
                      <Image
                        src={`/images/${icon}`}
                        
                        alt={`${icon.split(".")[0]} icon`}
                        width={40} // Set larger width for specific icons
                        height={40} // Set larger height for specific icons
                         className="object-contain ml-2"
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
            <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
