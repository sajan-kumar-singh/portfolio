import React, { useEffect, useState } from 'react';
import { Trophy, Activity, Target, Zap } from 'lucide-react';
import mockStats from './mockStats.json';

export default function CodeforcesStats({ username = 'Sajan_Kumar_Singh' }) {
  const [profile, setProfile] = useState(null);
  const [ratingHistory, setRatingHistory] = useState(null);
  const [submissions, setSubmissions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Bypass API fetching and use mock data
        if (true) {
          const { codeforces } = mockStats;
          setProfile(codeforces.profile);
          setRatingHistory(codeforces.ratingHistory);
          setSubmissions(codeforces.submissions);
          setLoading(false);
          return;
        }

        const CACHE_KEY = `codeforces_stats_${username}`;
        const cachedData = localStorage.getItem(CACHE_KEY);
        
        if (cachedData) {
          try {
            const parsed = JSON.parse(cachedData);
            if (Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
              setProfile(parsed.profile);
              setRatingHistory(parsed.ratingHistory);
              setSubmissions(parsed.submissions);
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

        const [infoRes, ratingRes, statusRes] = await Promise.all([
          fetchSafe(`https://codeforces.com/api/user.info?handles=${username}`),
          fetchSafe(`https://codeforces.com/api/user.rating?handle=${username}`),
          fetchSafe(`https://codeforces.com/api/user.status?handle=${username}&from=1&count=100`)
        ]);

        if (infoRes && infoRes.status === "OK") {
          setProfile(infoRes.result[0]);
          console.log("Codeforces Profile Data:", infoRes.result[0]);
        }
        if (ratingRes && ratingRes.status === "OK") {
          setRatingHistory(ratingRes.result);
          console.log("Codeforces Rating History:", ratingRes.result);
        }
        if (statusRes && statusRes.status === "OK") {
          setSubmissions(statusRes.result);
          console.log("Codeforces Submissions:", statusRes.result);
        }

        if (infoRes && infoRes.status === "OK") {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            profile: infoRes.result[0],
            ratingHistory: ratingRes ? ratingRes.result : null,
            submissions: statusRes ? statusRes.result : null
          }));
        }
      } catch (error) {
        console.error("Failed to fetch Codeforces data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="w-full animate-pulse flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-white/10 custom-mb-4"></div>
        <div className="w-48 h-6 bg-white/10 rounded mb-8"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="w-full custom-mt-4 custom-pb-6">
      <div className="bg-gradient-to-br from-blue-950 to-black rounded-3xl custom-p-main border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)] relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row items-center gap-8 custom-mb-4 relative z-10">
          <img 
            src={profile.titlePhoto || profile.avatar} 
            alt={profile.handle} 
            className="w-24 h-24 rounded-full border-2 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)] object-cover"
          />
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white custom-mb-2">Codeforces</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-400">
              <a href={`https://codeforces.com/profile/${username}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <span className="font-semibold">@{profile.handle}</span>
              </a>
              <span className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-blue-400" />
                <span className="capitalize">{profile.rank}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {/* Current Rating */}
          <div className="bg-white/5 rounded-2xl custom-p-6 border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between custom-mb-4">
              <h3 className="text-gray-400 font-medium">Current Rating</h3>
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-4xl font-bold text-white custom-mb-2">{profile.rating || 0}</div>
          </div>

          {/* Max Rating */}
          <div className="bg-white/5 rounded-2xl custom-p-6 border border-white/5 hover:border-cyan-500/30 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between custom-mb-4">
              <h3 className="text-gray-400 font-medium">Max Rating</h3>
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-4xl font-bold text-white custom-mb-2">{profile.maxRating || 0}</div>
            <div className="text-sm text-cyan-400 capitalize">{profile.maxRank}</div>
          </div>

          {/* Contests Attended */}
          <div className="bg-white/5 rounded-2xl custom-p-6 border border-white/5 hover:border-indigo-500/30 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between custom-mb-4">
              <h3 className="text-gray-400 font-medium">Contests</h3>
              <Activity className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-4xl font-bold text-white custom-mb-2">
              {ratingHistory ? ratingHistory.length : 0}
            </div>
          </div>
        </div>

        {/* Recent Contest Activity */}
        {ratingHistory && ratingHistory.length > 0 && (
          <div className="custom-mt-4 relative z-10 border-t border-white/10 custom-pt-6">
            <h3 className="text-xl font-semibold text-white custom-mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Recent Contests
            </h3>
            <div className="flex flex-col gap-3">
              {[...ratingHistory].reverse().slice(0, 3).map((contest, idx) => {
                const date = new Date(contest.ratingUpdateTimeSeconds * 1000);
                const formattedDate = `${date.getFullYear().toString().slice(-2)}.${date.getMonth() + 1}.${date.getDate()}`;
                const ratingChange = contest.newRating - contest.oldRating;
                const isPositive = ratingChange >= 0;
                
                return (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between custom-p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors gap-2 sm:gap-0">
                    <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto sm:gap-4">
                      <span className="text-gray-400 font-mono text-sm">{formattedDate}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold border ${isPositive ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' : 'bg-red-500/20 text-red-500 border-red-500/30'}`}>
                        {isPositive ? '+' : ''}{ratingChange}
                      </span>
                    </div>
                    <div className="text-gray-300 text-sm truncate w-full sm:w-auto sm:max-w-md text-left sm:text-right">
                      {contest.contestName}
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
