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
<div
  className="grid gap-4 items-center justify-center mx-4 my-4 sm:my-0
             grid-cols-3 sm:grid-cols-3 sm:grid-cols-3 lg:grid-cols-6"
  id="achievements-section"
>
  {achievement.icons?.map((icon, i) => {
    return (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: i * 0.3 }}
        className="flex justify-center items-center"
      >
        <Image
          src={`/images/${icon}`}
          alt={`${icon.split(".")[0]} icon`}
          width={40}
          height={40}
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
