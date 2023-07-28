import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LECTURE_CARD_DATA from 'app/data/lectureCardData';

import css from 'app/components/CardSlide/CardSlide.module.css';

interface CardDataType {
  id: number;
  image: string;
  title: string;
  content: string;
  rate: number;
  tags: string[];
}

interface CardSlideType {
  cardData: CardDataType[];
  category: string;
  text: string;
}

const CardSlide = (props: CardSlideType) => {
  const cardData = LECTURE_CARD_DATA;
  const { category, text } = props;

  const chunkArray = (arr: CardDataType[], size: number) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  const slides = chunkArray(cardData, 4);
  const cardNum = Math.ceil(cardData.length / 4);

  return (
    <div className={css.lecture}>
      <div className={css['lecture-category']}>{category}</div>
      <div className={css['lecture-text']}>{text}</div>
      <div className={css['lecture-box']}>
        <div className={css['last-week-best']}>
          최근 일주일 동안 많이 찾은 강의
        </div>
        <div className={css['lecture-num']}>1/{cardNum}</div>
      </div>
      <Carousel
        nextIcon={<img src="/images/chevronRight.png" alt="다음 버튼" />}
        prevIcon={<img src="/images/chevronLeft.png" alt="이전 버튼" />}
      >
        {slides.map((slide, index) => (
          <Carousel.Item key={index} data-bs-interval="false">
            <Row>
              {slide.map((card) => (
                <Col key={card.id} md={3} className="col">
                  <Card className={css['carousel-card']}>
                    <Card.Img
                      className={css['card-img']}
                      variant="top"
                      src={card.image}
                      alt={card.title}
                    />
                    <Card.Body className={css['card-body']}>
                      <Card.Title>{card.title}</Card.Title>
                      <Card.Text>{card.content}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CardSlide;
