import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

// Lazy-loaded pages
const Home = lazy(() => import('../pages/Home'));
const Services = lazy(() => import('../pages/Services'));
const Gallery = lazy(() => import('../pages/Gallery'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Booking = lazy(() => import('../pages/Booking'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF0F8] to-[#F5EEFF]">
      <div className="text-center">
        <div className="font-display text-3xl font-bold bg-gradient-to-br from-rose-deep to-purple-500 bg-clip-text text-transparent animate-shimmer mb-3">
          ✦ Lumina
        </div>
        <div className="w-32 h-0.5 bg-rose-deep/20 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-rose-deep to-lavender rounded-full animate-[loadProgress_1s_ease_infinite]" />
        </div>
      </div>
    </div>
  );
}

export function AppRoutes() {
  return (
    <MainLayout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}
