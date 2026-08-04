import React, { useEffect, useState } from 'react';
import { Trophy, Code2, Target, Zap, Activity } from 'lucide-react';
import mockStats from './mockStats.json';

export default function LeetCodeStats({ username = 'Sajann_Kumar_SSingh' }) {
  const [profile, setProfile] = useState(null);
  const [solvedData, setSolvedData] = useState(null);
  const [badgesData, setBadgesData] = useState(null);
  const [recentData, setRecentData] = useState(null);
  const [contestData, setContestData] = useState(null);
  const [languageData, setLanguageData] = useState(null);
  const [skillData, setSkillData] = useState(null);
  const [calendarData, setCalendarData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Bypass API fetching and use mock data
        if (true) {
          const { leetcode } = mockStats;
          setProfile(leetcode.profile);
          setSolvedData(leetcode.solvedData);
          setBadgesData(leetcode.badgesData);
          setRecentData(leetcode.recentData);
          setContestData(leetcode.contestData);
          setLanguageData(leetcode.languageData);
          setSkillData(leetcode.skillData);
          setCalendarData(leetcode.calendarData);
          setLoading(false);
          return;
        }

        const CACHE_KEY = `leetcode_stats_${username}`;
        const cachedData = localStorage.getItem(CACHE_KEY);

        if (cachedData) {
          try {
            const parsed = JSON.parse(cachedData);
            // 7 days cache
            if (Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
              setProfile(parsed.profile);
              setSolvedData(parsed.solved);
              setBadgesData(parsed.badges);
              setRecentData(parsed.recent);
              setContestData(parsed.contest);
              setLanguageData(parsed.language);
              setSkillData(parsed.skill);
              setCalendarData(parsed.calendar);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.error("Cache read error", e);
          }
        }

        const fetchSafe = async (url) => {
          try {
            const res = await fetch(url);
            if (!res.ok) return null;
            return await res.json();
          } catch (e) {
            return null;
          }
        };

        const [profileJson, solvedJson, badgesJson, recentJson, contestJson, languageJson, skillJson, calendarJson] = await Promise.all([
          fetchSafe(`https://alfa-leetcode-api.onrender.com/${username}`),
          fetchSafe(`https://alfa-leetcode-api.onrender.com/${username}/solved`),
          fetchSafe(`https://alfa-leetcode-api.onrender.com/${username}/badges`),
          fetchSafe(`https://alfa-leetcode-api.onrender.com/${username}/acSubmission`),
          fetchSafe(`https://alfa-leetcode-api.onrender.com/${username}/contest`),
          fetchSafe(`https://alfa-leetcode-api.onrender.com/${username}/language`),
          fetchSafe(`https://alfa-leetcode-api.onrender.com/${username}/skill`),
          fetchSafe(`https://alfa-leetcode-api.onrender.com/${username}/calendar`)
        ]);

        setProfile(profileJson);
        setSolvedData(solvedJson);
        setBadgesData(badgesJson);
        setRecentData(recentJson);
        setContestData(contestJson);
        setLanguageData(languageJson);
        setSkillData(skillJson);
        setCalendarData(calendarJson);

        // Save to cache if we got profile data successfully
        if (profileJson && profileJson.errors === undefined) {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            profile: profileJson,
            solved: solvedJson,
            badges: badgesJson,
            recent: recentJson,
            contest: contestJson,
            language: languageJson,
            skill: skillJson,
            calendar: calendarJson
          }));
        }

        console.log("LeetCode Profile Data:", profileJson);
        console.log("LeetCode Solved Data:", solvedJson);
        console.log("LeetCode Badges Data:", badgesJson);
        console.log("LeetCode Recent Data:", recentJson);
        console.log("LeetCode Contest Data:", contestJson);
        console.log("LeetCode Language Data:", languageJson);
        console.log("LeetCode Skill Data:", skillJson);
        console.log("LeetCode Calendar Data:", calendarJson);
      } catch (error) {
        console.error("Failed to fetch LeetCode data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="w-full animate-pulse flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-white/10 mb-4"></div>
        <div className="w-48 h-6 bg-white/10 rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="h-32 bg-white/10 rounded-xl"></div>
          <div className="h-32 bg-white/10 rounded-xl"></div>
          <div className="h-32 bg-white/10 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!profile || !solvedData) return null;

  return (
    <div className="w-full custom-mt-4 custom-pb-6">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl custom-p-main border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header section */}
        <div className="flex flex-col md:flex-row items-center gap-8 custom-mb-4 relative z-10">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-24 h-24 rounded-full border-2 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
          />
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white custom-mb-2">LeetCode</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-400">
              <a href={`https://leetcode.com/u/${username}/`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-yellow-500 transition-colors">
                <Code2 className="w-4 h-4" />
                <span>@{profile.username}</span>
              </a>
              <span className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>Rank {profile.ranking.toLocaleString()}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {/* Total Solved Card */}
          <div className="bg-white/5 rounded-2xl custom-p-6 border border-white/5 hover:border-yellow-500/30 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between custom-mb-4">
              <h3 className="text-gray-400 font-medium">Total Solved</h3>
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-4xl font-bold text-white custom-mb-2">{solvedData.solvedProblem}</div>
            <div className="w-full bg-gray-800 rounded-full h-2 custom-mt-4 overflow-hidden flex">
              <div style={{ width: `${(solvedData.easySolved / solvedData.solvedProblem) * 100}%` }} className="h-full bg-emerald-500"></div>
              <div style={{ width: `${(solvedData.mediumSolved / solvedData.solvedProblem) * 100}%` }} className="h-full bg-yellow-500"></div>
              <div style={{ width: `${(solvedData.hardSolved / solvedData.solvedProblem) * 100}%` }} className="h-full bg-red-500"></div>
            </div>
          </div>

          {/* Easy */}
          <div className="bg-white/5 rounded-2xl custom-p-6 border border-white/5 hover:border-emerald-500/30 transition-all hover:-translate-y-1 flex flex-col justify-between">
            <h3 className="text-emerald-500 font-medium custom-mb-2">Easy</h3>
            <div className="text-3xl font-bold text-white">{solvedData.easySolved}</div>
          </div>

          {/* Medium */}
          <div className="bg-white/5 rounded-2xl custom-p-6 border border-white/5 hover:border-yellow-500/30 transition-all hover:-translate-y-1 flex flex-col justify-between">
            <h3 className="text-yellow-500 font-medium custom-mb-2">Medium</h3>
            <div className="text-3xl font-bold text-white">{solvedData.mediumSolved}</div>
          </div>

          {/* Hard */}
          <div className="bg-white/5 rounded-2xl custom-p-6 border border-white/5 hover:border-red-500/30 transition-all hover:-translate-y-1 flex flex-col justify-between">
            <h3 className="text-red-500 font-medium custom-mb-2">Hard</h3>
            <div className="text-3xl font-bold text-white">{solvedData.hardSolved}</div>
          </div>
        </div>

        {/* Badges Section Hidden for now */}

        {/* Recent Activity Section */}
        {recentData && recentData.submission && recentData.submission.length > 0 && (
          <div className="custom-mt-4 relative z-10 border-t border-white/10 custom-pt-6">
            <h3 className="text-xl font-semibold text-white custom-mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" />
              Recent Activities
            </h3>
            <div className="flex flex-col gap-3">
              {recentData.submission.slice(0, 5).map((sub, idx) => {
                const date = new Date(sub.timestamp * 1000);
                const formattedDate = `${date.getFullYear().toString().slice(-2)}.${date.getMonth() + 1}.${date.getDate()}`;
                return (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between custom-p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors gap-2 sm:gap-0">
                    <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto sm:gap-4">
                      <span className="text-gray-400 font-mono text-sm">{formattedDate}</span>
                      <span className="custom-px-3-py-1 bg-emerald-500/20 text-emerald-500 rounded text-xs font-bold border border-emerald-500/30">AC</span>
                      <span className="font-semibold text-white">{sub.lang}</span>
                    </div>
                    <div className="text-gray-300 text-sm truncate w-full sm:w-auto sm:max-w-md text-left sm:text-right">
                      {sub.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
