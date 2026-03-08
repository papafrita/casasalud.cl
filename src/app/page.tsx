import Hero from '@/components/landing/Hero';
import Services from '@/components/landing/Services';
import TeamShowcase from '@/components/landing/TeamShowcase';
import BookingSection from '@/components/landing/BookingSection';
import Testimonials from '@/components/landing/Testimonials';
import JoinTeam from '@/components/landing/JoinTeam';
import AboutCatalina from '@/components/landing/AboutCatalina';
import Qualifications from '@/components/landing/Qualifications';
import PlatformInfo from '@/components/landing/PlatformInfo';
import VisionMission from '@/components/landing/VisionMission';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <TeamShowcase />
      <BookingSection />
      <Testimonials />
      <JoinTeam />
      <AboutCatalina />
      <Qualifications />
      <PlatformInfo />
      <VisionMission />
      <Footer />
    </main>
  );
}
