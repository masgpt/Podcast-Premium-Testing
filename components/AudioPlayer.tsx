
import React, { useState, useEffect, useRef } from 'react';
import { Podcast } from '../types';
import { PlayIcon, PauseIcon } from './Icons';
import { COLORS } from '../constants';

interface AudioPlayerProps {
  podcast: Podcast | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ podcast, isPlaying, onTogglePlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Playback failed", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, podcast]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!podcast) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#2e2839] border-t border-[#453c55] px-10 py-3 flex items-center gap-6 z-50">
      <audio
        ref={audioRef}
        src={podcast.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      
      <div className="flex items-center gap-4 w-1/4">
        <img src={podcast.imageUrl} alt={podcast.title} className="w-12 h-12 rounded object-cover" />
        <div className="overflow-hidden">
          <p className="text-white font-bold truncate">{podcast.title}</p>
          <p className="text-[#a69db9] text-xs truncate">{podcast.host}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center gap-1">
        <div className="flex items-center gap-6">
          <button className="text-[#a69db9] hover:text-white transition-colors">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
              <path d="M208,40V216a8,8,0,0,1-13.66,5.66L116,143.31V216a8,8,0,0,1-13.66,5.66L34.34,153.66a8,8,0,0,1,0-11.32L102.34,74.34A8,8,0,0,1,116,80v72.69l78.34-78.35A8,8,0,0,1,208,80Z" />
            </svg>
          </button>
          
          <button 
            onClick={onTogglePlay}
            className="w-10 h-10 bg-[#5b13ec] rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform"
          >
            {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} fill />}
          </button>

          <button className="text-[#a69db9] hover:text-white transition-colors">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
              <path d="M48,216V40a8,8,0,0,1,13.66-5.66L140,112.69V40a8,8,0,0,1,13.66-5.66l68,68a8,8,0,0,1,0,11.32L153.66,181.66A8,8,0,0,1,140,176V103.31L61.66,181.66A8,8,0,0,1,48,176Z" />
            </svg>
          </button>
        </div>

        <div className="w-full max-w-xl flex items-center gap-3">
          <span className="text-xs text-[#a69db9] min-w-[32px]">{formatTime(currentTime)}</span>
          <div className="flex-1 h-1 bg-[#453c55] rounded-full relative cursor-pointer group">
            <div 
              className="absolute h-full bg-[#5b13ec] rounded-full" 
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            />
          </div>
          <span className="text-xs text-[#a69db9] min-w-[32px]">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="w-1/4 flex justify-end items-center gap-3">
        <svg width="20" height="20" className="text-[#a69db9]" fill="currentColor" viewBox="0 0 256 256">
          <path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31a8,8,0,0,0,12.91-6.31V32A8,8,0,0,0,155.51,24.81ZM216,128a40,40,0,0,1-11.72,28.28,8,8,0,1,1-11.31-11.31A24,24,0,0,0,200,128a24,24,0,0,0-7-17,8,8,0,1,1,11.31-11.31A40,40,0,0,1,216,128Z" />
        </svg>
        <div className="w-24 h-1 bg-[#453c55] rounded-full relative">
          <div className="absolute h-full w-2/3 bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
