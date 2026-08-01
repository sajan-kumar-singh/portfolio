import React from 'react';

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

const skillsData = [
  { name: "Angular", start: "January 2023", rating: 8, icon: AngularIcon, description: "Built scalable enterprise applications and dynamic UIs.", link: "" },
  { name: "React", start: "January 2023", rating: 9, icon: ReactIcon, description: "Developed interactive Single Page Applications (SPAs).", link: "#" },
  { name: "Node.js", start: "January 2023", rating: 8, icon: NodejsIcon, bgWhite: true, description: "Created RESTful backend services and scalable APIs.", link: "" },
  { name: "Java", start: "January 2021", rating: 7, icon: JavaIcon, bgWhite: true, description: "Backend development with the Spring ecosystem.", link: "" },
  { name: "JavaScript (ES6+)", start: "January 2023", rating: 9, icon: JavascriptIcon, description: "Core language for frontend logic and complex scripting.", link: "" },
  { name: "TypeScript", start: "January 2023", rating: 8, icon: TypescriptIcon, description: "Used for type-safe React and Angular projects.", link: "" },
  { name: "SQL", start: "January 2021", rating: 7, icon: MysqlIcon, bgWhite: true, description: "Database design, complex queries, and optimization.", link: "" },
  { name: "HTML5", start: "January 2020", rating: 9, icon: Html5Icon, description: "Semantic markup and accessibility best practices.", link: "" },
  { name: "CSS3", start: "January 2020", rating: 9, icon: Css3Icon, description: "Responsive design, Flexbox, and CSS Grid layouts.", link: "" },
  { name: "Spring Boot", start: "January 2023", rating: 7, icon: SpringIcon, bgWhite: true, description: "Microservices architecture and robust API development.", link: "" },
  { name: "Bootstrap", start: "January 2022", rating: 8, icon: BootstrapIcon, description: "Rapid UI prototyping and responsive grid layouts.", link: "" },
  { name: "RESTful APIs", start: "January 2023", rating: 9, icon: null, description: "Designing highly scalable and secure web services.", link: "" },
  { name: "MongoDB", start: "January 2023", rating: 8, icon: MongoIcon, description: "NoSQL database management and complex aggregations.", link: "" },
  { name: "Google Cloud (Drive API, OAuth 2.0)", start: "January 2023", rating: 7, icon: GcpIcon, description: "Cloud integrations and secure authentication flows.", link: "" },
  { name: "AWS S3", start: "January 2023", rating: 7, icon: AwsS3Icon, description: "Object storage and scalable cloud asset management.", link: "" },
  { name: "Git", start: "January 2023", rating: 8, icon: GitIcon, description: "Version control and collaborative team workflows.", link: "" },
  { name: "GitHub", start: "January 2023", rating: 8, icon: GithubIcon, description: "CI/CD pipelines and repository management.", link: "" },
  { name: "Docker", start: "January 2023", rating: 6, icon: DockerIcon, description: "Containerized applications for consistent environments.", link: "" },
  { name: "Postman", start: "January 2023", rating: 9, icon: PostmanIcon, description: "API testing, comprehensive documentation, and mocking.", link: "" },
  { name: "Cursor AI", start: "January 2025", rating: 8, icon: null, description: "AI-assisted coding and productivity workflows.", link: "" },
  { name: "Data Structures & Algorithms", start: "January 2019", rating: 8, icon: null, description: "Problem-solving and optimized code execution.", link: "" }
];

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

export default function SkillsOverview() {
  return (
    <div className="flex flex-col space-y-4 w-full h-full custom-p-4 overflow-y-auto about-detail-container">
      <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
        Technical Skills
      </h3>

      <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/50">
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
              <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                <td className="custom-px-6-py-4 whitespace-nowrap font-medium text-white">
                  <div className="flex items-center gap-3">
                    {skill.icon ? (
                      <div className={`flex items-center justify-center flex-shrink-0 ${skill.bgWhite ? 'bg-white rounded-md p-1 w-8 h-8' : 'w-8 h-8'}`}>
                        <skill.icon size={skill.bgWhite ? 20 : 28} />
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
                      <div className="bg-emerald-400 h-2.5 rounded-full" style={{ width: `${(skill.rating / 10) * 100}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-400">{skill.rating}/10</span>
                  </div>
                </td>
                <td className="custom-px-6-py-4 whitespace-nowrap">
                  {calculateExperience(skill.start)}
                </td>
                <td className="custom-px-6-py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-300 text-sm">{skill.description || "—"}</span>
                    {skill.link && (
                      <a href={skill.link} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors text-xs flex items-center gap-1 w-max mt-0.5 font-medium">
                        View Proof <span className="text-[10px]">↗</span>
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
