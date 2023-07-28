import React, { useEffect } from 'react';
import UserService from 'app/services/user.service';
import { useSelector } from 'react-redux';
import 'app/pages/Home/Home.css';
import Tags from 'app/components/Tags/Tags';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SlideBanner from 'app/components/SlideBanner/SlideBanner';
// import { Link } from 'react-router-dom';
import DummyCard from 'app/components/DummyCard/DummyCard.tsx';

const Home = () => {
  const accessToken = localStorage.getItem('accessToken');
  const userName = localStorage.getItem('username');

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken && isLoggedIn) {
      UserService.getUserProfile(accessToken)
        .then((response) => {
          if (response.status === 200) {
            const { username } = response.data;
            if (!userName) {
              localStorage.setItem('username', username);
            }
          }
        })
        .catch(() => {
          window.location.reload();
        });
    }
  }, [userName, accessToken, isLoggedIn]);

  const cardData = [
    {
      id: 1,
      image: '/images/lectureSampleImage.png',
      title: 'Card 1',
      content: 'This is the content of card 1.',
    },
    {
      id: 2,
      image: '/images/lectureSampleImage.png',
      title: 'Card 2',
      content: 'This is the content of card 2.',
    },
    {
      id: 3,
      image: '/images/lectureSampleImage.png',
      title: 'Card 3',
      content: 'This is the content of card 3.',
    },
    {
      id: 4,
      image: '/images/lectureSampleImage.png',
      title: 'Card 4',
      content: 'This is the content of card 4.',
    },
    {
      id: 5,
      image: '/images/lectureSampleImage.png',
      title: 'Card 5',
      content: 'This is the content of card 1.',
    },
    {
      id: 6,
      image: '/images/lectureSampleImage.png',
      title: 'Card 6',
      content: 'This is the content of card 2.',
    },
    {
      id: 7,
      image: '/images/lectureSampleImage.png',
      title: 'Card 7',
      content: 'This is the content of card 3.',
    },
    {
      id: 8,
      image: '/images/lectureSampleImage.png',
      title: 'Card 8',
      content: 'This is the content of card 4.',
    },
  ];

  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  const slides = chunkArray(cardData, 4);

  return (
    <div className="home">
      <SlideBanner />
      <div className="statistics">
        <div className="left-box">
          <div className="learning-guide">학습 가이드</div>
          <div className="slogan">
            <div>당신의 꿈은 무엇입니까?</div>
            <div>공부를 왜 하나요?</div>
          </div>
          <div className="slogan-kr">
            미련하게 배우는 시대는 갔습니다. 스마트하게 인공지능 리터러시를
            키워야 합니다.
          </div>
        </div>
        <div className="right-box">
          <div className="right-box-item">
            <div className="num">1232</div>
            <div className="text">Founder</div>
          </div>
          <div className="right-box-item">
            <div className="num">42</div>
            <div className="text">Events</div>
          </div>
          <div className="right-box-item">
            <div className="num">64</div>
            <div className="text">Courses</div>
          </div>
          <div className="right-box-item">
            <div className="num">15</div>
            <div className="text">Trainers</div>
          </div>
        </div>
      </div>

      <div className="guide">
        <div className="category-box">
          <div className="learning-order">내게 맞는 학습 순서</div>
          <div>
            <div>
              <img src="/images/wallet.png" alt="창업" />
            </div>
            <div className="category-text">창업</div>
          </div>
          <div>
            <div>
              <img src="/images/enterprise.png" alt="취업" />
            </div>
            <div className="category-text">취업</div>
          </div>
          <div>
            <div>
              <img src="/images/hobby.png" alt="취미" />
            </div>
            <div className="category-text">취미</div>
          </div>
          <div>
            <div>
              <img src="/images/book.png" alt="학습" />
            </div>
            <div className="category-text">학습</div>
          </div>
        </div>
      </div>

      {/* <Tags /> */}

      <div className="new-lecture">
        <div className="new">NEW</div>
        <div className="new-lecture-text">신규 런칭 강의</div>
        <div className="new-lecture-box">
          <div className="last-week-best">최근 일주일 동안 많이 찾은 강의</div>
          <div className="lecture-num">1/5</div>
        </div>
        <div className="card-deck">
          <DummyCard />
          <DummyCard />
          <DummyCard />
          <DummyCard />
        </div>

        {/* <Carousel
          nextIcon={<img src="/images/chevronRight.png" alt="다음 버튼" />}
          prevIcon={<img src="/images/chevronLeft.png" alt="이전 버튼" />}
        > */}
        {/* {slides.map((slide, index) => (
          <Carousel.Item key={index} className="carousel-item">
            <Row>
              {slide.map((card) => (
                <Col key={card.id} md={3} className="col">
                  <Card className="carousel-card">
                    <Card.Img
                      className="card-img"
                      variant="top"
                      src={card.image}
                      alt={card.title}
                    />
                    <Card.Body className="card-body">
                      <Card.Title>{card.title}</Card.Title>
                      <Card.Text>{card.content}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))} */}
        {/* </Carousel> */}
      </div>

      <div className="apply-tutor">
        <div className="apply-tutor-text">
          선생님이 되면
          <br /> <b>다양한 혜택</b>들이 기다리고 있어요
        </div>
        <div className="apply">선생님 신청하기</div>
      </div>

      <div className="hot-lecture">
        <div className="hot">Hot</div>
        <div className="hot-lecture-text">인기 급상승 강의</div>
        <div className="hot-lecture-box">
          <div className="last-week-best">최근 일주일 동안 많이 찾은 강의</div>
          <div className="lecture-num">1/5</div>
        </div>
        <div className="card-deck">
          <DummyCard />
          <DummyCard />
          <DummyCard />
          <DummyCard />
        </div>
      </div>

      <div className="mentoring-board">
        <div className="hot">Hot</div>
        <div className="mentoring-text">멘토링 게시판</div>
        <div className="last-week-best">최근 일주일 동안 많이 찾은 강의</div>
        <div className="card-deck">
          <DummyCard />
          <DummyCard />
          <DummyCard />
          <DummyCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
