const fs = require('fs');

async function fetchSafe(url, headers = {}) {
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function run() {
  console.log('Fetching LeetCode...');
  const [profileLC, solvedLC, badgesLC, recentLC, contestLC, languageLC, skillLC, calendarLC] = await Promise.all([
    fetchSafe(`https://alfa-leetcode-api.onrender.com/Sajann_Kumar_SSingh`),
    fetchSafe(`https://alfa-leetcode-api.onrender.com/Sajann_Kumar_SSingh/solved`),
    fetchSafe(`https://alfa-leetcode-api.onrender.com/Sajann_Kumar_SSingh/badges`),
    fetchSafe(`https://alfa-leetcode-api.onrender.com/Sajann_Kumar_SSingh/acSubmission`),
    fetchSafe(`https://alfa-leetcode-api.onrender.com/Sajann_Kumar_SSingh/contest`),
    fetchSafe(`https://alfa-leetcode-api.onrender.com/Sajann_Kumar_SSingh/language`),
    fetchSafe(`https://alfa-leetcode-api.onrender.com/Sajann_Kumar_SSingh/skill`),
    fetchSafe(`https://alfa-leetcode-api.onrender.com/Sajann_Kumar_SSingh/calendar`)
  ]);

  console.log('Fetching GitHub...');
  const headers = { 'User-Agent': 'node.js fetch' };
  const [profileGH, reposGH, eventsGH, followersGH, followingGH] = await Promise.all([
    fetchSafe('https://api.github.com/users/sajan-kumar-singh', headers),
    fetchSafe('https://api.github.com/users/sajan-kumar-singh/repos?sort=updated&per_page=6', headers),
    fetchSafe('https://api.github.com/users/sajan-kumar-singh/events?per_page=10', headers),
    fetchSafe('https://api.github.com/users/sajan-kumar-singh/followers', headers),
    fetchSafe('https://api.github.com/users/sajan-kumar-singh/following', headers)
  ]);

  console.log('Fetching Codeforces...');
  const [infoCF, ratingCF, statusCF] = await Promise.all([
    fetchSafe('https://codeforces.com/api/user.info?handles=Sajan_Kumar_Singh'),
    fetchSafe('https://codeforces.com/api/user.rating?handle=Sajan_Kumar_Singh'),
    fetchSafe('https://codeforces.com/api/user.status?handle=Sajan_Kumar_Singh&from=1&count=100')
  ]);

  console.log('Fetching Duolingo...');
  const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://www.duolingo.com/2017-06-30/users?username=SAJANNKUMARSINGH');
  let duolingoProfile = await fetchSafe(proxyUrl);
  if (duolingoProfile && duolingoProfile.users && duolingoProfile.users.length > 0) {
    duolingoProfile = duolingoProfile.users[0];
  } else {
    duolingoProfile = {
      name: 'Sajann Kumar SSingh',
      username: 'SajannKumarSingh',
      picture: '//d3gq3s1iyyx31w.cloudfront.net/static/render/bg/BackgroundColor-1/Body-5/ClothingColor-3/CostumeArtboard-36/Expression-1/EyeColor-1/FacialHair-0/FacialHairColor-1/Glasses-0/GlassesColor-1/HasCostume-1/Headwear-0/HeadwearColor-1/MainHair-66/MainHairColor-1/Nose%20Piercing-0/Piercings-0/SkinTone-6/Wrinkles-0',
      hasPlus: true,
      totalXp: 9039,
      streak: 30,
      learningLanguage: 'ja',
      courses: [ { title: 'Japanese' }, { title: 'Hindi' }, { title: 'English' } ]
    };
  }

  const finalJson = {
    leetcode: {
      profile: profileLC,
      solvedData: solvedLC,
      badgesData: badgesLC,
      recentData: recentLC,
      contestData: contestLC,
      languageData: languageLC,
      skillData: skillLC,
      calendarData: calendarLC
    },
    github: {
      profile: profileGH,
      repos: reposGH,
      events: eventsGH,
      followersList: followersGH,
      followingList: followingGH
    },
    codeforces: {
      profile: infoCF && infoCF.result ? infoCF.result[0] : null,
      ratingHistory: ratingCF && ratingCF.result ? ratingCF.result : [],
      submissions: statusCF && statusCF.result ? statusCF.result : []
    },
    duolingo: {
      profile: duolingoProfile
    }
  };

  fs.writeFileSync('src/mockStats.json', JSON.stringify(finalJson, null, 2));
  console.log('Successfully saved to src/mockStats.json');
}

run();
