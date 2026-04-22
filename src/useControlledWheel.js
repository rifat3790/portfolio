import { useEffect, useRef } from 'react';

export function useControlledWheel(swiperRef, enabled) {
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (!enabled || !swiperRef.current) return;

    const handleWheel = (e) => {
      const swiper = swiperRef.current.swiper;
      if (!swiper || isTransitioning.current) return;

      const activeSlide = swiper.slides[swiper.activeIndex];
      if (!activeSlide) return;

      const scrollTop = activeSlide.scrollTop;
      const clientHeight = activeSlide.clientHeight;
      const scrollHeight = activeSlide.scrollHeight;
      const atBottom = scrollHeight - clientHeight <= scrollTop + 2;
      const atTop = scrollTop <= 2;
      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      // If not at the edge, allow normal scroll inside the slide
      if ((goingDown && !atBottom) || (goingUp && !atTop)) {
        return;
      }

      // At the edge: prevent default and change slide
      e.preventDefault();
      isTransitioning.current = true;

      if (goingDown) {
        swiper.slideNext();
      } else if (goingUp) {
        swiper.slidePrev();
      }

      setTimeout(() => {
        isTransitioning.current = false;
      }, 800); // match your Swiper speed
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [enabled, swiperRef]);
}