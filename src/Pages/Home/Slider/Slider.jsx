import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Slider() {
  return (
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={0}
    slidesPerView={2}
    navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    // onSwiper={(swiper) => console.log(swiper)}
    // onSlideChange={() => console.log('slide change')}
    className='h-[300px]'
    >
      <SwiperSlide><img className='w-full h-full object-cover' src="/couple-1.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img className='w-full h-full object-cover' src='/couple-2.jpg' /></SwiperSlide>
      <SwiperSlide><img className='w-full h-full object-cover' src="/couple-3.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img className='w-full h-full object-cover' src="/couple-4.jpg" alt="" /></SwiperSlide>
    </Swiper>
  );
};