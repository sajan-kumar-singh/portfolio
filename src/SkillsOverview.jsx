import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, animate } from 'framer-motion';

import AngularIcon from './icons/AngularIcon';
import ReactIcon from './icons/ReactIcon';
import NodejsIcon from './icons/NodejsIcon';
import JavaIcon from './icons/JavaIcon';
import JavascriptIcon from './icons/JavascriptIcon';
import TypescriptIcon from './icons/TypescriptIcon';
import MysqlIcon from './icons/MysqlIcon';
import Html5Icon from './icons/Html5Icon';
import Css3Icon from './icons/Css3Icon';
import SpringIcon from './icons/SpringIcon';
import BootstrapIcon from './icons/BootstrapIcon';
import MongoIcon from './icons/MongoIcon';
import GcpIcon from './icons/GcpIcon';
import AwsS3Icon from './icons/AwsS3Icon';
import GitIcon from './icons/GitIcon';
import DockerIcon from './icons/DockerIcon';
import PostmanIcon from './icons/PostmanIcon';
import GithubIcon from './icons/GithubIcon';
import CursorAI from './icons/CursorAI';
import APIIcon from './icons/APIIcon';
import BinarySearchTreeIcon from './icons/BinarySearchTreeIcon';

const iconDictionary = {
  AngularIcon,
  ReactIcon,
  NodejsIcon,
  JavaIcon,
  JavascriptIcon,
  TypescriptIcon,
  MysqlIcon,
  Html5Icon,
  Css3Icon,
  SpringIcon,
  BootstrapIcon,
  MongoIcon,
  GcpIcon,
  AwsS3Icon,
  GitIcon,
  DockerIcon,
  PostmanIcon,
  GithubIcon,
  CursorAI,
  APIIcon,
  BinarySearchTreeIcon,
};

let globalSkillsHaveAnimated = false;

const calculateExperience = (startDateStr) => {
  const startDate = new Date(startDateStr);
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years === 0 && months === 0) return "< 1 month";
  let res = [];
  if (years > 0) res.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) res.push(`${months} mo${months > 1 ? 's' : ''}`);
  return res.join(" ");
};

const getExperienceDecimal = (startDateStr) => {
  const startDate = new Date(startDateStr);
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const decimal = years + (months / 12);
  return decimal.toFixed(1);
};

const CircularProgress = ({ percentage, text, label }) => {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8 flex items-center justify-center">
        <svg className="w-8 h-8 transform -rotate-90">
          <circle
            cx="16"
            cy="16"
            r={radius}
            stroke="currentColor"
            strokeWidth="2.5"
            fill="transparent"
            className="text-gray-700"
          />
          <circle
            cx="16"
            cy="16"
            r={radius}
            stroke="currentColor"
            strokeWidth="2.5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-emerald-400"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[10px] font-bold text-white">{text}</span>
      </div>
      <span className="text-xs text-gray-400 font-medium w-8 text-left">{label}</span>
    </div>
  );
};

const maxExperienceDenominator = parseFloat(getExperienceDecimal("May 2022"));

