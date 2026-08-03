import React from 'react';
import ProjectGallery from './ProjectGallery';
import LeetCodeStats from './LeetCodeStats';
import CodeforcesStats from './CodeforcesStats';
import GithubStats from './GithubStats';
import DuolingoStats from './DuolingoStats';
import './index.css';

export default function Portfolio() {
  return (
    <div className="w-full min-h-screen pt-24 pb-12 overflow-x-hidden">
      <div className="w-full relative z-20">
        <ProjectGallery />
        <div style={{ padding: '0 5%', width: '100%', boxSizing: 'border-box' }} className="custom-mt-4">
          <div className="w-full max-w-[1200px] custom-space-y-4" style={{ margin: '0 auto' }}>
            <LeetCodeStats username="Sajann_Kumar_SSingh" />
            <CodeforcesStats username="Sajan_Kumar_Singh" />
            <GithubStats username="sajan-kumar-singh" />
            <DuolingoStats username="SAJANNKUMARSINGH" />
          </div>
        </div>
      </div>
    </div>
  );
}
