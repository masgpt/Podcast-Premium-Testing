
import React, { useState, useCallback } from 'react';
import { Podcast } from './types';
import { PODCASTS, COLORS } from './constants';
import { PlayIcon, SearchIcon, UserIcon } from './components/Icons';
import AudioPlayer from './components/AudioPlayer';
import { getAiRecommendation } from './services/geminiService';

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
    const rec = await getAiRecommendation(searchQuery);
    setRecommendation(rec);
    setIsLoadingRec(false);
  };

  return (
    <div 
      className="relative flex h-screen w-full flex-col bg-[#131118] overflow-hidden"
      style={{ fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#2e2839] px-10 py-3 shrink-0">
        <div className="flex items-center gap-4 text-white">
          <div className="size-6 text-[#5b13ec]">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-white text-xl font-black leading-tight tracking-[-0.015em]">Podcast Hub</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <nav className="flex items-center gap-9">
            <a className="text-white text-sm font-medium hover:text-[#5b13ec] transition-colors" href="#">Home</a>
            <a className="text-white text-sm font-medium hover:text-[#5b13ec] transition-colors" href="#">Podcasts</a>
            <a className="text-white text-sm font-medium hover:text-[#5b13ec] transition-colors" href="#">About</a>
          </nav>
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#2e2839] text-white hover:bg-[#453c55] transition-colors">
              <SearchIcon size={20} />
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#2e2839] text-white hover:bg-[#453c55] transition-colors">
              <UserIcon size={20} />
            </button>
          </div>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-[#2e2839]"
            style={{ backgroundImage: 'url("https://picsum.photos/seed/user1/100/100")' }}
          ></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-6xl mx-auto px-10 py-8 space-y-12">
          
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-2xl h-[480px] group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2000")' }}
            />
            <div className="relative h-full flex flex-col items-center justify-center text-center p-8 gap-6 max-w-2xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em]">
                  Discover Your Next Favorite Podcast
                </h1>
                <p className="text-white/80 text-lg leading-relaxed">
                  Explore a curated collection of insightful and entertaining podcasts. From global tech to mindful wellness, start listening to stories that matter.
                </p>
              </div>
              <button className="h-12 px-8 bg-[#5b13ec] hover:bg-[#4d0fd0] text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-[#5b13ec]/20">
                Explore All Podcasts
              </button>
            </div>
          </section>

          {/* AI Discovery Tool */}
          <section className="bg-[#2e2839] rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 border border-[#453c55]">
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold">AI Podcast Scout</h2>
              <p className="text-[#a69db9]">Tell me what you're interested in, and I'll find the perfect episode for you.</p>
              <form onSubmit={handleAskAi} className="flex gap-2">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. 'Future of work' or 'Cooking healthy'"
                  className="flex-1 bg-[#131118] border-[#453c55] rounded-xl text-white focus:ring-[#5b13ec] focus:border-[#5b13ec]"
                />
                <button 
                  disabled={isLoadingRec}
                  className="px-6 py-2 bg-[#5b13ec] rounded-xl font-bold hover:bg-[#4d0fd0] disabled:opacity-50 transition-colors"
                >
                  {isLoadingRec ? 'Scouting...' : 'Ask Scout'}
                </button>
              </form>
            </div>
            {recommendation && (
              <div className="flex-1 bg-[#131118]/50 p-6 rounded-xl border border-[#5b13ec]/30 animate-in fade-in slide-in-from-right-4 duration-500">
                <p className="text-sm italic text-[#5b13ec] mb-2">Recommendation for you:</p>
                <p className="text-white leading-relaxed">{recommendation}</p>
              </div>
            )}
          </section>

          {/* Featured Podcasts List */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Featured Episodes</h2>
            <div className="grid grid-cols-1 gap-6">
              {PODCASTS.map((podcast) => (
                <div 
                  key={podcast.id}
                  className="bg-[#2e2839] rounded-2xl p-6 flex flex-col lg:flex-row gap-8 hover:bg-[#383146] transition-colors border border-transparent hover:border-[#453c55]"
                >
                  <div className="flex flex-[2_2_0px] flex-col justify-between py-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#131118] text-[#5b13ec] text-[10px] font-black uppercase tracking-wider rounded-md">
                          {podcast.category}
                        </span>
                        <span className="text-xs text-[#a69db9]">• {podcast.duration}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white leading-tight">{podcast.title}</h3>
                      <p className="text-[#a69db9] leading-relaxed line-clamp-2">
                        {podcast.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handlePlayPodcast(podcast)}
                      className="mt-6 flex items-center gap-2 px-6 py-2.5 bg-[#131118] text-white rounded-xl font-bold w-fit hover:bg-white hover:text-[#131118] transition-all group"
                    >
                      <PlayIcon size={18} fill={currentPodcast?.id === podcast.id && isPlaying} />
                      <span>{currentPodcast?.id === podcast.id && isPlaying ? 'Playing' : 'Listen Now'}</span>
                    </button>
                  </div>
                  <div 
                    className="w-full lg:w-[400px] h-[225px] bg-center bg-cover rounded-xl shadow-xl transform group-hover:scale-[1.02] transition-transform"
                    style={{ backgroundImage: `url(${podcast.imageUrl})` }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Horizontal mini tiles */}
          <section className="space-y-6">
             <h2 className="text-2xl font-bold tracking-tight">More to Discover</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PODCASTS.map((p) => (
                  <div key={`mini-${p.id}`} className="bg-[#2e2839] p-4 rounded-xl flex items-center gap-4 hover:translate-y-[-2px] transition-transform cursor-pointer group">
                    <img src={p.imageUrl} alt={p.title} className="size-16 rounded-lg object-cover" />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-bold truncate text-sm">{p.title}</p>
                      <p className="text-xs text-[#a69db9] truncate">{p.host}</p>
                    </div>
                    <button 
                      onClick={() => handlePlayPodcast(p)}
                      className="size-10 rounded-full bg-[#5b13ec] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <PlayIcon size={16} fill />
                    </button>
                  </div>
                ))}
             </div>
          </section>
        </div>
      </main>

      {/* Persistent Audio Player */}
      <AudioPlayer 
        podcast={currentPodcast} 
        isPlaying={isPlaying} 
        onTogglePlay={() => setIsPlaying(!isPlaying)}
      />
    </div>
  );
};

export default App;
