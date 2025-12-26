
"use client";

import React, { useState } from 'react';
import { PODCASTS } from '../constants';
import { Podcast } from '../types';
import { PlayIcon, PauseIcon, SearchIcon } from '../components/Icons';
import AudioPlayer from '../components/AudioPlayer';
import { getAiRecommendation } from '../services/geminiService';

export default function Home() {
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(PODCASTS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingRec, setIsLoadingRec] = useState(false);

  const handlePlayPodcast = (podcast: Podcast) => {
    if (currentPodcast?.id === podcast.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentPodcast(podcast);
      setIsPlaying(true);
    }
  };

  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsLoadingRec(true);
    try {
      const rec = await getAiRecommendation(searchQuery);
      setRecommendation(rec);
    } catch (err) {
      setRecommendation("I'm sorry, I couldn't get a recommendation right now.");
    } finally {
      setIsLoadingRec(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0a090d] text-white overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#050507] border-r border-[#1a1820] flex flex-col shrink-0 z-30">
        <div className="p-8 flex items-center gap-3">
          <div className="size-10 bg-[#5b13ec] rounded-xl flex items-center justify-center shadow-lg shadow-[#5b13ec]/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">Castly Premium</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarLink icon={<HomeIcon />} label="Home" active />
          <SidebarLink icon={<BrowseIcon />} label="Discover" />
          <SidebarLink icon={<RadioIcon />} label="Live Radio" />
          
          <div className="mt-10 mb-2 px-4 text-[11px] font-bold text-[#453c55] uppercase tracking-[0.2em]">Your Collection</div>
          <SidebarLink icon={<HistoryIcon />} label="Recently Played" />
          <SidebarLink icon={<FavoriteIcon />} label="Favorites" />
          <SidebarLink icon={<ArtistIcon />} label="Followed Hosts" />
        </nav>

        <div className="p-6">
          <div className="bg-gradient-to-br from-[#1a1820] to-[#0a090d] rounded-2xl p-5 border border-[#2e2839] relative overflow-hidden group">
            <p className="text-xs text-[#a69db9] mb-4 relative z-10 leading-relaxed">Experience spatial audio and zero ads with Premium.</p>
            <button className="w-full py-3 bg-[#5b13ec] hover:bg-[#4d0fd0] text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-[#5b13ec]/10">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        <header className="h-20 flex items-center justify-between px-10 bg-[#0a090d]/80 backdrop-blur-md z-20 sticky top-0 border-b border-[#1a1820]/50">
          <div className="flex items-center gap-6 flex-1 max-w-2xl">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#453c55]">
                <SearchIcon size={20} />
              </span>
              <input 
                type="text" 
                placeholder="Search podcasts, episodes, or creators..."
                className="w-full bg-[#1a1820] border-none rounded-full py-3 pl-12 pr-6 text-sm focus:ring-2 focus:ring-[#5b13ec] transition-all placeholder:text-[#453c55]"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6 pl-8">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold group-hover:text-[#5b13ec] transition-colors">Sami Pro</p>
                <p className="text-[10px] text-[#453c55] font-bold uppercase tracking-wider">Premium Plan</p>
              </div>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sami" className="size-10 rounded-xl bg-[#1a1820] p-1 border border-[#2e2839]" alt="User" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-10 pb-32">
          <section className="mt-8 relative h-[360px] rounded-[2.5rem] overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a090d] via-transparent to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-12 space-y-4 max-w-2xl">
              <h1 className="text-5xl font-black tracking-tighter">Beyond the Screen:<br/><span className="text-[#5b13ec]">Digital Minds</span></h1>
              <p className="text-lg text-[#a69db9] leading-relaxed">Exploring the boundaries of technology and philosophy.</p>
              <button onClick={() => handlePlayPodcast(PODCASTS[0])} className="bg-white text-black w-fit px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-[#5b13ec] hover:text-white transition-all transform hover:scale-105">
                <PlayIcon fill size={20} /> Listen Now
              </button>
            </div>
          </section>

          {/* AI SCOUT */}
          <section className="mt-16 bg-[#121118] rounded-[2rem] p-10 border border-[#1a1820] shadow-2xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-black tracking-tight"><span className="text-[#5b13ec]">AI</span> Scout</h2>
                <form onSubmit={handleAskAi} className="flex gap-3 bg-[#0a090d] p-2 rounded-2xl border border-[#1a1820] focus-within:border-[#5b13ec] transition-colors">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tell AI what you want to hear..."
                    className="flex-1 bg-transparent border-none text-white focus:ring-0 px-4"
                  />
                  <button type="submit" disabled={isLoadingRec} className="bg-[#5b13ec] hover:bg-[#4d0fd0] disabled:opacity-50 px-8 py-3 rounded-xl font-bold">
                    {isLoadingRec ? 'Scouting...' : 'Scout'}
                  </button>
                </form>
              </div>
              <div className="flex-1">
                {recommendation && (
                  <div className="bg-[#1a1820] p-6 rounded-2xl border-l-4 border-[#5b13ec]">
                    <p className="text-white italic">"{recommendation}"</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="mt-16 space-y-8">
            <h2 className="text-3xl font-black tracking-tight">Recommended</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PODCASTS.map((podcast) => (
                <PodcastCard 
                  key={podcast.id} 
                  podcast={podcast} 
                  onPlay={() => handlePlayPodcast(podcast)}
                  active={currentPodcast?.id === podcast.id}
                  isPlaying={isPlaying}
                />
              ))}
            </div>
          </section>
        </main>
      </div>

      <AudioPlayer 
        podcast={currentPodcast} 
        isPlaying={isPlaying} 
        onTogglePlay={() => setIsPlaying(!isPlaying)} 
      />
    </div>
  );
}

const SidebarLink = ({ icon, label, active = false }: any) => (
  <a href="#" className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all group ${active ? 'bg-[#5b13ec] text-white shadow-lg shadow-[#5b13ec]/20' : 'text-[#a69db9] hover:bg-[#1a1820] hover:text-white'}`}>
    <span className={active ? 'text-white' : 'text-[#453c55] group-hover:text-[#5b13ec]'}>{icon}</span>
    {label}
  </a>
);

const PodcastCard = ({ podcast, onPlay, active, isPlaying }: any) => (
  <div onClick={onPlay} className="group bg-[#121118] rounded-[2rem] p-5 cursor-pointer hover:bg-[#1a1820] transition-all border border-transparent hover:border-[#2e2839] hover:-translate-y-2">
    <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
      <img src={podcast.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={podcast.title} />
      <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <div className="size-16 bg-[#5b13ec] rounded-2xl flex items-center justify-center text-white shadow-2xl">
          {active && isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} fill />}
        </div>
      </div>
    </div>
    <h3 className="font-bold text-lg truncate group-hover:text-[#5b13ec]">{podcast.title}</h3>
    <p className="text-sm text-[#453c55] font-bold uppercase tracking-wide">{podcast.host}</p>
  </div>
);

const HomeIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const BrowseIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const RadioIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const HistoryIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const FavoriteIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const ArtistIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
