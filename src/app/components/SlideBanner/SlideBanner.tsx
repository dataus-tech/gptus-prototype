import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import css from 'app/components/SlideBanner/SlideBanner.module.css';

const SlideBanner: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, next: number) => {
      setActiveSlide(next);
    },
  };

  const firstTab = activeSlide === 0;
  const secondTab = activeSlide === 1;
  const thirdTab = activeSlide === 2;

  return (
    <div className={css['slider-container']}>
      <Slider {...settings}>
        <div className={css['banner']}>
          <div className={css['container']}>
            <div className={css['banner-box']}>
              아이부터 할아버지까지
              <br /> 삶에 필요한 개인 맞춤형 학습컨텐츠
            </div>
            <div className={css['banner-box']}>
              <img src="/images/banner.png" alt="배너 이미지" />
            </div>
          </div>
        </div>
        <div className={css['banner']}>
          <div className={css['container']}>
            <div className={css['banner-box']}>
              비슷한 관심사를 서로 공유하여
              <br /> 더 재밌는 결과를 만드는 동아리
            </div>
            <div className={css['banner-box']}>
              <img src="/images/banner.png" alt="배너 이미지" />
            </div>
          </div>
        </div>
        <div className={css['banner']}>
          <div className={css['container']}>
            <div className={css['banner-box']}>
              도메인 전문가의 도움을
              <br /> 온/ 오프라인에서 받을 수 있는 멘토
            </div>
            <div className={css['banner-box']}>
              <img src="/images/banner.png" alt="배너 이미지" />
            </div>
          </div>
        </div>
      </Slider>
      <div className={css['sub-nav']}>
        <div className={`${css['tab']} ${firstTab && css['selected']}`}>
          생애주기 별 맞춤형 교육과정
        </div>
        <div className={`${css['tab']} ${secondTab && css['selected']}`}>
          친구들과 함께 즐기는 놀이터
        </div>
        <div className={`${css['tab']} ${thirdTab && css['selected']}`}>
          전문가의 트레이닝 및 코칭
        </div>
      </div>
    </div>
  );
};

export default SlideBanner;