const AnimatedSkillRow = ({ skill, idx, totalSkills, progress }) => {
  const Icon = skill.icon ? iconDictionary[skill.icon] : null;

  const step = 1 / totalSkills;
  const start = idx * step;
  const end = start + step;

  const finalExpDecimal = parseFloat(getExperienceDecimal(skill.start));
  const finalRating = skill.rating.toFixed(1);
  const finalWidth = (skill.rating / 10) * 100;

  const getExpText = (decimal) => {
    const totalMonths = Math.round(decimal * 12);
    const y = Math.floor(totalMonths / 12);
    const m = totalMonths % 12;
    let res = [];
    if (y > 0) res.push(`${y} yr${y > 1 ? 's' : ''}`);
    if (m > 0) res.push(`${m} mo${m > 1 ? 's' : ''}`);
    if (res.length === 0) return "< 1 month";
    return res.join(" ");
  };

  const [isLocked, setIsLocked] = useState(globalSkillsHaveAnimated);

  // Animation states
  const [displayRating, setDisplayRating] = useState(globalSkillsHaveAnimated ? finalRating : "0.0");
  const [displayWidth, setDisplayWidth] = useState(globalSkillsHaveAnimated ? finalWidth : 0);
  const [displayExpText, setDisplayExpText] = useState(globalSkillsHaveAnimated ? getExpText(finalExpDecimal) : "0 mo");

  const animatedRef = useRef(globalSkillsHaveAnimated);

  useMotionValueEvent(progress, "change", (latest) => {
    if (latest >= end && !isLocked) {
      setIsLocked(true);
    }
  });

  useEffect(() => {
    if (isLocked && !animatedRef.current) {
      animatedRef.current = true;
      globalSkillsHaveAnimated = true; // Mark as globally animated

      // 1. Animate Rating
      animate(0, skill.rating, {
        duration: 1,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayRating(latest.toFixed(1))
      });

      // 2. Animate Bar Width
      animate(0, finalWidth, {
        duration: 1,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayWidth(latest)
      });

      // 3. Animate Experience Time
      animate(0, finalExpDecimal, {
        duration: 1,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayExpText(getExpText(latest))
      });
    }
  }, [isLocked, skill.rating, finalWidth, finalExpDecimal]);

  const rowProgress = useTransform(progress, val => {
    if (isLocked) return 1;
    if (val <= start) return 0;
    if (val >= end) return 1;
    return (val - start) / step;
  });

  const x = useTransform(rowProgress, [0, 1], ["50vw", "0vw"]);
  const opacity = useTransform(rowProgress, [0, 1], [0, 1]);

  return (
    <motion.tr style={{ x, opacity }} className="hover:bg-gray-800/30 transition-colors">
      <td className="custom-px-6-py-4 whitespace-nowrap font-medium text-white">
        <div className="flex items-center gap-3">
          {Icon ? (
            <div className={`flex items-center justify-center flex-shrink-0 ${skill.bgWhite ? 'bg-white rounded-md p-1 w-8 h-8' : 'w-8 h-8'}`}>
              <Icon size={skill.bgWhite ? 20 : 28} />
            </div>
          ) : (
            <div className="w-8 h-8 flex-shrink-0"></div>
          )}
          <span>{skill.name}</span>
        </div>
      </td>
      <td className="custom-px-6-py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="w-full bg-gray-700 rounded-full h-2.5 min-w-[100px] max-w-[100px]">
            <div className="bg-emerald-400 h-2.5 rounded-full" style={{ width: `${displayWidth}%` }}></div>
          </div>
          <span className="text-xs text-gray-400">{displayRating}/10</span>
        </div>
      </td>
      <td className="custom-px-6-py-4 whitespace-nowrap">
        {displayExpText} <span className="text-gray-500">/ {maxExperienceDenominator} Years</span>
      </td>
      <td className="custom-px-6-py-4">
        <div className="flex flex-col gap-1">
          <span className="text-gray-300 text-sm">{skill.description || "—"}</span>
          {skill.link && (
            <a href={skill.link} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors text-xs flex items-center gap-1 w-max custom-mt-0-5 font-medium">
              View Proof <span className="text-[10px]">↗</span>
            </a>
          )}
        </div>
      </td>
    </motion.tr>
  );
};

