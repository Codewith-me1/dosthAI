import Card from "@/app/components/dashboard/Card";
import CarouselBoard from "@/app/components/dashboard/CarouselBoard";
import KidProfile from "@/app/components/dashboard/KidProfile";

import Sidebar from "@/app/components/dashboard/Sidebar";
import KidsProfile from "@/app/components/KidsProfile";

interface StoryItem {
    id: string;
    title: string;
    imageUrl: string;
    rating: number;
    views: number;
    type: 'story' | 'activity';
  }

  
// This page receives the dynamic [id] param from the URL
export default function KidPage({ params }: { params: { id: string } }) {
  // In a real app, fetch kid data by id here. For now, use mock data:
  const kid = {
    id: params.id,
    name: 'John Doe', // You can replace with fetched data
    age: 8,
    role: 'client', // or 'BCBA'
  };


  const items: StoryItem[] = [
    {
      id: '1',
      title: 'How to walk my dog lorem ipsum dolor amet?',
      imageUrl: '/dummyimage.jpg',
      rating: 4.5,
      views: 1.2,
      type: 'story'
    },
    {
      id: '2',
      title: 'How to walk my dog lorem ipsum dolor amet?',
      imageUrl: '/dummyimage.jpg',
      rating: 4.8,
      views: 2.1,
      type: 'story'
    },
    {
      id: '3',
      title: 'How to walk my dog lorem ipsum dolor amet?',
      imageUrl: '/dummyimage.jpg',
      rating: 4.3,
      views: 1.5,
      type: 'story'
    },
    {
      id: '4',
      title: 'How to walk my dog lorem ipsum dolor amet?',
      imageUrl: '/dummyimage.jpg',
      rating: 4.7,
      views: 1.8,
      type: 'activity'
    },
    {
      id: '5',
      title: 'How to walk my dog lorem ipsum dolor amet?',
      imageUrl: '/dummyimage.jpg',
      rating: 4.6,
      views: 1.3,
      type: 'activity'
    }
  ];

  return (
   
    <div className="min-h-screen ">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="max-w-7xl  mx-5 md:mx-10 lg:mx-20 px-4 sm:px-6 lg:px-8 py-8">
          <KidProfile name="test" age="12" role="student"/>
  <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-900 mb-4">Stories</h2>
        <div className="flex gap-4 sm:gap-6">
          {items.filter(item => item.type === 'story').map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.imageUrl}
              rating={item.rating}
              category={item.type}
              type={item.type}
            />
          ))}
        </div>
      </div>

      {/* Activities Section */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-900 mb-4">Activities</h2>
        <div className="flex gap-4 sm:gap-6">
          {items.filter(item => item.type === 'activity').map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.imageUrl}
              rating={item.rating}
              category={item.type}
              type={item.type}
            />
          ))}
        </div>
      </div>
        </div>
        
      </main>
    </div>

  );
}
