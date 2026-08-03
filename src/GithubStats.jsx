import React, { useEffect, useState } from 'react';
import { GitBranch, Star, Users, MapPin, Link as LinkIcon, Calendar } from 'lucide-react';
import mockStats from './mockStats.json';

const GithubIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

export default function GithubStats({ username = 'sajan-kumar-singh' }) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState(null);
  const [events, setEvents] = useState(null);
  const [followersList, setFollowersList] = useState(null);
  const [followingList, setFollowingList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Bypass API fetching and use mock data
        if (true) {
          const { github } = mockStats;
          setProfile(github.profile);
          setRepos(github.repos);
          setEvents(github.events);
          setFollowersList(github.followersList);
          setFollowingList(github.followingList);
          setLoading(false);
          return;
        }

        const CACHE_KEY = `github_stats_${username}`;
        const cachedData = localStorage.getItem(CACHE_KEY);
        
        if (cachedData) {
          try {
            const parsed = JSON.parse(cachedData);
            if (Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
              setProfile(parsed.profile);
              setRepos(parsed.repos);
              setEvents(parsed.events);
              setFollowersList(parsed.followersList);
              setFollowingList(parsed.followingList);
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

        const [profileRes, reposRes, eventsRes, followersRes, followingRes] = await Promise.all([
          fetchSafe(`https://api.github.com/users/${username}`),
          fetchSafe(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
          fetchSafe(`https://api.github.com/users/${username}/events?per_page=10`),
          fetchSafe(`https://api.github.com/users/${username}/followers`),
          fetchSafe(`https://api.github.com/users/${username}/following`)
        ]);

        if (profileRes) {
          setProfile(profileRes);
          console.log("GitHub Profile Data:", profileRes);
        }
        if (reposRes) {
          setRepos(reposRes);
          console.log("GitHub Repositories:", reposRes);
        }
        if (eventsRes) {
          setEvents(eventsRes);
          console.log("GitHub Recent Events:", eventsRes);
        }
        if (followersRes) {
          setFollowersList(followersRes);
          console.log("GitHub Followers List:", followersRes);
        }
        if (followingRes) {
          setFollowingList(followingRes);
          console.log("GitHub Following List:", followingRes);
        }

        if (profileRes && !profileRes.message) {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            profile: profileRes,
            repos: reposRes,
            events: eventsRes,
            followersList: followersRes,
            followingList: followingRes
          }));
        }
      } catch (error) {
        console.error("Failed to fetch GitHub data", error);
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
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl custom-p-main border border-gray-600/30 shadow-[0_0_30px_rgba(255,255,255,0.05)] relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row items-center gap-8 custom-mb-4 relative z-10">
          <img 
            src={profile.avatar_url} 
            alt={profile.login} 
            className="w-24 h-24 rounded-full border-2 border-gray-500/50 shadow-[0_0_20px_rgba(255,255,255,0.1)] object-cover bg-white"
          />
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white custom-mb-2">GitHub</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-400">
              <a href={profile.html_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <GithubIcon className="w-4 h-4" />
                <span className="font-semibold">@{profile.login}</span>
              </a>
              {profile.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{profile.location}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {/* Public Repos */}
          <div className="bg-white/5 rounded-2xl custom-p-6 border border-white/5 hover:border-gray-400/30 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between custom-mb-4">
              <h3 className="text-gray-400 font-medium">Public Repos</h3>
              <GitBranch className="w-5 h-5 text-gray-300" />
            </div>
            <div className="text-4xl font-bold text-white custom-mb-2">{profile.public_repos}</div>
          </div>

          {/* Followers */}
          <div className="bg-white/5 rounded-2xl custom-p-6 border border-white/5 hover:border-gray-400/30 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between custom-mb-4">
              <h3 className="text-gray-400 font-medium">Followers</h3>
              <Users className="w-5 h-5 text-gray-300" />
            </div>
            <div className="text-4xl font-bold text-white custom-mb-2">{profile.followers}</div>
          </div>

          {/* Joined Date */}
          <div className="bg-white/5 rounded-2xl custom-p-6 border border-white/5 hover:border-gray-400/30 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between custom-mb-4">
              <h3 className="text-gray-400 font-medium">Joined</h3>
              <Calendar className="w-5 h-5 text-gray-300" />
            </div>
            <div className="text-xl font-bold text-white custom-mb-2">
              {new Date(profile.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
            </div>
          </div>
        </div>

        {/* Recent Repos Hidden for now */}
      </div>
    </div>
  );
}
