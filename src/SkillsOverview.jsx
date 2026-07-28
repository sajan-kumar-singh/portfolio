import React from 'react';

const skillsData = [
  { name: "Angular", start: "January 2023", rating: 8 },
  { name: "React", start: "January 2023", rating: 9 },
  { name: "Node.js", start: "January 2023", rating: 8 },
  { name: "Java", start: "January 2021", rating: 7 },
  { name: "JavaScript (ES6+)", start: "January 2023", rating: 9 },
  { name: "TypeScript", start: "January 2023", rating: 8 },
  { name: "SQL", start: "January 2021", rating: 7 },
  { name: "HTML5", start: "January 2020", rating: 9 },
  { name: "CSS3", start: "January 2020", rating: 9 },
  { name: "Spring Boot", start: "January 2023", rating: 7 },
  { name: "Bootstrap", start: "January 2022", rating: 8 },
  { name: "RESTful APIs", start: "January 2023", rating: 9 },
  { name: "MongoDB", start: "January 2023", rating: 8 },
  { name: "Google Cloud (Drive API, OAuth 2.0)", start: "January 2023", rating: 7 },
  { name: "AWS S3", start: "January 2023", rating: 7 },
  { name: "Git/GitHub", start: "January 2023", rating: 8 },
  { name: "Docker", start: "January 2023", rating: 6 },
  { name: "Postman", start: "January 2023", rating: 9 },
  { name: "Cursor AI", start: "January 2025", rating: 8 },
  { name: "Data Structures & Algorithms", start: "January 2019", rating: 8 }
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
        <span>💻</span> Technical Skills & Experience
      </h3>
      
      <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/50">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
            <tr>
              <th scope="col" className="custom-px-6-py-4">Skill Name</th>
              <th scope="col" className="custom-px-6-py-4">Proficiency</th>
              <th scope="col" className="custom-px-6-py-4">Experience</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {skillsData.map((skill, idx) => (
              <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                <td className="custom-px-6-py-4 font-medium text-white">{skill.name}</td>
                <td className="custom-px-6-py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-700 rounded-full h-2.5 max-w-[100px]">
                      <div className="bg-emerald-400 h-2.5 rounded-full" style={{ width: `${(skill.rating / 10) * 100}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-400">{skill.rating}/10</span>
                  </div>
                </td>
                <td className="custom-px-6-py-4 whitespace-nowrap">
                  {calculateExperience(skill.start)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
