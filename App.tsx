
import React, { useState, useEffect, useRef } from 'react';
import { Podcast } from './types.ts';
import { PODCASTS } from './constants.tsx';
import { PlayIcon, PauseIcon, SearchIcon, UserIcon } from './components/Icons.tsx';
import AudioPlayer from './components/AudioPlayer.tsx';
import { getAiRecommendation } from './services/geminiService.ts';

const App: React.FC = () => {
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
          <SidebarLink icon={<FolderIcon />} label="Playlists" />
        </nav>

        <div className="p-6">
          <div className="bg-gradient-to-br from-[#1a1820] to-[#0a090d] rounded-2xl p-5 border border-[#2e2839] relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 size-20 bg-[#5b13ec]/10 rounded-full blur-2xl group-hover:bg-[#5b13ec]/20 transition-all" />
            <p className="text-xs text-[#a69db9] mb-4 relative z-10 leading-relaxed">Experience spatial audio and zero ads with Premium.</p>
            <button className="w-full py-3 bg-[#5b13ec] hover:bg-[#4d0fd0] text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-[#5b13ec]/10">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* HEADER */}
        <header className="h-20 flex items-center justify-between px-10 glass z-20 sticky top-0 border-b border-[#1a1820]/50">
          <div className="flex items-center gap-6 flex-1 max-w-2xl">
            <div className="flex gap-2">
               <button className="size-9 bg-[#1a1820] rounded-full flex items-center justify-center hover:text-[#5b13ec] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
               </button>
               <button className="size-9 bg-[#1a1820] rounded-full flex items-center justify-center hover:text-[#5b13ec] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth={2.5}/></svg>
               </button>
            </div>
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
            <button className="relative p-2 text-[#a69db9] hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeWidth={2} /></svg>
              <span className="absolute top-2 right-2 size-2 bg-[#5b13ec] rounded-full border-2 border-[#0a090d]"></span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold group-hover:text-[#5b13ec] transition-colors">Sami Pro</p>
                <p className="text-[10px] text-[#453c55] font-bold uppercase tracking-wider">Premium Plan</p>
              </div>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sami" className="size-10 rounded-xl bg-[#1a1820] p-1 border border-[#2e2839]" alt="User" />
            </div>
          </div>
        </header>

        {/* SCROLL CONTENT */}
        <main className="flex-1 overflow-y-auto px-10 pb-32">
          
          {/* FEATURED BANNER */}
          <section className="mt-8 relative h-[380px] rounded-[2.5rem] overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a090d] via-[#0a090d]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a090d] via-transparent to-transparent" />
            
            <div className="relative h-full flex flex-col justify-end p-12 space-y-6 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#5b13ec] text-white text-[10px] font-black uppercase tracking-widest rounded-full">New Release</span>
                <span className="text-[#a69db9] text-xs font-bold">• 45 min</span>
              </div>
              <h1 className="text-6xl font-black leading-tight tracking-tighter">Beyond the Screen:<br/><span className="text-[#5b13ec]">Digital Minds</span></h1>
              <p className="text-lg text-[#a69db9] leading-relaxed">Deep conversations with the engineers and philosophers building our artificial future.</p>
              <div className="flex gap-4">
                <button onClick={() => handlePlayPodcast(PODCASTS[0])} className="bg-white text-black px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-[#5b13ec] hover:text-white transition-all transform hover:scale-105">
                  <PlayIcon fill size={20} /> Listen Now
                </button>
                <button className="bg-[#1a1820]/80 backdrop-blur-md border border-[#2e2839] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#2e2839] transition-all">
                  View Series
                </button>
              </div>
            </div>
          </section>

          {/* AI SCOUT SECTION */}
          <section className="mt-16 bg-[#121118] rounded-[2rem] p-10 border border-[#1a1820] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#5b13ec]/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                    <span className="text-[#5b13ec]">AI</span> Podcast Scout
                  </h2>
                  <p className="text-[#a69db9] leading-relaxed">Our neural engine scans thousands of hours to find exactly what you're craving. Describe your mood or interests below.</p>
                </div>
                
                <form onSubmit={handleAskAi} className="flex gap-3 bg-[#0a090d] p-2 rounded-2xl border border-[#1a1820] focus-within:border-[#5b13ec] transition-colors">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. 'I want something chill about science' or 'True crime in London'"
                    className="flex-1 bg-transparent border-none text-white focus:ring-0 placeholder:text-[#453c55] px-4"
                  />
                  <button 
                    type="submit"
                    disabled={isLoadingRec}
                    className="bg-[#5b13ec] hover:bg-[#4d0fd0] disabled:opacity-50 px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
                  >
                    {isLoadingRec ? <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin"/> : 'Scout'}
                  </button>
                </form>
              </div>

              <div className="flex-1 min-h-[160px] flex items-center justify-center">
                {recommendation ? (
                  <div className="w-full bg-[#1a1820] p-8 rounded-3xl border-l-4 border-[#5b13ec] animate-in slide-in-from-bottom-4 duration-500">
                     <p className="text-white text-lg italic leading-relaxed font-medium">"{recommendation}"</p>
                  </div>
                ) : (
                  <div className="text-[#453c55] text-center italic">
                    Waiting for your query...
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* GRID */}
          <section className="mt-16 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black tracking-tight">Handpicked for <span className="text-[#5b13ec]">You</span></h2>
              <button className="text-xs font-black uppercase tracking-widest text-[#5b13ec] hover:text-white transition-colors">View Library</button>
            </div>
            
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
};

const SidebarLink = ({ icon, label, active = false }) => (
  <a href="#" className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all group ${active ? 'bg-[#5b13ec] text-white shadow-lg shadow-[#5b13ec]/20' : 'text-[#a69db9] hover:bg-[#1a1820] hover:text-white'}`}>
    <span className={`${active ? 'text-white' : 'text-[#453c55] group-hover:text-[#5b13ec]'} transition-colors`}>{icon}</span>
    {label}
  </a>
);

const PodcastCard = ({ podcast, onPlay, active, isPlaying }) => (
  <div 
    onClick={onPlay}
    className="group bg-[#121118] rounded-[2rem] p-5 space-y-5 cursor-pointer hover:bg-[#1a1820] transition-all border border-transparent hover:border-[#2e2839] shadow-sm hover:shadow-2xl hover:-translate-y-2"
  >
    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
      <img src={podcast.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={podcast.title} />
      <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <div className="size-16 bg-[#5b13ec] rounded-2xl flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-all shadow-2xl shadow-[#5b13ec]/40">
          {active && isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} fill />}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
        {podcast.duration}
      </div>
    </div>
    <div className="space-y-1 px-1">
      <h3 className="font-bold text-lg leading-snug truncate group-hover:text-[#5b13ec] transition-colors">{podcast.title}</h3>
      <p className="text-sm text-[#453c55] font-bold truncate uppercase tracking-wide">{podcast.host}</p>
    </div>
  </div>
);

// ICONS
const HomeIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const BrowseIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const RadioIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>;
const HistoryIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const FavoriteIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const ArtistIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const FolderIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;

export default App;
