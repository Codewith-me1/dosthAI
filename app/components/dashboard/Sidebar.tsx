'use client';

import React, { useState } from 'react';
import { Plus, Menu, X, Edit2, Trash2 } from 'lucide-react';
import AddKidModal, { KidProfile as KidProfileType } from './AddKidModal';
import KidProfile from './KidProfile';

interface SidebarProps {
  activeMenu?: string;
  onMenuClick?: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu = 'All', onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKid, setSelectedKid] = useState<KidProfileType | null>(null);
  const [kids, setKids] = useState<KidProfileType[]>([
    { id: '1', name: 'John Doe', age: '8', conditions: ['adhd'], preferNotToSay: false, role: 'student' },
    { id: '2', name: 'Alex Jones', age: '10', conditions: ['dyslexia'], preferNotToSay: false, role: 'client' },
  ]);
  const [editingKid, setEditingKid] = useState<KidProfileType | null>(null);
  
  const menuItems = [
    { id: 'all', label: 'All' },
    { id: 'stories', label: 'Stories' },
    { id: 'activities', label: 'Activities' },
    { id: 'cards-pack', label: 'Cards Pack' },
  ];

  const handleAddKid = (profile: Omit<KidProfileType, 'id'>) => {
    if (editingKid) {
      // Update existing kid
      setKids(prevKids =>
        prevKids.map(kid =>
          kid.id === editingKid.id
            ? { ...profile, id: kid.id }
            : kid
        )
      );
      setEditingKid(null);
    } else {
      // Add new kid
      const newKid = {
        ...profile,
        id: Date.now().toString(),
        role: 'student', // default role for new kid
      };
      setKids(prevKids => [...prevKids, newKid]);
    }
    setIsModalOpen(false);
  };

  const handleEditKid = (kid: KidProfileType) => {
    setEditingKid(kid);
    setIsModalOpen(true);
  };

  const handleDeleteKid = (kidId: string) => {
    setKids(prevKids => prevKids.filter(kid => kid.id !== kidId));
    if (selectedKid?.id === kidId) {
      setSelectedKid(null);
    }
  };

  const handleKidClick = (kid: KidProfileType) => {
    setSelectedKid(kid);
    setIsOpen(false); // Close mobile sidebar when kid is selected
  };

  return (
    <div className={`h-screen ${selectedKid ? "flex flex-col lg:flex-row" : "absolute"}`}>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          w-full lg:w-[300px] min-w-[240px] bg-white border-r border-gray-100
          fixed lg:static
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          z-50
          h-screen lg:h-auto
        `}
      >
        <div className="flex flex-col h-full p-4 lg:p-6">
          {/* Menu Section */}
          <div className="mb-6 lg:mb-8">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Menu</h3>
            <nav>
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onMenuClick?.(item.id);
                        setIsOpen(false);
                        setSelectedKid(null);
                      }}
                      className={`w-full border-b-2 border-gray-100 text-left px-4 py-3 text-sm transition-all duration-200 ${
                        activeMenu === item.label
                          ? 'bg-[#F3F8FF] hover:bg-[#FFF4CC] border-r-4 border-[#6100FF] text-[#6100FF] font-medium'
                          : 'text-gray-600 hover:bg-[#FFF4CC] hover:border-[#6100FF] hover:border-r-4 hover:text-[#6100FF]'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* My Kids Section */}
          <div className="mb-6 lg:mb-8">
            <h3 className="text-sm font-medium text-gray-500 mb-4">My Kids</h3>
            <ul className="space-y-1">
              {kids.map((kid) => (
                <li key={kid.id} className="group relative">
                  {/* <Link
                    href={
                       `/mycollection/kids/${kid.id}`
                    }
                    className={`w-full inline-block text-left px-4 py-2 text-sm transition-colors duration-200 ${
                      selectedKid?.id === kid.id
                        ? 'bg-[#F3F8FF] text-[#6100FF] font-medium'
                        : 'text-gray-600 hover:bg-[#FFF4CC]'
                    }`}
                  >
                    {kid.name}
                  </Link> */}
                  <h1>Kid</h1>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditKid(kid);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Edit2 className="h-4 w-4 text-gray-500" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteKid(kid.id);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setEditingKid(null);
                    setIsModalOpen(true);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-sm text-[#2E74FF] font-medium flex items-center gap-2 hover:bg-[#FFF4CC]"
                >
                  <Plus className="h-4 w-4" />
                  Add Another Kid
                </button>
              </li>
            </ul>
          </div>

          {/* Buy Coins Section */}
          <div className="mt-auto">
            <h3 className="text-sm font-medium text-[#2E74FF] mb-2">Buy more coins</h3>
            <p className="text-sm text-gray-600 mb-1">
              Buy coins to create, stories, activities, & Cards
            </p>
            <p className="text-sm">
              Starting <span className="font-medium">$7.99</span>
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      {selectedKid && (
        <div className="flex-1 overflow-auto bg-gray-50">
          <KidProfile name={selectedKid.name} age={selectedKid.age} role={selectedKid.role || 'student'} />
        </div>
      )}

      <AddKidModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingKid(null);
        }}
        onAdd={handleAddKid}
      />
    </div>
  );
};

export default Sidebar; 