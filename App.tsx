
import React, { useState, useEffect } from 'react';
import { Podcast } from './types.ts';
import { PODCASTS } from './constants.tsx';
import { PlayIcon, PauseIcon, SearchIcon, UserIcon } from './components/Icons.tsx';
import AudioPlayer from './components/AudioPlayer.tsx';
import { getAiRecommendation } from './services/geminiService.ts';

const App: React.FC = () => {
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
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
    <div className="flex h-screen w-full bg-[#131118] text-white overflow-hidden">
      
      {/* LEFT SIDEBAR (Desktop Style) */}
      <aside className="w-64 bg-[#0a090d] border-r border-[#2e2839] flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="size-8 bg-[#5b13ec] rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tight">PODCAST HUB</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<HomeIcon />} label="Home" active />
          <NavItem icon={<BrowseIcon />} label="Browse" />
          <NavItem icon={<RadioIcon />} label="Radio" />
          <div className="pt-6 pb-2 px-2 text-[10px] font-bold text-[#453c55] uppercase tracking-widest">Library</div>
          <NavItem icon={<HistoryIcon />} label="Recently Played" />
          <NavItem icon={<FavoriteIcon />} label="Favorites" />
          <NavItem icon={<ArtistIcon />} label="Followed Hosts" />
        </nav>

        <div className="p-4">
          <div className="bg-[#2e2839] rounded-xl p-4 text-center space-y-3">
            <p className="text-xs text-[#a69db9]">Unlock offline listening and ad-free experience</p>
            <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-[#5b13ec] hover:text-white transition-all">
              Go Premium
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* TOP NAV BAR */}
        <header className="h-16 flex items-center justify-between px-8 bg-[#131118]/80 backdrop-blur-md z-20 sticky top-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#453c55] group-focus-within:text-[#5b13ec]">
                <SearchIcon size={18} />
              </span>
              <input 
                type="text" 
                placeholder="Search podcasts, hosts, or categories..."
                className="w-full bg-[#2e2839] border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#5b13ec] transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="size-10 bg-[#2e2839] rounded-full flex items-center justify-center hover:bg-[#453c55] transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeWidth={2} /></svg>
            </button>
            <div className="flex items-center gap-3 bg-[#2e2839] rounded-full pl-1 pr-4 py-1 border border-[#453c55]">
              <img src="https://picsum.photos/seed/user99/100/100" className="size-8 rounded-full" alt="User" />
              <span className="text-sm font-bold">Alex Rivera</span>
            </div>
          </div>
        </header>

        {/* SCROLLABLE MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto pb-32">
          <div className="p-8 space-y-12">
            
            {/* HERO SECTION */}
            <section className="relative rounded-3xl overflow-hidden h-72">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1478737270239-2fccd27ee8fb?q=80&w=2000" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#131118] via-[#131118]/80 to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-center px-12 space-y-4 max-w-xl">
                <span className="text-[#5b13ec] font-black uppercase text-xs tracking-widest">Trending Now</span>
                <h1 className="text-5xl font-black leading-tight">The Future of Digital Spaces</h1>
                <p className="text-[#a69db9] text-sm leading-relaxed">Join host Sarah Jenkins as she explores how VR and AI are redefining our physical reality.</p>
                <button className="bg-[#5b13ec] hover:bg-[#4d0fd0] text-white px-8 py-3 rounded-full font-bold w-fit transition-all transform hover:scale-105">
                  Listen to Special Episode
                </button>
              </div>
            </section>

            {/* AI RECOMMENDATION ENGINE */}
            <section className="bg-[#2e2839] rounded-2xl p-8 border border-[#453c55] flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-[#5b13ec]/20 text-[#5b13ec] rounded-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </span>
                  <h2 className="text-2xl font-bold">AI Podcast Scout</h2>
                </div>
                <p className="text-sm text-[#a69db9]">Not sure what to hear? Describe your vibe and let Gemini find the perfect match.</p>
                <form onSubmit={handleAskAi} className="flex gap-2">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. 'I want to learn about meditation' or 'Something scary'"
                    className="flex-1 bg-[#131118] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#5b13ec]"
                  />
                  <button 
                    type="submit"
                    disabled={isLoadingRec}
                    className="bg-[#5b13ec] hover:bg-[#4d0fd0] disabled:opacity-50 px-6 rounded-xl font-bold transition-all"
                  >
                    {isLoadingRec ? 'Thinking...' : 'Scout'}
                  </button>
                </form>
              </div>
              {recommendation && (
                <div className="flex-1 bg-[#131118] p-6 rounded-xl border border-[#5b13ec]/30 animate-in fade-in slide-in-from-right duration-500">
                   <p className="text-sm text-white italic leading-relaxed">"{recommendation}"</p>
                </div>
              )}
            </section>

            {/* PODCAST GRID */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Recommended for You</h2>
                <div className="flex gap-2">
                  <button className="size-8 rounded-full border border-[#2e2839] flex items-center justify-center hover:bg-[#2e2839] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button className="size-8 rounded-full border border-[#2e2839] flex items-center justify-center hover:bg-[#2e2839] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

          </div>
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

// HELPER COMPONENTS
const NavItem = ({ icon, label, active = false }) => (
  <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${active ? 'bg-[#5b13ec] text-white' : 'text-[#a69db9] hover:bg-[#2e2839] hover:text-white'}`}>
    {icon}
    {label}
  </a>
);

const PodcastCard = ({ podcast, onPlay, active, isPlaying }) => (
  <div 
    onClick={onPlay}
    className="group bg-[#2e2839] rounded-2xl p-4 space-y-4 cursor-pointer hover:bg-[#383146] transition-all border border-transparent hover:border-[#453c55] transform hover:-translate-y-1"
  >
    <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
      <img src={podcast.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={podcast.title} />
      <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <div className="size-14 bg-[#5b13ec] rounded-full flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-all shadow-xl">
          {active && isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} fill />}
        </div>
      </div>
      <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold">
        {podcast.duration}
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="font-bold truncate group-hover:text-[#5b13ec] transition-colors">{podcast.title}</h3>
      <p className="text-xs text-[#a69db9] truncate">{podcast.host}</p>
    </div>
  </div>
);

// SVGs moved to helper components for cleaner layout
const HomeIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const BrowseIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const RadioIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const HistoryIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const FavoriteIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const ArtistIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

export default App;
