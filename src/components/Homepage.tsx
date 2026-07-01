import { useState, useEffect, useCallback } from 'react';
import bdcLogoWhite from "../assets/bdc-logo-white.svg";
import imgRectangle3345 from "figma:asset/136a54b5bc1624f8d1393b42a1a8c77d82a3e5fe.png";
import imgSmile from "figma:asset/ec5c186881609cb136cd58b01e8b972c2e00dedd.png";

const slides = [
  {
    image: imgRectangle3345,
    headline: 'Your Smile, Our Priority',
    subtitle: 'Premium dental care in the heart of Beirut',
  },
  {
    image: imgSmile,
    headline: 'Confident Smiles Start Here',
    subtitle: 'Cosmetic & restorative treatments by top specialists',
  },
  {
    image: 'https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBtb2Rlcm4lMjBpbnRlcmlvciUyMGJyaWdodHxlbnwxfHx8fDE3NzIwMjAwMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    headline: 'State-of-the-Art Clinic',
    subtitle: 'Modern equipment for the best results',
  },
];

function Depth4Frame() {
  return (
    <div className="relative shrink-0" data-name="Depth 4, Frame 0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit]">
        <p className="[white-space-collapse:collapse] font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-center text-nowrap text-white w-full">Book Now</p>
      </div>
    </div>
  );
}

function Depth3Frame({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="basis-0 bg-[#26C4B5] grow h-[48px] max-w-[480px] min-h-px min-w-[84px] relative rounded-[24px] shrink-0 hover:bg-[#1FA99B] transition-colors cursor-pointer"
      data-name="Depth 3, Frame 0"
    >
      <div className="flex flex-row items-center justify-center max-w-inherit min-w-inherit overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[48px] items-center justify-center max-w-inherit min-w-inherit px-[20px] py-0 relative w-full">
          <Depth4Frame />
        </div>
      </div>
    </button>
  );
}

function Depth2Frame({ onClick }: { onClick?: () => void }) {
  return (
    <div className="absolute box-border content-stretch flex items-start left-1/2 px-[16px] py-[12px] bottom-[96px] sm:bottom-[120px] translate-x-[-50%] w-full max-w-[390px] z-10" data-name="Depth 2, Frame 4">
      <Depth3Frame onClick={onClick} />
    </div>
  );
}

function Layer() {
  return (
    <div className="absolute left-1/2 top-[72px] sm:top-[110px] translate-x-[-50%] w-[160px] sm:w-[200px] z-10" data-name="Logo">
      <img src={bdcLogoWhite} alt="Beirut Dental Clinic" className="block w-full h-auto" />
    </div>
  );
}

interface HomepageProps {
  onEnterDashboard?: () => void;
}

export function Homepage({ onEnterDashboard }: HomepageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((currentSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, goToSlide]);

  return (
    <div className="bg-black relative w-full h-dvh overflow-hidden" data-name="iPhone 14 & 15 Pro Max - 51">
      <div className="relative w-full h-full overflow-hidden">

        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-[600ms] ease-in-out"
            style={{ opacity: currentSlide === index ? 1 : 0, zIndex: currentSlide === index ? 1 : 0 }}
          >
            <img
              src={slide.image}
              alt={slide.headline}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
          </div>
        ))}

        {/* Logo - always on top */}
        <Layer />

        {/* Slide text */}
        <div className="absolute bottom-[200px] left-0 right-0 z-10 px-6 text-center">
          
          
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-[152px] sm:bottom-[176px] left-0 right-0 z-10 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'w-7 h-2.5 bg-white'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Book Now CTA */}
        <Depth2Frame onClick={onEnterDashboard} />
      </div>
    </div>
  );
}
