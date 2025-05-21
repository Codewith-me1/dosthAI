    'use client';

    import { useState, useRef, useEffect } from 'react';

    interface StoryStep {
    image: string;
    audio: string;
    step: string;
    }

    interface StoryProps {
    story: StoryStep[];
    title: string;
    }

function StoryPlayer({ story, title }: StoryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
        audioRef.current.play();
        }
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex < story.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const currentSlide = story[currentIndex];

    return (
        <div className="bg-black text-white w-full min-h-screen flex flex-col items-center justify-center px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>

        <div className="bg-[#1a1a1a] rounded-3xl p-6 shadow-lg flex flex-col md:flex-row gap-6 w-full max-w-4xl">
            <img
            src={currentSlide.image}
            alt="Story Scene"
            className="w-full md:w-1/2 rounded-xl object-cover"
            />

            <div className="flex flex-col justify-between md:w-1/2">
            <p className="text-lg text-yellow-400 font-semibold mb-2">
                Step {currentIndex + 1}/{story.length}
            </p>
            <p className="text-xl text-white font-medium mb-4">{currentSlide.step}</p>

            <div className="flex items-center gap-4 mt-auto">
                <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="bg-gray-700 text-white py-2 px-4 rounded-lg disabled:opacity-40"
                >
                ⏮️ Prev
                </button>
                <button
                onClick={handleNext}
                disabled={currentIndex === story.length - 1}
                className="bg-purple-600 text-white py-2 px-4 rounded-lg disabled:opacity-40"
                >
                Next ⏭️
                </button>
            </div>
            </div>
        </div>

        <audio
            ref={audioRef}
            src={currentSlide.audio}
            controls
            autoPlay
            className="mt-6 w-full max-w-md"
        />
        </div>
    );
    }

export default StoryPlayer;