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
  ChevronLeft,
  ChevronRight,
  SkipForward,  // Assuming you had this or meant ChevronRight for next step
  SkipBack,     // Assuming you had this or meant ChevronLeft for prev step
  Repeat,       // For Loop
  Maximize2,    // For Fullscreen
  Minimize2     // For Exit Fullscreen
} from 'lucide-react';
// import { BsSkipBackward } from 'react-icons/bs'; // This was in your provided code but not used, removing unless needed

// --- Interfaces (remain the same as your provided code) ---
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

// --- CSS for highlighting (add this to your global CSS or a relevant stylesheet) ---
/*
.subtitle-word-highlight {
  background-color: rgba(255, 255, 0, 0.75); // Yellow background
  color: #111; // Darker text color for contrast
  padding: 0.05em 0.15em; // Minimal padding
  border-radius: 0.2em;
  transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
  display: inline-block; // Helps with consistent background application
}
.loop-active {
  color: #34D399; // Example: Green color when loop is active
}
*/

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

  // --- State for Loop and Fullscreen ---
  const [isLooping, setIsLooping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the main popup container for fullscreen

  const currentStep = storyData?.story?.[currentStepIndex];
  const totalSteps = storyData?.story?.length ?? 0;
  const title = storyData?.title ?? 'Story';
  const thumbnailUrl = storyData?.thumbnailUrl ?? storyData?.story?.[0]?.image ?? 'https://via.placeholder.com/40';

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
    if (currentStep?.step) {
      setSubtitleWords(currentStep.step.split(' '));
      setActiveSubtitleWordIndex(-1);
    } else {
      setSubtitleWords([]);
      setActiveSubtitleWordIndex(-1);
    }
  }, [currentStep]);

  // Update audio element's loop property
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
      audio.src = newSource;
      audio.load();
    } else {
      if (!isAudioPlaying && initialLoadComplete) playAudio();
    }
    return () => { if (audio) audio.pause(); };
  }, [open, currentStepIndex, currentStep?.audio, initialLoadComplete, playAudio]);

  useEffect(() => {
    if (open && initialLoadComplete && !isAudioLoading && audioRef.current && audioRef.current.paused) {
      playAudio();
    }
  }, [open, initialLoadComplete, isAudioLoading, currentStepIndex, playAudio]);

  // Fullscreen change listener
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
        audio.loop = false; // Ensure loop is off on close
      }
      setCurrentStepIndex(0);
      setIsAudioPlaying(false);
      setIsAudioLoading(false);
      setAudioCurrentTime(0);
      setAudioDuration(0);
      setInitialLoadComplete(false);
      setActiveSubtitleWordIndex(-1);
      setSubtitleWords([]);
      setIsLooping(false); // Reset loop state
      if (isFullscreen && document.fullscreenElement) { // Exit fullscreen if active
        document.exitFullscreen().catch(err => console.error("Error exiting fullscreen on close:", err));
      }
      setIsFullscreen(false); // Reset fullscreen state
    } else {
      setIsAudioLoading(true);
      setInitialLoadComplete(false);
      setActiveSubtitleWordIndex(-1);
    }
  }, [open, isFullscreen]);


  useEffect(() => {
    if (!isAudioPlaying || audioDuration <= 0 || subtitleWords.length === 0) {
      if (activeSubtitleWordIndex !== -1 && !isAudioPlaying) {/* Keep highlight on pause */ }
      return;
    }
    const words = subtitleWords;
    const numWords = words.length;
    const estimatedTimePerWord = audioDuration / numWords;
    let calculatedIndex = Math.floor(audioCurrentTime / estimatedTimePerWord);
    calculatedIndex = Math.min(calculatedIndex, numWords - 1);
    if (calculatedIndex !== activeSubtitleWordIndex) {
      setActiveSubtitleWordIndex(calculatedIndex);
    }
  }, [audioCurrentTime, audioDuration, subtitleWords, isAudioPlaying, activeSubtitleWordIndex]);

  const handleAudioLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      const duration = audio.duration;
      setAudioDuration(isFinite(duration) && duration > 0 ? duration : 0);
      setActiveSubtitleWordIndex(-1);
    }
  }, []);

  const handleAudioTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setAudioCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleAudioEnded = useCallback(() => {
    setIsAudioPlaying(false);
    setActiveSubtitleWordIndex(-1);
    setAudioCurrentTime(isLooping ? 0 : (audioDuration > 0 ? audioDuration : 0));

    if (!isLooping) { // Only advance if not looping
        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            onClose(); // Or loop entire story if desired
        }
    } else {
        // If looping, play again
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            playAudio();
        }
    }
  }, [currentStepIndex, totalSteps, onClose, audioDuration, isLooping, playAudio]);

  const handleAudioVolumeChange = useCallback(() => { if (audioRef.current) setIsAudioMuted(audioRef.current.muted); }, []);
  const handleAudioCanPlay = useCallback(() => { setIsAudioLoading(false); setInitialLoadComplete(true); }, []);
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
      audio.removeEventListener('waiting', handleAudioWaiting);
      audio.removeEventListener('playing', handleAudioPlayingEvent);
      audio.removeEventListener('error', handleAudioError);
      audio.removeEventListener('pause', handleAudioPauseEvent);
    };
  }, [handleAudioLoadedMetadata, handleAudioTimeUpdate, handleAudioEnded, handleAudioVolumeChange, handleAudioCanPlay, handleAudioWaiting, handleAudioPlayingEvent, handleAudioError, handleAudioPauseEvent]);

  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || (isAudioLoading && !initialLoadComplete && !audioDuration)) return;
    if (audio.paused) playAudio(); else audio.pause();
  }, [isAudioLoading, initialLoadComplete, audioDuration, playAudio]);

  const handleVolumeToggle = useCallback(() => { if (audioRef.current) audioRef.current.muted = !audioRef.current.muted; }, []);
  const handleNextStep = useCallback(() => { if (currentStepIndex < totalSteps - 1) setCurrentStepIndex(prev => prev + 1); }, [currentStepIndex, totalSteps]);
  const handlePreviousStep = useCallback(() => { if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1); }, [currentStepIndex]);

  // --- Loop and Fullscreen Handlers ---
  const handleToggleLoop = useCallback(() => {
    setIsLooping(prev => !prev);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    const elem = containerRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);


  if (!open || !storyData || !currentStep) return null;
  const showInitialLoader = isAudioLoading && !initialLoadComplete && !audioDuration;

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex flex-col text-white">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between p-3 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-4 overflow-hidden">
          <button onClick={onClose} aria-label="Back" className="flex-shrink-0 text-white hover:text-gray-300">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-base font-semibold truncate whitespace-nowrap">{title}</h2>
        </div>
        <button onClick={onClose} aria-label="Close" className="flex-shrink-0 text-white hover:text-gray-300">
          <X size={24} />
        </button>
      </div>

      {/* Image, Audio & Subtitle Container */}
      <div className="relative flex-grow flex items-center justify-center overflow-hidden bg-black">
        <img
          key={currentStep.image}
          src={currentStep.image}
          alt={currentStep.step || `Step ${currentStepIndex + 1}`}
          className="w-full h-full object-contain transition-opacity duration-300"
        />
        <audio ref={audioRef} muted={isAudioMuted} preload="metadata" />
        {showInitialLoader && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-30">
            <Loader size={48} className="animate-spin text-white/80" />
          </div>
        )}
        {currentStep?.step && subtitleWords.length > 0 && (
          <div className="absolute bottom-[10%] sm:bottom-[12%] md:bottom-[15%] lg:bottom-[18%] left-4 right-4 z-20 pointer-events-none">
            <p className="text-center text-base sm:text-lg md:text-xl font-semibold text-white leading-relaxed px-2 py-1 rounded"
               style={{ backgroundColor: 'rgba(0,0,0,0.6)', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              {subtitleWords.map((word, index) => (
                <span key={index} className={index === activeSubtitleWordIndex ? 'subtitle-word-highlight' : ''} >
                  {word}{' '}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>

      {/* Controls Footer */}
      <div className="relative z-40 px-4 pb-3 pt-2 bg-gradient-to-t from-black/80 to-transparent">
        <div className="relative h-1 bg-white/20 rounded mb-2">
          <div
            className="absolute left-0 top-0 h-full bg-white rounded transition-all duration-100 ease-linear"
            style={{ width: `${audioDuration > 0 ? (audioCurrentTime / audioDuration) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-300 mb-2">
          <span>{formatTime(audioCurrentTime)}</span>
          <span>{formatTime(audioDuration)}</span>
        </div>
        <div className="flex items-center justify-between">
          {/* Left side: Thumbnail */}
          <div className="flex items-center gap-3 opacity-50 w-1/4 justify-start">
            <img src={thumbnailUrl} alt="Thumbnail" className="w-8 h-8 rounded object-cover" />
          </div>

          {/* Center controls: Volume, SkipBack, Play/Pause, SkipForward */}
          <div className="flex items-center gap-x-3 sm:gap-x-4 justify-center w-1/2">
            <button onClick={handleVolumeToggle} aria-label={isAudioMuted ? 'Unmute' : 'Mute'} className="text-white hover:text-gray-300 p-1">
              {isAudioMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              onClick={handlePreviousStep}
              disabled={currentStepIndex === 0}
              aria-label="Previous Step"
              className="text-white disabled:opacity-30 hover:text-gray-300 disabled:hover:text-white p-1"
            >
              <SkipBack size={24} /> {/* Using Lucide's SkipBack */}
            </button>
            <button
              onClick={handlePlayPause}
              disabled={showInitialLoader || (audioDuration <= 0 && !initialLoadComplete)}
              className="bg-white/20 rounded-full p-2 disabled:opacity-50 hover:bg-white/30 mx-1"
              aria-label={isAudioPlaying ? 'Pause' : 'Play'}
            >
              {(isAudioLoading && !showInitialLoader && initialLoadComplete) ? (
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
              className="text-white disabled:opacity-30 hover:text-gray-300 disabled:hover:text-white p-1"
            >
              <SkipForward size={24} /> {/* Using Lucide's SkipForward */}
            </button>
            {/* Loop Button - moved to center right for balance */}
            <button
                onClick={handleToggleLoop}
                aria-label="Toggle Loop"
                className={`text-white hover:text-gray-300 p-1 ${isLooping ? 'text-green-400' : ''}`} // Conditional styling for active loop
            >
                <Repeat size={20} />
            </button>
          </div>
          
          {/* Right side: Fullscreen, Save */}
          <div className="flex items-center gap-x-3 sm:gap-x-4 justify-end w-1/4">
             <button
                onClick={handleToggleFullscreen}
                aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                className="text-white hover:text-gray-300 p-1"
            >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            <button aria-label="Save Story" className="flex items-center gap-1.5 text-white hover:text-gray-300 p-1">
              <Heart size={20} />
              {/* <span className="hidden md:inline text-sm font-medium">Save</span> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPopup;