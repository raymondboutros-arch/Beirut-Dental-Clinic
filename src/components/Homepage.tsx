import { useState, useEffect, useCallback } from 'react';
import svgPaths from "../imports/svg-95m1j3vtbe";
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
      className="basis-0 bg-[#027ba4] grow h-[48px] max-w-[480px] min-h-px min-w-[84px] relative rounded-[24px] shrink-0 hover:bg-[#026a8f] transition-colors cursor-pointer"
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
    <div className="absolute box-border content-stretch flex items-start left-1/2 px-[16px] py-[12px] bottom-[120px] sm:bottom-[140px] translate-x-[-50%] w-full max-w-[390px] z-10" data-name="Depth 2, Frame 4">
      <Depth3Frame onClick={onClick} />
    </div>
  );
}

function Layer() {
  return (
    <div className="absolute h-[84px] sm:h-[100px] left-1/2 top-[80px] sm:top-[120px] translate-x-[-50%] w-[140px] sm:w-[160px] z-10" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 140 84">
        <g clipPath="url(#clip0_98_804)" id="Layer_1">
          <path d={svgPaths.p338a8400} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3c804c00} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p23d3ac00} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.pa89d00} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p1f51ba00} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p2a0f5240} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p2428a680} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p3cd080f0} fill="var(--fill-0, white)" id="Vector_8" />
          <g id="Group">
            <path d={svgPaths.p14008500} fill="var(--fill-0, white)" id="Vector_9" />
            <path d={svgPaths.p2e450f80} fill="var(--fill-0, white)" id="Vector_10" />
            <path d={svgPaths.p1b656700} fill="var(--fill-0, white)" id="Vector_11" />
            <path d={svgPaths.p1a96df00} fill="var(--fill-0, white)" id="Vector_12" />
            <path d={svgPaths.p266db400} fill="var(--fill-0, white)" id="Vector_13" />
            <path d={svgPaths.p3aec0a00} fill="var(--fill-0, white)" id="Vector_14" />
            <path d={svgPaths.p26459200} fill="var(--fill-0, white)" id="Vector_15" />
            <path d={svgPaths.pabe2880} fill="var(--fill-0, white)" id="Vector_16" />
            <path d={svgPaths.p2fb89c00} fill="var(--fill-0, white)" id="Vector_17" />
            <path d={svgPaths.p139c8180} fill="var(--fill-0, white)" id="Vector_18" />
            <path d={svgPaths.p2769c3c0} fill="var(--fill-0, white)" id="Vector_19" />
            <path d={svgPaths.p55d6e80} fill="var(--fill-0, white)" id="Vector_20" />
            <path d={svgPaths.p1eda4570} fill="var(--fill-0, white)" id="Vector_21" />
            <path d={svgPaths.p1d56600} fill="var(--fill-0, white)" id="Vector_22" />
            <path d={svgPaths.p81b2000} fill="var(--fill-0, white)" id="Vector_23" />
            <path d={svgPaths.p23d30800} fill="var(--fill-0, white)" id="Vector_24" />
            <path d={svgPaths.p128b1980} fill="var(--fill-0, white)" id="Vector_25" />
            <path d={svgPaths.p13256f30} fill="var(--fill-0, white)" id="Vector_26" />
          </g>
          <g id="Group_2">
            <path d={svgPaths.p34727300} fill="var(--fill-0, white)" id="Vector_27" />
            <path d={svgPaths.p438da00} fill="var(--fill-0, white)" id="Vector_28" />
            <path d={svgPaths.p249b1600} fill="var(--fill-0, white)" id="Vector_29" />
            <path d={svgPaths.pc1f0d00} fill="var(--fill-0, white)" id="Vector_30" />
            <path d={svgPaths.p28d81a80} fill="var(--fill-0, white)" id="Vector_31" />
            <path d={svgPaths.p2cf97080} fill="var(--fill-0, white)" id="Vector_32" />
            <path d={svgPaths.p174e1a00} fill="var(--fill-0, white)" id="Vector_33" />
            <path d={svgPaths.p1ce01100} fill="var(--fill-0, white)" id="Vector_34" />
            <path d={svgPaths.p3cb06800} fill="var(--fill-0, white)" id="Vector_35" />
            <path d={svgPaths.p91adb00} fill="var(--fill-0, white)" id="Vector_36" />
            <path d={svgPaths.p2425fe00} fill="var(--fill-0, white)" id="Vector_37" />
            <path d={svgPaths.pf5c00} fill="var(--fill-0, white)" id="Vector_38" />
            <path d={svgPaths.p12597c70} fill="var(--fill-0, white)" id="Vector_39" />
            <path d={svgPaths.p739c580} fill="var(--fill-0, white)" id="Vector_40" />
            <path d={svgPaths.pb740d00} fill="var(--fill-0, white)" id="Vector_41" />
            <path d={svgPaths.p2e06f300} fill="var(--fill-0, white)" id="Vector_42" />
            <path d={svgPaths.p2881cc00} fill="var(--fill-0, white)" id="Vector_43" />
            <path d={svgPaths.p29219900} fill="var(--fill-0, white)" id="Vector_44" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_98_804">
            <rect fill="white" height="84" width="140" />
          </clipPath>
        </defs>
      </svg>
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
    <div className="bg-black relative w-full min-h-screen flex items-center justify-center pb-[100px]" data-name="iPhone 14 & 15 Pro Max - 51">
      <div className="relative w-full h-full min-h-screen overflow-hidden">

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
        <div className="absolute bottom-[170px] left-0 right-0 z-10 flex items-center justify-center gap-2">
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
