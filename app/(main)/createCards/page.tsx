"use client";

import GeneratedContentDisplay from "@/app/components/dashboard/createCards";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const promptTitle =
    searchParams.get("prompt") ||
    "Create a pack of cards with cat dressed as karate kid";
  const numCards = Number(searchParams.get("cardCount")) || 4;
  const assessmentType = searchParams.get("assessmentType") || "";
  const level = searchParams.get("level") || "";

  const imageUrls = Array(numCards + 1)
    .fill(0)
    .map((_, i) => `/Kids.jpg`);

  return (
    <div>
      <GeneratedContentDisplay
        numCards={numCards}
        promptTitle={promptTitle}
        imageUrls={imageUrls}
      />
    </div>
  );
};

export default Page;
