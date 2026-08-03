import React, { useEffect } from 'react';

export default function GlobalPrefetcher() {
  useEffect(() => {
    return; // Bypass all prefetching

    const fetchSafe = async (url, options = {}) => {
      try {
        const res = await fetch(url, options);
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        return null;
      }
    };

    const prefetchLeetCode = async () => {
      const username = 'sajankumarsingh';
      const CACHE_KEY = `leetcode_profile_${username}`;
      const cached = localStorage.getItem(CACHE_KEY);
      
      if (cached) {
        try {
          const parsedCache = JSON.parse(cached);
          if (Date.now() - parsedCache.timestamp < 7 * 24 * 60 * 60 * 1000) return;
        } catch (e) { /* Ignore */ }
      }

      try {
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

        if (profileJson && profileJson.errors === undefined) {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            profile: profileJson,
            solvedData: solvedJson,
            badgesData: badgesJson,
            recentData: recentJson,
            contestData: contestJson,
            languageData: languageJson,
            skillData: skillJson,
            calendarData: calendarJson
          }));
          console.log("LeetCode prefetch complete");
        }
      } catch (e) { console.warn("LeetCode prefetch failed", e); }
    };

    const prefetchGitHub = async () => {
      const username = 'sajan-kumar-singh';
      const CACHE_KEY = `github_stats_${username}`;
      const cached = localStorage.getItem(CACHE_KEY);
      
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) return;
        } catch (e) { /* Ignore */ }
      }

      try {
        const headers = { 'Accept': 'application/vnd.github.v3+json' };
        const [profileRes, reposRes, eventsRes, followersRes, followingRes] = await Promise.all([
          fetchSafe(`https://api.github.com/users/${username}`, { headers }),
          fetchSafe(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }),
          fetchSafe(`https://api.github.com/users/${username}/events/public?per_page=100`, { headers }),
          fetchSafe(`https://api.github.com/users/${username}/followers?per_page=100`, { headers }),
          fetchSafe(`https://api.github.com/users/${username}/following?per_page=100`, { headers })
        ]);

        if (profileRes && !profileRes.message) {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            profile: profileRes,
            repos: reposRes || [],
            events: eventsRes || [],
            followersList: followersRes || [],
            followingList: followingRes || []
          }));
          console.log("GitHub prefetch complete");
        }
      } catch (e) { console.warn("GitHub prefetch failed", e); }
    };

    const prefetchCodeforces = async () => {
      const username = 'Sajan_Kumar_Singh';
      const CACHE_KEY = `codeforces_stats_${username}`;
      const cached = localStorage.getItem(CACHE_KEY);
      
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) return;
        } catch (e) { /* Ignore */ }
      }

      try {
        const [infoRes, ratingRes, statusRes] = await Promise.all([
          fetchSafe(`https://codeforces.com/api/user.info?handles=${username}`),
          fetchSafe(`https://codeforces.com/api/user.rating?handle=${username}`),
          fetchSafe(`https://codeforces.com/api/user.status?handle=${username}&from=1&count=100`)
        ]);

        if (infoRes && infoRes.status === "OK") {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            profile: infoRes.result[0],
            ratingHistory: ratingRes?.result || [],
            submissions: statusRes?.result || []
          }));
          console.log("Codeforces prefetch complete");
        }
      } catch (e) { console.warn("Codeforces prefetch failed", e); }
    };

    // Run all prefetchers in parallel
    prefetchLeetCode();
    prefetchGitHub();
    prefetchCodeforces();

  }, []);

  return null;
}
