'use client';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header username="John Doe" credits={100} />
            <main className="flex-1 max-w-[1920px] mx-auto w-full px-4 md:px-6 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
} 