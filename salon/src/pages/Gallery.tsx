import { GalleryGrid } from '../components/sections/GalleryGrid';
import '../styles/index.css'

export default function Gallery() {
  return (
    <>
      {/* Hero Banner */}
      <div
        className="px-[5%] pt-[120px] pb-16 text-center"
        style={{ background: 'linear-gradient(135deg,#FFF0F8,#F5EEFF)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <p className="text-xs tracking-[3px] uppercase text-rose-deep font-semibold mb-3">
            Our Portfolio
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-salon-text leading-tight">
            A Glimpse of Our Magic ✨
          </h1>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-16 px-[5%] bg-white">
        <div className="max-w-[1200px] mx-auto">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
