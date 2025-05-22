// app/createCards/CreateCardsClientPage.tsx (or similar path)
"use client";

import GeneratedContentDisplay from "@/app/components/dashboard/createCards"; // Adjust path as needed
import { useSearchParams } from "next/navigation";
import React from "react";

const CreateCardsContent = () => {
  const searchParams = useSearchParams();
  const promptTitle =
    searchParams.get("prompt") ||
    "Create a pack of cards with cat dressed as karate kid";
  const numCardsParam = searchParams.get("cardCount");
  const numCards = numCardsParam ? Number(numCardsParam) : 4;
  // const assessmentType = searchParams.get("assessmentType") || ""; // Uncomment if needed
  // const level = searchParams.get("level") || ""; // Uncomment if needed

  // Ensure your image paths are correct and accessible from the public folder
  const imageUrls = Array(numCards) // Corrected to numCards, not numCards + 1 unless intended
    .fill(0)
    .map((_, i) => `/Kids.jpg`); // Example: make sure Kids.jpg is in your /public folder

  return (
    <GeneratedContentDisplay
      numCards={numCards}
      promptTitle={promptTitle}
      imageUrls={imageUrls}
      // Pass assessmentType and level if your GeneratedContentDisplay component uses them
    />
  );
};

export default CreateCardsContent;
