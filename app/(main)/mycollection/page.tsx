import React from 'react';
import Collection from '@/app/components/dashboard/Collection';
import Sidebar from '@/app/components/dashboard/Sidebar';

export default function MyCollectionPage() {
  return (
    <div className="min-h-screen ">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="max-w-7xl  mx-5 md:mx-10 lg:mx-20 px-4 sm:px-6 lg:px-8 py-8">
          <Collection />
        </div>
      </main>
    </div>
  );
} 

