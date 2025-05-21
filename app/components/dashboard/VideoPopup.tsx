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
  const [isLooping, setIsLooping] = useState(false); // This now means "loop the entire story"
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
      if (audio.readyState >= 3) { // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
        audio.play()
          .then(() => setIsAudioPlaying(true))
          .catch((err) => {
            console.warn("Audio play failed:", err);
            setIsAudioPlaying(false);
          });
      } else {
        setIsAudioLoading(true); // Still loading, show loading state
      }
    }
  }, []);

  // REMOVED: The useEffect that set audio.loop directly.
  // The isLooping state will now be handled by handleAudioEnded for story-level looping.
  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (audio) {
  //     audio.loop = isLooping; // This made individual tracks loop
  //   }
  // }, [isLooping]);

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
      audio.load(); // This will trigger 'canplay' or 'canplaythrough'
    } else {
      // Source is the same, check if it should play
      if (!isAudioPlaying && initialLoadComplete && audio.paused && audio.readyState >= 3) {
        playAudio();
      }
    }
  }, [open, currentStepIndex, currentStep?.audio, initialLoadComplete, playAudio]); // Added currentStep?.audio

  useEffect(() => {
    // This effect tries to play audio once it's ready, especially after a step change
    // or when the popup opens and initial content is loaded.
    if (open && initialLoadComplete && !isAudioLoading && audioRef.current && audioRef.current.paused && audioRef.current.readyState >= 3) {
      playAudio();
    }
  }, [open, initialLoadComplete, isAudioLoading, currentStepIndex, playAudio]); // currentStepIndex ensures it re-evaluates on step change

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
        // audio.src = ''; // Clearing src can sometimes cause issues if not handled carefully; resetting on open is safer
        // audio.loop = false; // No longer needed as we removed the direct loop effect
      }
      setCurrentStepIndex(0);
      setIsAudioPlaying(false);
      setIsAudioLoading(false);
      setAudioCurrentTime(0);
      setAudioDuration(0);
      setInitialLoadComplete(false);
      // setIsLooping(false); // Optionally reset loop state on close
      if (isFullscreen && document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.error("Error exiting fullscreen on close:", err));
      }
      setIsFullscreen(false);
    } else {
      // When popup opens, ensure the correct audio for the currentStepIndex is loaded
      setIsAudioLoading(true);
      setInitialLoadComplete(false); // Reset this to ensure loading indicators show correctly
      if (storyData?.story?.[currentStepIndex]?.audio && audio) {
          // If the current src is not what it should be for the current step, update it
          // This also helps if storyData itself changes while the popup is open.
        const expectedSrc = storyData.story[currentStepIndex].audio;
        if (audio.currentSrc !== expectedSrc || audio.src === '') {
          audio.src = expectedSrc;
          audio.load();
        } else if (audio.paused && audio.readyState >=3) { // If src is correct but paused
            playAudio();
        }
      }
    }
  }, [open, isFullscreen, storyData, currentStepIndex, playAudio]);

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

  // --- MODIFIED ---
  const handleAudioEnded = useCallback(() => {
    setIsAudioPlaying(false);

    if (isLooping) { // Story loop is active
      if (currentStepIndex === totalSteps - 1) { // If it's the last step of the story
        setCurrentStepIndex(0); // Go back to the first step
        // The useEffect watching currentStepIndex will handle loading and playing the audio for step 0
      } else { // Not the last step, but story loop is on
        setCurrentStepIndex(prev => prev + 1); // Go to the next step
      }
    } else { // Story loop is NOT active
      if (currentStepIndex < totalSteps - 1) { // If not the last step
        setCurrentStepIndex(prev => prev + 1); // Go to the next step
      } else {
        // It's the last step and story loop is off, so playback naturally ends.
        // Set current time to duration to reflect it's finished.
        setAudioCurrentTime(audioDuration > 0 ? audioDuration : 0);
      }
    }
  }, [currentStepIndex, totalSteps, isLooping, audioDuration]); // playAudio removed from deps as it's not directly called

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
    audio.addEventListener('canplaythrough', handleAudioCanPlay); // Also treat as canplay
    audio.addEventListener('waiting', handleAudioWaiting);
    audio.addEventListener('playing', handleAudioPlayingEvent);
    audio.addEventListener('error', handleAudioError);
    audio.addEventListener('pause', handleAudioPauseEvent);

    // Initial checks in case events were missed or state is already set
    if (audio.readyState >= 1) handleAudioLoadedMetadata(); // HAVE_METADATA
    if (audio.readyState >= 3) handleAudioCanPlay();     // HAVE_FUTURE_DATA / HAVE_ENOUGH_DATA

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
    if (!audio) return;

    // If audio is loading (e.g., new src set) and not yet playable (no duration)
    if (isAudioLoading && !initialLoadComplete && !audioDuration && audio.readyState < 3) {
        // If there's a src and it's not ready, try to load/play again
        if (audio.src) {
            setIsAudioLoading(true); // Ensure loading state
            audio.load(); // Attempt to load again
            // Autoplay might be blocked, but playAudio will handle promise
            playAudio();
        }
        return;
    }

    if (audio.paused) {
        playAudio();
    } else {
        audio.pause();
    }
  }, [isAudioLoading, initialLoadComplete, audioDuration, playAudio]);


  const handleVolumeToggle = useCallback(() => { if (audioRef.current) audioRef.current.muted = !audioRef.current.muted; }, []);
  const handleNextStep = useCallback(() => { if (currentStepIndex < totalSteps - 1) setCurrentStepIndex(prev => prev + 1); }, [currentStepIndex, totalSteps]);
  const handlePreviousStep = useCallback(() => { if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1); }, [currentStepIndex]);
  const handleThumbnailClick = useCallback((index: number) => setCurrentStepIndex(index), []);
  const handleToggleLoop = useCallback(() => setIsLooping(prev => !prev), []); // This toggles the story loop flag
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

  useEffect(() => {
    if (currentStep?.step) {
      setSubtitleWords(currentStep.step.split(' '));
      setActiveSubtitleWordIndex(-1);
    } else {
      setSubtitleWords([]);
      setActiveSubtitleWordIndex(-1);
    }
  }, [currentStep]);

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
      <div className="flex-grow flex flex-col md:flex-row pt-16 md:pt-20 px-4 md:px-8 lg:px-40 md:pb-24 overflow-hidden"> {/* Adjusted padding */}
        {/* Left Side: Image */}
        <div className={`relative w-full h-full flex items-center justify-center ${isFullscreen ? 'bg-black' : ''}`}>
          <img
            key={currentStep.image} // Use a key to force re-render on image change if needed for transitions
            src={currentStep.image}
            alt={currentStep.prompt || currentStep.step || `Step ${currentStepIndex + 1}`}
            className={`object-contain w-full h-full ${isFullscreen ? 'rounded-none' : 'rounded-lg md:rounded-2xl'}`}
            style={{ maxHeight: isFullscreen ? '100vh' : undefined }}
          />
          {isFullscreen && (
            <div className="absolute bottom-0 left-0 w-full px-4 pb-8 flex justify-center pointer-events-none">
              <div className="bg-black/80 text-white text-xl md:text-2xl px-6 py-3 rounded-lg mb-4 pointer-events-auto"
                   style={{maxWidth: '90vw'}}>
                <span>
                  {currentStep?.step && subtitleWords.length > 0 ? (
                    subtitleWords.map((word, index) => (
                      <span key={index} className={index === activeSubtitleWordIndex ? 'subtitle-word-highlight' : ''}>
                        {word}{' '}
                      </span>
                    ))
                  ) : (
                    currentStep?.step
                  )}
                </span>
              </div>
            </div>
          )}
          {showStepChangeLoader && ( // This loader is for when audio is loading but not yet ready (e.g. new step)
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <Loader size={60} className="animate-spin text-white/90" />
            </div>
          )}
          <audio ref={audioRef} muted={isAudioMuted} preload="metadata" className="hidden" />
        </div>

        {/* Right Side: Text & Thumbnails */}
        <div className="w-full mt-4 md:mt-0 md:w-1/2 lg:w-2/4 h-1/2 md:h-full flex flex-col p-4 md:py-6 md:pr-4 lg:pr-10 md:pl-4 lg:pl-6 order-2 md:order-2 overflow-y-auto custom-scrollbar"> {/* Adjusted padding and added custom-scrollbar */}
          <div className="relative flex-grow flex flex-col">
            <div
              className="absolute inset-x-0 text-center text-4xl sm:text-5xl md:text-7xl font-bold text-white/5 select-none pointer-events-none leading-tight"
              style={{ top: '5%'}} // Adjust as needed
            >
              Let's create a story
            </div>
            <div className="relative z-10 mt-8 md:mt-16"> {/* Added margin-top to push content below bg text */}
              <div className="text-xl md:text-2xl lg:text-3xl text-gray-400 mb-1 md:mb-2">
                {currentStepIndex + 1}/{totalSteps}
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white">
                {currentStep?.step && subtitleWords.length > 0 && (
                  <>
                    {subtitleWords.map((word, index) => (
                      <span key={index} className={index === activeSubtitleWordIndex ? 'subtitle-word-highlight' : ''} >
                        {word}{' '}
                      </span>
                    ))}
                  </>
                )}
                {/* {renderPromptWithHighlight(currentStep.prompt || currentStep.step)} */}
              </h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Controls Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent">
        {/* Progress Bar - Smooth Combined */}
        <div
          className="relative h-[6px] md:h-[8px] bg-white/20 rounded-full mb-2 cursor-pointer group" // Made slightly thinner on mobile
          onClick={e => {
            if (!storyData?.story?.length || !audioRef.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percent = clickX / rect.width;
            const totalStorySteps = storyData.story.length;
            
            // Determine which step is clicked
            const clickedStepIndex = Math.floor(percent * totalStorySteps);
            
            if (clickedStepIndex >= 0 && clickedStepIndex < totalStorySteps) {
              if (currentStepIndex !== clickedStepIndex) {
                setCurrentStepIndex(clickedStepIndex);
                // Time will be reset by the useEffect that loads the new step's audio
              } else {
                // Clicked within the current step, so seek audio
                if (audioDuration > 0) {
                  const stepStartPercent = clickedStepIndex / totalStorySteps;
                  const stepEndPercent = (clickedStepIndex + 1) / totalStorySteps;
                  const percentWithinStep = (percent - stepStartPercent) / (stepEndPercent - stepStartPercent);
                  audioRef.current.currentTime = percentWithinStep * audioDuration;
                  setAudioCurrentTime(audioRef.current.currentTime); // Update UI immediately
                }
              }
            }
          }}
        >
          <div
            className="absolute left-0 top-0 h-full bg-white group-hover:bg-yellow-400 rounded-full transition-all duration-150" // Faster transition for hover
            style={{
              width: (() => {
                if (totalSteps === 0) return '0%';
                let progress = currentStepIndex / totalSteps;
                if (audioDuration > 0 && totalSteps > 0) {
                  progress += (audioCurrentTime / audioDuration) / totalSteps;
                }
                return `${Math.min(progress, 1) * 100}%`;
              })()
            }}
          />
        </div>

        <div className="flex items-center justify-between text-white">
          {/* Left side: Thumbnail & Title */}
          <div className="flex items-center gap-2 w-1/4 opacity-80 hover:opacity-100 transition-opacity">
            <img src={currentStepThumbnail} alt="Current step thumbnail" className="w-8 h-8 md:w-10 md:h-10 rounded-md object-cover" />
            <span className="text-xs sm:text-sm font-medium truncate hidden sm:inline">{storyTitle}</span>
          </div>

          {/* Center controls */}
          <div className="flex items-center gap-x-1 sm:gap-x-2 md:gap-x-3 justify-center">
            <button onClick={handleVolumeToggle} aria-label={isAudioMuted ? 'Unmute' : 'Mute'} className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full">
              {isAudioMuted ? <VolumeX size={18} md-size={20} /> : <Volume2 size={18} md-size={20} />}
            </button>
            <button
              onClick={handlePreviousStep}
              disabled={currentStepIndex === 0}
              aria-label="Previous Step"
              className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <SkipBack size={20} md-size={22} />
            </button>
            <button
              onClick={handlePlayPause}
              disabled={(isAudioLoading && !audioDuration && !initialLoadComplete)} // Disable if loading AND no duration AND not initially complete
              className="bg-white text-black rounded-full p-2 sm:p-2.5 md:p-3 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed mx-0.5 sm:mx-1"
              aria-label={isAudioPlaying ? 'Pause' : 'Play'}
            >
              {/* More specific loader condition: shown when audio is actively trying to load and not yet playing */}
              {(isAudioLoading && !isAudioPlaying && audioRef.current?.readyState && audioRef.current.readyState < 3) ? (
                <Loader size={22} md-size={24} className="animate-spin" />
              ) : isAudioPlaying ? (
                <Pause size={22} md-size={24} fill="currentColor" />
              ) : (
                <Play size={22} md-size={24} fill="currentColor" />
              )}
            </button>
            <button
              onClick={handleNextStep}
              disabled={currentStepIndex === totalSteps - 1 && !isLooping} // Disable if last step AND not looping story
              aria-label="Next Step"
              className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <SkipForward size={20} md-size={22} />
            </button>
            <button
                onClick={handleToggleLoop}
                aria-label="Toggle Story Loop"
                className={`p-1.5 sm:p-2 hover:bg-white/10 rounded-full ${isLooping ? 'text-yellow-400' : ''}`}
            >
                <Repeat size={18} md-size={20} />
            </button>
          </div>
          
          {/* Right side: Fullscreen, Save */}
          <div className="flex items-center gap-x-1 sm:gap-x-2 md:gap-x-3 justify-end w-1/4">
            <button
                onClick={handleToggleFullscreen}
                aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full"
            >
                {isFullscreen ? <Minimize2 size={18} md-size={20} /> : <Maximize2 size={18} md-size={20} />}
            </button>
            <button aria-label="Save Story" className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 hover:bg-white/10 rounded-full">
              <Heart size={18} md-size={20} />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Save</span>
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
  width: 6px; // For vertical scrollbar
  height: 6px; // For horizontal scrollbar
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}
.subtitle-word-highlight {
  color: #FACC15; // Tailwind yellow-400
  // Add other styles like background if needed
}
*/