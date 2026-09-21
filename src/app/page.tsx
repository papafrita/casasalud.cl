import Hero from '@/components/landing/Hero';
import Services from '@/components/landing/Services';
import TeamShowcase from '@/components/landing/TeamShowcase';
import BookingSection from '@/components/landing/BookingSection';
import Testimonials from '@/components/landing/Testimonials';
import JoinTeam from '@/components/landing/JoinTeam';
import PlatformInfo from '@/components/landing/PlatformInfo';
import VisionMission from '@/components/landing/VisionMission';
import Footer from '@/components/landing/Footer';
import WelcomeModal from '@/components/landing/WelcomeModal';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={null}>
          <WelcomeModal />
      </Suspense>
      <Hero />
      <Services />
      <TeamShowcase />
      <BookingSection />
      <Testimonials />
      <JoinTeam />
      <PlatformInfo />
      <VisionMission />
      <Footer />
    </main>
  );
}
