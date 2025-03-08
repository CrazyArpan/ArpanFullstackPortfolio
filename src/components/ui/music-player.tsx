
import React, { useState, useRef, useEffect } from "react";
import { GlassmorphicCard } from "./glassmorphic-card";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music as MusicIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Track {
  name: string;
  artist: string;
  url: string;
}

const defaultTracks: Track[] = [
  {
    name: "Calm Waters",
    artist: "Ambient Sounds",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1ac2a05bc1.mp3?filename=relaxing-mountains-rivers-streams-running-water-18178.mp3"
  },
  {
    name: "Forest Morning",
    artist: "Nature Sounds",
    url: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_288e8eb03f.mp3?filename=morning-garden-birds-nature-ambient-sound-127411.mp3"
  },
  {
    name: "Meditation Piano",
    artist: "Peaceful Melodies",
    url: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3d3ae174e.mp3?filename=soft-piano-ambient-music-115667.mp3"
  }
];

export const MusicPlayer = () => {
  const [tracks] = useState<Track[]>(defaultTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.4); // Lower default volume for background music
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  
  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set up audio event listeners
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.volume = volume;

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [currentTrackIndex, volume]);

  // Handle track end
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTrackEnd = () => {
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(prev => prev + 1);
      } else {
        setCurrentTrackIndex(0);
      }
    };

    audio.addEventListener('ended', handleTrackEnd);
    return () => {
      audio.removeEventListener('ended', handleTrackEnd);
    };
  }, [currentTrackIndex, tracks.length]);

  // Listen for toggle music event
  useEffect(() => {
    const handleToggleMusic = () => {
      togglePlay();
      setIsVisible(true);
    };

    window.addEventListener("toggleMusic", handleToggleMusic);
    return () => {
      window.removeEventListener("toggleMusic", handleToggleMusic);
    };
  }, []);

  // Toggle visibility with timeout
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.error("Error playing audio:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex(prev => (prev === 0 ? tracks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentTrackIndex(prev => (prev === tracks.length - 1 ? 0 : prev + 1));
  };

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    const audio = audioRef.current;
    
    if (!progressBar || !audio) return;
    
    const rect = progressBar.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;
    audio.currentTime = percent * duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
    if (value === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div
      className={cn(
        "fixed bottom-8 right-8 z-40 transition-all duration-500 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
    >
      <GlassmorphicCard glowColor="purple" className="p-4 w-72">
        <audio
          ref={audioRef}
          src={currentTrack.url}
          preload="metadata"
        />
        
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex-1 flex items-center">
              <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full mr-3">
                {isPlaying ? (
                  <div className="flex gap-0.5">
                    <span className="w-1 h-3 bg-primary rounded-full animate-[pulse_1s_ease-in-out_infinite]"></span>
                    <span className="w-1 h-4 bg-primary rounded-full animate-[pulse_1s_ease-in-out_infinite_0.2s]"></span>
                    <span className="w-1 h-2 bg-primary rounded-full animate-[pulse_1s_ease-in-out_infinite_0.4s]"></span>
                  </div>
                ) : (
                  <MusicIcon size={16} className="text-primary" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-sm truncate">{currentTrack.name}</h4>
                <p className="text-xs text-foreground/60 truncate">{currentTrack.artist}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={toggleMute}
                className="p-1.5 hover:bg-primary/10 rounded-full transition-colors"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-primary/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div 
              ref={progressBarRef}
              onClick={handleProgressChange}
              className="h-1.5 w-full bg-primary/20 rounded-full cursor-pointer relative overflow-hidden"
            >
              <div 
                className="absolute top-0 left-0 h-full bg-primary rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-foreground/60">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex justify-center items-center space-x-6">
            <button 
              onClick={handlePrevious}
              className="p-1.5 hover:bg-primary/10 rounded-full transition-colors"
            >
              <SkipBack size={18} />
            </button>
            
            <button 
              onClick={togglePlay} 
              className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <button 
              onClick={handleNext}
              className="p-1.5 hover:bg-primary/10 rounded-full transition-colors"
            >
              <SkipForward size={18} />
            </button>
          </div>
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default MusicPlayer;
