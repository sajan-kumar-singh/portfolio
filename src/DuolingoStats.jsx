import React, { useEffect, useState } from 'react';
import { Crown, Flame, Star, BookOpen, Globe2 } from 'lucide-react';
import mockStats from './mockStats.json';

export default function DuolingoStats({ username = 'SAJANNKUMARSINGH' }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Bypass API fetching and use mock data
        if (true) {
          const { duolingo } = mockStats;
          setProfile(duolingo.profile);
          setLoading(false);
          return;
        }

        const CACHE_KEY = `duolingo_stats_${username}`;
        const cachedData = localStorage.getItem(CACHE_KEY);
        
        if (cachedData) {
          try {
            const parsed = JSON.parse(cachedData);
            if (Date.now() - parsed.timestamp < 60 * 60 * 1000) {
              setProfile(parsed.profile);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.error("Cache read error", e);
          }
        }

        const fetchSafe = async (url) => {
          try {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
            const res = await fetch(proxyUrl);
            if (!res.ok) {
              console.warn("Duolingo API/Proxy blocked. Falling back to static data.");
              return getFallbackData();
            }
            return await res.json();
          } catch (e) {
            console.warn("Duolingo fetch error, falling back to static data:", e);
            return getFallbackData();
          }
        };

        const getFallbackData = () => ({
          users: [{
            name: 'Sajann Kumar SSingh',
            username: 'SajannKumarSingh',
            picture: '//d3gq3s1iyyx31w.cloudfront.net/static/render/bg/BackgroundColor-1/Body-5/ClothingColor-3/CostumeArtboard-36/Expression-1/EyeColor-1/FacialHair-0/FacialHairColor-1/Glasses-0/GlassesColor-1/HasCostume-1/Headwear-0/HeadwearColor-1/MainHair-66/MainHairColor-1/Nose%20Piercing-0/Piercings-0/SkinTone-6/Wrinkles-0',
            hasPlus: true,
            totalXp: 9039,
            streak: 30,
            learningLanguage: 'ja',
            courses: [
              { title: 'Japanese' },
              { title: 'Hindi' },
              { title: 'English' }
            ]
          }]
        });

        const data = await fetchSafe(`https://www.duolingo.com/2017-06-30/users?username=${username}`);
        
        if (data && data.users && data.users.length > 0) {
          const userProfile = data.users[0];
          setProfile(userProfile);
          console.log("Duolingo Profile Data:", userProfile);
          
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            profile: userProfile
          }));
        }
      } catch (error) {
        console.error("Failed to fetch Duolingo data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="w-full custom-mt-4 custom-pb-6">
        <div className="w-full flex items-center justify-center custom-p-main bg-[#1e2333] rounded-3xl border border-[#2d3446]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#58cc02]"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="w-full custom-mt-4 custom-pb-6">
        <div className="w-full flex items-center justify-center custom-p-main bg-[#1e2333] rounded-3xl border border-[#2d3446] text-gray-400">
          <p>Duolingo data temporarily unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full custom-mt-4 custom-pb-6">
      <div className="w-full relative overflow-hidden bg-gradient-to-br from-[#1cb0f6]/10 to-[#58cc02]/10 rounded-3xl custom-p-main border border-[#58cc02]/20 shadow-[0_0_30px_rgba(88,204,2,0.1)] group">
        
        {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#58cc02]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 transition-transform duration-700 group-hover:scale-110"></div>
      
      {/* Header Section */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 custom-mb-10 z-10">
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#58cc02] shadow-lg shadow-[#58cc02]/20">
          {profile.picture ? (
            <img 
              src={profile.picture.startsWith('//') ? `https:${profile.picture}/xlarge` : profile.picture} 
              alt={profile.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#1e2333] flex items-center justify-center text-3xl font-bold text-[#58cc02]">
              {profile.name?.charAt(0) || username.charAt(0)}
            </div>
          )}
          {profile.hasPlus && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full p-1 shadow-md">
              <Crown className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left flex flex-col justify-center h-full custom-pt-1">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <h3 className="text-3xl font-bold text-white tracking-tight">Duolingo</h3>
            {/* profile.hasPlus && <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-[10px] font-bold custom-px-2-py-0-5 rounded-full uppercase tracking-wider shadow-sm">Super</span> */}
          </div>
          <p className="text-[#1cb0f6] font-medium flex items-center gap-2 justify-center md:justify-start custom-mt-1">
            @{profile.username}
          </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        
        {/* Total XP Card */}
        <div className="bg-[#1e2333]/80 backdrop-blur-md rounded-2xl custom-p-5 border border-[#2d3446] shadow-md hover:border-[#1cb0f6]/50 transition-colors group/card">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 custom-mb-2 text-center sm:text-left">
            <div className="custom-p-2 bg-[#1cb0f6]/10 rounded-xl group-hover/card:bg-[#1cb0f6]/20 transition-colors">
              <Star className="w-5 h-5 text-[#1cb0f6]" />
            </div>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total XP</span>
          </div>
          <p className="text-2xl font-bold text-white text-center sm:text-left">{profile.totalXp?.toLocaleString()}</p>
        </div>

        {/* Streak Card */}
        <div className="bg-[#1e2333]/80 backdrop-blur-md rounded-2xl custom-p-5 border border-[#2d3446] shadow-md hover:border-[#ff9600]/50 transition-colors group/card">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 custom-mb-2 text-center sm:text-left">
            <div className="custom-p-2 bg-[#ff9600]/10 rounded-xl group-hover/card:bg-[#ff9600]/20 transition-colors">
              <Flame className="w-5 h-5 text-[#ff9600]" />
            </div>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Streak</span>
          </div>
          <p className="text-2xl font-bold text-white text-center sm:text-left">{profile.streak} <span className="text-sm text-gray-400 font-normal">days</span></p>
        </div>
        
        {/* Languages Card */}
        <div className="bg-[#1e2333]/80 backdrop-blur-md rounded-2xl custom-p-5 border border-[#2d3446] shadow-md hover:border-[#ce82ff]/50 transition-colors group/card">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 custom-mb-2 text-center sm:text-left">
            <div className="custom-p-2 bg-[#ce82ff]/10 rounded-xl group-hover/card:bg-[#ce82ff]/20 transition-colors">
              <Globe2 className="w-5 h-5 text-[#ce82ff]" />
            </div>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Languages</span>
          </div>
          <p className="text-2xl font-bold text-white text-center sm:text-left">{profile.courses?.length || 0} <span className="text-sm text-gray-400 font-normal">courses</span></p>
        </div>
        
        {/* Current Language Card */}
        <div className="bg-[#1e2333]/80 backdrop-blur-md rounded-2xl custom-p-5 border border-[#2d3446] shadow-md hover:border-[#58cc02]/50 transition-colors group/card">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 custom-mb-2 text-center sm:text-left">
            <div className="custom-p-2 bg-[#58cc02]/10 rounded-xl group-hover/card:bg-[#58cc02]/20 transition-colors">
              <BookOpen className="w-5 h-5 text-[#58cc02]" />
            </div>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Learning</span>
          </div>
          <p className="text-2xl font-bold text-white uppercase text-center sm:text-left">{profile.learningLanguage}</p>
        </div>

      </div>
    </div>
    </div>
  );
}
