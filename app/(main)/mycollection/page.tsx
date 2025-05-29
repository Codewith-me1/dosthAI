"use client";

import React, { useState } from "react";
import Collection from "@/app/components/dashboard/collection/Collection";
import Sidebar from "@/app/components/dashboard/collection/Sidebar";

export default function MyCollectionPage() {
  const [activeMenu, setActiveMenu] = useState("all");
  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId); // this updates based on sidebar click
  };
  return (
    <div className="">
      <main className="flex ">
        <Sidebar activeMenu={activeMenu} onMenuClick={handleMenuClick} />

        <div className="w-full  mx-5 md:mx-10 lg:mx-10 px-4 sm:px-6 lg:px-8 py-8">
          {activeMenu === "story" && <Collection category="story" />}
          {activeMenu === "activity" && <Collection category="activity" />}
          {activeMenu === "cards-pack" && <Collection category="cards-pack" />}
          {activeMenu === "all" && <Collection category="all" />}
        </div>
      </main>
    </div>
  );
}
