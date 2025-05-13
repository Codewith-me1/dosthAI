'use client'; // Assuming this is at the top of your file

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  ArrowLeft,
  Volume2,
  Play,
  Pause,
  VolumeX,
  Loader,
  Heart,
  SkipForward,
  SkipBack,
  Repeat,
  Maximize2,
  Minimize2
} from 'lucide-react';

// --- Interfaces ---
interface StoryStep {
  audio: string;
  image: string;
  step: string;
  prompt?: string;
}

interface StoryData {
  title: string;
  story: StoryStep[];
  thumbnailUrl?: string;
}

interface StoryPopupProps {
  open: boolean;
  onClose: () => void;
  storyData: StoryData | null;
}

const StoryPopup: React.FC<StoryPopupProps> = ({ open, onClose, storyData }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [subtitleWords, setSubtitleWords] = useState<string[]>([]);
  const [activeSubtitleWordIndex, setActiveSubtitleWordIndex] = useState<number>(-1);
  const [isLooping, setIsLooping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentStep = storyData?.story?.[currentStepIndex];
  const totalSteps = storyData?.story?.length ?? 0;
  const storyTitle = storyData?.title ?? 'Story';
  const currentStepThumbnail = currentStep?.image ?? storyData?.thumbnailUrl ?? storyData?.story?.[0]?.image ?? 'https://via.placeholder.com/40';

  const formatTime = useCallback((timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0 || !isFinite(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, []);

  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      if (audio.readyState >= 3) {
        audio.play()
          .then(() => setIsAudioPlaying(true))
          .catch((err) => {
            console.warn("Audio play failed:", err);
            setIsAudioPlaying(false);
          });
      } else {
        setIsAudioLoading(true);
      }
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = isLooping;
    }
  }, [isLooping]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !open || !currentStep) return;

    const currentSource = audio.currentSrc;
    const newSource = currentStep.audio;
    setActiveSubtitleWordIndex(-1);

    if (currentSource !== newSource) {
      setIsAudioPlaying(false);
      setIsAudioLoading(true);
      setAudioCurrentTime(0);
      setAudioDuration(0);
      audio.src = newSource;
      audio.load();
    } else {
      if (!isAudioPlaying && initialLoadComplete) {
        playAudio();
      }
    }
  }, [open, currentStepIndex, currentStep?.audio, initialLoadComplete, playAudio]);

  useEffect(() => {
    if (open && initialLoadComplete && !isAudioLoading && audioRef.current && audioRef.current.paused && audioRef.current.readyState >= 3) {
      playAudio();
    }
  }, [open, initialLoadComplete, isAudioLoading, currentStepIndex, playAudio]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!open) {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
        audio.loop = false;
      }
      setCurrentStepIndex(0);
      setIsAudioPlaying(false);
      setIsAudioLoading(false);
      setAudioCurrentTime(0);
      setAudioDuration(0);
      setInitialLoadComplete(false);
      setIsLooping(false);
      if (isFullscreen && document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.error("Error exiting fullscreen on close:", err));
      }
      setIsFullscreen(false);
    } else {
      setIsAudioLoading(true);
      setInitialLoadComplete(false);
      if (storyData?.story?.[currentStepIndex]?.audio && audio) {
          if (audio.currentSrc !== storyData.story[currentStepIndex].audio) {
            audio.src = storyData.story[currentStepIndex].audio;
            audio.load();
          }
      }
    }
  }, [open, isFullscreen, storyData, currentStepIndex]); // Added currentStepIndex as storyData can change but index might be the same

  const handleAudioLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      const duration = audio.duration;
      setAudioDuration(isFinite(duration) && duration > 0 ? duration : 0);
    }
  }, []);

  const handleAudioTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setAudioCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleAudioEnded = useCallback(() => {
    setIsAudioPlaying(false);
    setAudioCurrentTime(isLooping ? 0 : (audioDuration > 0 ? audioDuration : 0));

    if (!isLooping) {
      if (currentStepIndex < totalSteps - 1) {
        setCurrentStepIndex(prev => prev + 1);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        playAudio();
      }
    }
  }, [currentStepIndex, totalSteps, audioDuration, isLooping, playAudio]); // Removed onClose from deps unless intended

  const handleAudioVolumeChange = useCallback(() => { if (audioRef.current) setIsAudioMuted(audioRef.current.muted); }, []);
  const handleAudioCanPlay = useCallback(() => { setIsAudioLoading(false); setInitialLoadComplete(true);}, []);
  const handleAudioWaiting = useCallback(() => { setIsAudioLoading(true); setIsAudioPlaying(false); }, []);
  const handleAudioPlayingEvent = useCallback(() => { setIsAudioLoading(false); setIsAudioPlaying(true); }, []);
  const handleAudioError = useCallback((e: Event) => { console.error('Audio Error:', audioRef.current?.error, e); setIsAudioLoading(false); setIsAudioPlaying(false); setAudioDuration(0); }, []);
  const handleAudioPauseEvent = useCallback(() => { setIsAudioPlaying(false); }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener('loadedmetadata', handleAudioLoadedMetadata);
    audio.addEventListener('timeupdate', handleAudioTimeUpdate);
    audio.addEventListener('ended', handleAudioEnded);
    audio.addEventListener('volumechange', handleAudioVolumeChange);
    audio.addEventListener('canplay', handleAudioCanPlay);
    audio.addEventListener('canplaythrough', handleAudioCanPlay);
    audio.addEventListener('waiting', handleAudioWaiting);
    audio.addEventListener('playing', handleAudioPlayingEvent);
    audio.addEventListener('error', handleAudioError);
    audio.addEventListener('pause', handleAudioPauseEvent);

    if (audio.readyState >= 1) handleAudioLoadedMetadata();
    if (audio.readyState >= 3) handleAudioCanPlay();

    setIsAudioMuted(audio.muted);

    return () => {
      audio.removeEventListener('loadedmetadata', handleAudioLoadedMetadata);
      audio.removeEventListener('timeupdate', handleAudioTimeUpdate);
      audio.removeEventListener('ended', handleAudioEnded);
      audio.removeEventListener('volumechange', handleAudioVolumeChange);
      audio.removeEventListener('canplay', handleAudioCanPlay);
      audio.removeEventListener('canplaythrough', handleAudioCanPlay);
      audio.removeEventListener('waiting', handleAudioWaiting);
      audio.removeEventListener('playing', handleAudioPlayingEvent);
      audio.removeEventListener('error', handleAudioError);
      audio.removeEventListener('pause', handleAudioPauseEvent);
    };
  }, [handleAudioLoadedMetadata, handleAudioTimeUpdate, handleAudioEnded, handleAudioVolumeChange, handleAudioCanPlay, handleAudioWaiting, handleAudioPlayingEvent, handleAudioError, handleAudioPauseEvent]);

  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || (isAudioLoading && !initialLoadComplete && !audioDuration)) {
        if (audio && audio.src && audio.readyState < 3) {
            setIsAudioLoading(true);
            audio.load();
            audio.play().then(() => setIsAudioPlaying(true)).catch(() => {/* ignore */});
        }
        return;
    }
    if (audio.paused) playAudio(); else audio.pause();
  }, [isAudioLoading, initialLoadComplete, audioDuration, playAudio]);

  const handleVolumeToggle = useCallback(() => { if (audioRef.current) audioRef.current.muted = !audioRef.current.muted; }, []);
  const handleNextStep = useCallback(() => { if (currentStepIndex < totalSteps - 1) setCurrentStepIndex(prev => prev + 1); }, [currentStepIndex, totalSteps]);
  const handlePreviousStep = useCallback(() => { if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1); }, [currentStepIndex]);
  const handleThumbnailClick = useCallback((index: number) => setCurrentStepIndex(index), []);
  const handleToggleLoop = useCallback(() => setIsLooping(prev => !prev), []);
  const handleToggleFullscreen = useCallback(() => {
    const elem = containerRef.current;
    if (!elem) return;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`));
    } else {
      document.exitFullscreen();
    }
  }, []);

  const renderPromptWithHighlight = (text?: string) => {
    if (!text) return null;
    const parts = text.split(/(short camping trip)/gi);
    return parts.map((part, index) =>
      part.toLowerCase() === "short camping trip" ? (
        <span key={index} className="text-yellow-400">{part}</span>
      ) : ( part )
    );
  };

  // ***** MOVED HOOK *****
  // This useEffect is now placed BEFORE the early return.
  useEffect(() => {
    if (currentStep?.step) {
      setSubtitleWords(currentStep.step.split(' '));
      setActiveSubtitleWordIndex(-1); // Reset active word index when step changes
    } else {
      setSubtitleWords([]);
      setActiveSubtitleWordIndex(-1);
    }
  }, [currentStep]); // Depends on currentStep

  // Early return: All hooks above this line will always be called.
  if (!open || !storyData || !currentStep) {
    return null;
  }

  const showStepChangeLoader = isAudioLoading && !initialLoadComplete && !audioDuration;

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex flex-col text-white font-sans">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-3 overflow-hidden">
          <button onClick={onClose} aria-label="Back" className="flex-shrink-0 text-white hover:text-gray-300">
            <ArrowLeft size={28} />
          </button>
          <h2 className="text-lg md:text-xl font-semibold truncate whitespace-nowrap">{storyTitle}</h2>
        </div>
        <button onClick={onClose} aria-label="Close" className="flex-shrink-0 text-white hover:text-gray-300">
          <X size={28} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col md:flex-row pt-16 md:pt-20 px-40 md:pb-24 overflow-hidden">
        {/* Left Side: Image */}
        <div className="relative w-full md:w-3/4 h-1/2 md:h-full flex items-center justify-center bg-black md:p-6 order-1 md:order-1">
          <img
            key={currentStep.image}
            src={currentStep.image}
            alt={currentStep.prompt || currentStep.step || `Step ${currentStepIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-2xl transition-opacity duration-500 ease-in-out"
          />
          {showStepChangeLoader && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <Loader size={60} className="animate-spin text-white/90" />
            </div>
          )}
          <audio ref={audioRef} muted={isAudioMuted} preload="metadata" className="hidden" />
        </div>

        {/* Right Side: Text & Thumbnails */}
        <div className="w-full mt-14 md:w-2/4 h-1/2 md:h-full flex flex-col p-6 md:py-6 md:pr-10 md:pl-0 order-2 md:order-2 overflow-y-auto">
          <div className="relative flex-grow flex flex-col">
            <div
              className="absolute inset-x-0 top-0 text-center text-5xl md:text-7xl font-bold text-white/5 select-none pointer-events-none leading-tight"
              style={{ top: '5%'}}
            >
              Let's create a story
            </div>
            <div className="relative z-10">
              <div className="text-2xl md:text-3xl text-white-400 mb-1 md:mb-2">
                {currentStepIndex + 1}/{totalSteps}
              </div>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight ">
                {currentStep?.step && subtitleWords.length > 0 && (
                  <>
                    {subtitleWords.map((word, index) => (
                      <span key={index} className={index === activeSubtitleWordIndex ? 'subtitle-word-highlight' : ''} >
                        {word}{' '}
                      </span>
                    ))}
                  </>
                )}
                {/* If you prefer to use the prompt field, you can use renderPromptWithHighlight here */}
                {/* {renderPromptWithHighlight(currentStep.prompt || currentStep.step)} */}
              </h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Controls Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent">
        {/* Progress Bar */}
        <div className="relative h-1.5 bg-white/20 rounded-full mb-2 cursor-pointer group"
             onClick={(e) => {
               if (!audioRef.current || audioDuration <=0) return;
               const rect = e.currentTarget.getBoundingClientRect();
               const clickX = e.clientX - rect.left;
               const newTime = (clickX / rect.width) * audioDuration;
               audioRef.current.currentTime = newTime;
             }}
        >
          <div
            className="absolute left-0 top-0 h-full bg-white rounded-full transition-all duration-100 ease-linear group-hover:bg-yellow-400"
            style={{ width: `${audioDuration > 0 ? (audioCurrentTime / audioDuration) * 100 : 0}%` }}
          />
          <div
            className="absolute left-0 top-0 h-full w-3 h-3 -mt-1 rounded-full bg-white shadow-md transition-all duration-100 ease-linear transform group-hover:scale-125 group-hover:bg-yellow-400"
            style={{ left: `calc(${audioDuration > 0 ? (audioCurrentTime / audioDuration) * 100 : 0}% - 6px)` }}
          />
        </div>

        <div className="flex items-center justify-between text-white">
          {/* Left side: Thumbnail & Title */}
          <div className="flex items-center gap-2 w-1/4 opacity-80">
            <img src={currentStepThumbnail} alt="Current step thumbnail" className="w-10 h-10 rounded-md object-cover" />
            <span className="text-sm font-medium truncate hidden sm:inline">{storyTitle}</span>
          </div>

          {/* Center controls */}
          <div className="flex items-center gap-x-2 sm:gap-x-3 justify-center">
            <button onClick={handleVolumeToggle} aria-label={isAudioMuted ? 'Unmute' : 'Mute'} className="p-2 hover:bg-white/10 rounded-full">
              {isAudioMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              onClick={handlePreviousStep}
              disabled={currentStepIndex === 0}
              aria-label="Previous Step"
              className="p-2 hover:bg-white/10 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <SkipBack size={22} />
            </button>
            <button
              onClick={handlePlayPause}
              disabled={(isAudioLoading && !audioDuration)}
              className="bg-white text-black rounded-full p-2.5 sm:p-3 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed mx-1"
              aria-label={isAudioPlaying ? 'Pause' : 'Play'}
            >
              {(isAudioLoading && !isAudioPlaying && !initialLoadComplete) ? ( // Show loader if truly loading new source and not yet playable
                <Loader size={24} className="animate-spin" />
              ) : isAudioPlaying ? (
                <Pause size={24} fill="currentColor" />
              ) : (
                <Play size={24} fill="currentColor" />
              )}
            </button>
            <button
              onClick={handleNextStep}
              disabled={currentStepIndex === totalSteps - 1}
              aria-label="Next Step"
              className="p-2 hover:bg-white/10 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <SkipForward size={22} />
            </button>
            <button
                onClick={handleToggleLoop}
                aria-label="Toggle Loop"
                className={`p-2 hover:bg-white/10 rounded-full ${isLooping ? 'text-yellow-400' : ''}`}
            >
                <Repeat size={20} />
            </button>
          </div>
          
          {/* Right side: Fullscreen, Save */}
          <div className="flex items-center gap-x-2 sm:gap-x-3 justify-end w-1/4">
            <button
                onClick={handleToggleFullscreen}
                aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                className="p-2 hover:bg-white/10 rounded-full"
            >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            <button aria-label="Save Story" className="flex items-center gap-1.5 p-2 hover:bg-white/10 rounded-full">
              <Heart size={20} />
              <span className="text-sm font-medium hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPopup;

// Add this to your global CSS for a better scrollbar on thumbnails if needed:
/*
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
*/