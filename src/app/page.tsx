'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import AirbnbSection from '@/components/AirbnbSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

export default function Home() {
  return (
    <main className="portfolio-page">
      <CustomCursor />
      <Header />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <AirbnbSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
