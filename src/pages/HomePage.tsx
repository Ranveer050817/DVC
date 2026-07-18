import { Hero } from '../components/Hero';
import { BeforeAfter } from '../components/BeforeAfter';
import { Packages } from '../components/Packages';
import { MoreServices } from '../components/MoreServices';
import { EnquiryForm } from '../components/EnquiryForm';
import { Reviews } from '../components/Reviews';

export function HomePage() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-24 lg:gap-32">
      <Hero />
      <BeforeAfter />
      <Packages />
      <MoreServices />
      <EnquiryForm />
      <Reviews />
    </div>
  );
}
