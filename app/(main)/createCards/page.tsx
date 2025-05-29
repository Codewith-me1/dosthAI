// app/createCards/page.tsx (or your specific page file)
import React, { Suspense } from "react";
import CreateCardsContent from "@/app/components/dashboard/create/createCards/MainCreate"; // Adjust path as needed

// Optional: A simple loading fallback component
const LoadingFallback = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      Loading cards...
    </div>
  );
};

const Page = () => {
  return (
    <div>
      <Suspense fallback={<LoadingFallback />}>
        <CreateCardsContent />
      </Suspense>
    </div>
  );
};

export default Page;