const AnimatedSkillsTable = ({ skillsData }) => {
  const containerRef = useRef(null);
  const totalSkills = skillsData.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end end"]
  });

  return (
    <div ref={containerRef} className="w-full relative" style={{ minHeight: 'max-content', paddingBottom: '25vh' }}>
      <div className="sticky top-[10vh] flex flex-col space-y-4 w-full h-auto custom-p-4 about-detail-container mb-12">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2 custom-mb-4">
          Technical Skills
        </h3>

        <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
              <tr>
                <th scope="col" className="custom-px-6-py-4 whitespace-nowrap">Skill Name</th>
                <th scope="col" className="custom-px-6-py-4 whitespace-nowrap">Proficiency</th>
                <th scope="col" className="custom-px-6-py-4 whitespace-nowrap">Hands on Experience</th>
                <th scope="col" className="custom-px-6-py-4 w-full">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {skillsData.map((skill, idx) => (
                <AnimatedSkillRow
                  key={idx}
                  skill={skill}
                  idx={idx}
                  totalSkills={totalSkills}
                  progress={scrollYProgress}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function SkillsOverview({ skillsData = [] }) {
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!skillsData || skillsData.length === 0) return null;

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  return (
    <>
      {/* Desktop Table View (>= 1024px) */}
      <div className="hidden lg:block w-full">
        <AnimatedSkillsTable skillsData={skillsData} />
      </div>

      {/* Tablet Card View (640px to 1023px) */}
      {isTablet && (
        <div className="flex flex-col space-y-4 w-full h-full custom-p-4 overflow-y-auto about-detail-container">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 custom-mb-4">
            Technical Skills
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {skillsData.map((skill, idx) => {
              const Icon = skill.icon ? iconDictionary[skill.icon] : null;
              return (
                <div key={idx} className="bg-gray-900/50 border border-gray-800 rounded-xl custom-p-4 flex flex-col gap-4 hover:bg-gray-800/30 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    {/* Top Left: Icon & Name */}
                    <div className="flex items-center gap-3 text-white">
                      {Icon ? (
                        <div className={`flex items-center justify-center flex-shrink-0 ${skill.bgWhite ? 'bg-white rounded-md p-1 w-8 h-8' : 'w-8 h-8'}`}>
                          <Icon size={skill.bgWhite ? 20 : 28} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 flex-shrink-0"></div>
                      )}
                      <span className="font-medium text-white">{skill.name}</span>
                    </div>

                    {/* Top Right: Proficiency & Experience */}
                    <div className="flex flex-col items-start gap-2 min-w-fit">
                      <CircularProgress percentage={(skill.rating / 10) * 100} text={skill.rating} label="/10" />
                      <CircularProgress percentage={Math.min(100, (parseFloat(getExperienceDecimal(skill.start)) / maxExperienceDenominator) * 100)} text={getExperienceDecimal(skill.start)} label="Years" />
                    </div>
                  </div>

                  {/* Bottom: Details */}
                  <div className="flex flex-col gap-1 border-t border-gray-800 custom-pt-4">
                    <span className="text-gray-300 text-sm">{skill.description || "—"}</span>
                    {skill.link && (
                      <a href={skill.link} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors text-xs flex items-center gap-1 w-max custom-mt-1 font-medium">
                        View Proof <span className="text-[10px]">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Mobile Card View (<= 639px) */}
      {isMobile && (
        <div className="flex flex-col space-y-4 w-full h-full custom-p-4 overflow-y-auto about-detail-container">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 custom-mb-4">
            Technical Skills
          </h3>
          <div className="flex flex-col gap-4">
            {skillsData.map((skill, idx) => {
              const Icon = skill.icon ? iconDictionary[skill.icon] : null;
              return (
                <div key={idx} className="bg-gray-900/50 border border-gray-800 rounded-xl custom-p-4 flex flex-col gap-4">

                  {/* Top: Logo and Name */}
                  <div className="flex flex-col items-center gap-2 text-white">
                    {Icon ? (
                      <div className={`flex items-center justify-center flex-shrink-0 ${skill.bgWhite ? 'bg-white rounded-md p-1 w-12 h-12' : 'w-12 h-12'}`}>
                        <Icon size={skill.bgWhite ? 28 : 36} />
                      </div>
                    ) : (
                      <div className="w-12 h-12 flex-shrink-0"></div>
                    )}
                    <span className="font-medium text-white text-lg text-center">{skill.name}</span>
                  </div>

                  {/* Middle: Rating (Left) and Experience (Right) */}
                  <div className="flex justify-between items-center bg-gray-800/30 custom-p-4 rounded-lg">
                    <CircularProgress percentage={(skill.rating / 10) * 100} text={skill.rating} label="/10" />
                    <CircularProgress percentage={Math.min(100, (parseFloat(getExperienceDecimal(skill.start)) / maxExperienceDenominator) * 100)} text={getExperienceDecimal(skill.start)} label="Years" />
                  </div>

                  {/* Bottom: Details */}
                  <div className="flex flex-col gap-1 border-t border-gray-800 custom-pt-4 text-center items-center">
                    <span className="text-gray-300 text-sm">{skill.description || "—"}</span>
                    {skill.link && (
                      <a href={skill.link} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors text-xs flex items-center gap-1 custom-mt-1 font-medium">
                        View Proof <span className="text-[10px]">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  );
}
