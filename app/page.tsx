import HeroSection from '@/components/home/HeroSection';
import WhatWeBuild from '@/components/home/WhatWeBuild';
import PlaygroundPreview from '@/components/home/PlaygroundPreview';
import HowItWorks from '@/components/home/HowItWorks';
import WhyUs from '@/components/home/WhyUs';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatWeBuild />
      <PlaygroundPreview />
      <HowItWorks />
      <WhyUs />
      <PortfolioPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
