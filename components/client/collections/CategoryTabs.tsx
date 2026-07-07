"use client";
import { useState } from "react";

const tabs = ["All", "Nightwear", "Loungewear", "Accessories", "Home"];

export default function CategoryTabs() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex overflow-x-auto hide-scrollbar gap-3 pt-2 pb-6 bg-background/95 backdrop-blur-sm z-40 md:justify-center">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-1.5 md:px-6 md:py-2.5 rounded-full whitespace-nowrap text-[13px] md:text-sm font-medium transition-all active:scale-95 shadow-sm ${
            activeTab === tab
              ? "bg-[#4c623d] text-white"
              : "bg-[#eee0d6]/50 text-[#44483f] hover:bg-[#eee0d6]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
