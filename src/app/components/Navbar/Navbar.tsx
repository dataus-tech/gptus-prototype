import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { reset } from 'app/slices/auth';
import { logout } from 'app/slices/auth';
import { useLocation } from 'react-router-dom';
import LoginModal from 'app/components/LoginModal/LoginModal';
import DummyLoginModal from 'app/components/DummyLoginModal/DummyLoginModal';
import 'app/components/Navbar/Navbar.css';
import { AppDispatch } from 'app/store';

interface AuthState {
  auth: {
    isLoggedIn: boolean;
    user: any[] | null;
  };
}

const Navbar = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');

  const location = useLocation();
  const { pathname } = location;
  const isLecturePage = pathname === '/lecture';
  const isSettingPage = pathname === '/settings';
  const isConsultingPage = pathname === '/consulting';
  const isMentorPage = pathname === '/mentor';

  const { isLoggedIn } = useSelector((state: AuthState) => state.auth);

  const [isDummyLoggedIn, setIsDummyLoggedIn] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const logOut = useCallback(() => {
    dispatch(logout({ refreshToken, accessToken }));
  }, [dispatch, refreshToken, accessToken]);

  useEffect(() => {
    if (isLoggedIn && !accessToken) {
      dispatch(reset());
    }
  }, [dispatch, isLoggedIn, accessToken]);

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [prevMouseY, setPrevMouseY] = useState(0);

  const enterLink = () => {
    setIsMouseOver(true);
  };

  const leaveLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const navContainerCenter = document.querySelector('.nav-container-center');
    const currentMouseY = e.clientY;
    if (navContainerCenter && currentMouseY > prevMouseY) {
      const isMouseOverParentDiv = navContainerCenter.contains(
        document.activeElement,
      );
      setIsMouseOver(isMouseOverParentDiv);
    }

    setIsMouseOver(false);
  };

  const enterDiv = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseOver(true);
    checkMouseDirection(e);
  };

  const leaveDiv = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseOver(false);
    checkMouseDirection(e);
  };

  const checkMouseDirection = (e: React.MouseEvent) => {
    const currentMouseY = e.clientY;
    if (currentMouseY > prevMouseY) {
      setIsMouseOver(true);
    } else {
      setIsMouseOver(false);
    }
    setPrevMouseY(currentMouseY);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* <LoginModal isOpen={isModalOpen} close={closeModal} /> */}
      <DummyLoginModal
        isOpen={isModalOpen}
        close={closeModal}
        setIsDummyLoggedIn={setIsDummyLoggedIn}
      />
      <div className="nav-top">
        <div className="nav-top-left">
          <div>
            <Link to={'/'} className="navbar-brand">
              REBOAST
            </Link>
          </div>
          <input type="text" />
          <div className="search-icon">
            <img src="/images/search.png" alt="돋보기" />
          </div>
        </div>
        <div className="nav-top-right">
          {/* {isLoggedIn ? ( */}
          {isDummyLoggedIn ? (
            // <Link to="" className="nav-link" onClick={logOut}>
            <Link
              to=""
              className="nav-link"
              onClick={() => setIsDummyLoggedIn(false)}
            >
              로그아웃
            </Link>
          ) : (
            <>
              <div className="login" onClick={openModal}>
                로그인
              </div>
              <div className="divider">|</div>
              <Link to="/register" className="register">
                회원가입
              </Link>
            </>
          )}

          <div className="tutor" onClick={() => alert('준비중입니다.')}>
            GPTUS 선생님 되는 방법
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand navbar-white">
        <div className="nav-container">
          <div className="nav-container-left">
            {/* <div className="menu">
              <img src="/images/menu.png" alt="메뉴" />
              <span>전체보기</span>
            </div> */}
            <div
              className="nav-container-center"
              onMouseEnter={(e) => enterDiv(e)}
              onMouseLeave={(e) => leaveDiv(e)}
            >
              <Link
                to={'/lecture'}
                onMouseEnter={enterLink}
                onMouseLeave={(e) => leaveLink(e)}
                className={`nav-link lecture-link ${
                  isLecturePage && 'selected'
                }`}
              >
                강의
              </Link>
              <Link
                to={'/consulting'}
                className={`nav-link ${isConsultingPage && 'selected'}`}
              >
                상담
              </Link>
              {/* <Link
                to={'/mentor'}
                className={`nav-link ${isMentorPage && 'selected'}`}
              >
                강사
              </Link> */}
              <Link
                to="#"
                className="nav-link"
                onClick={() => alert('준비중입니다.')}
              >
                커뮤니티
              </Link>

              {isLoggedIn && (
                <Link
                  to={'/settings'}
                  className={`nav-link ${isSettingPage && 'selected'}`}
                >
                  내정보
                </Link>
              )}
            </div>
          </div>
          <div className="nav-container-right">
            <div className="user-guide" onClick={() => alert('준비중입니다.')}>
              <span>
                <img src="/images/guide.png" alt="이용자 가이드" />
                이용자 가이드
              </span>
            </div>
            <div className="schedule" onClick={() => alert('준비중입니다.')}>
              <span>
                <img src="/images/star.png" alt="내강의 일정" />
                내강의 일정
              </span>
            </div>
          </div>
        </div>
      </nav>
      {/* {isMouseOver && (
        <div
          className="sub-lecture-container"
          onMouseLeave={(e) => leaveDiv(e)}
        >
          <div className="lecture">
            <img src="/images/lecture.png" alt="강의" className="lecture-img" />
            <span className="category-title">강의</span>
            <div className="lecture-text">
              온라인 교육 서비스를 <br />
              제공합니다.
            </div>
          </div>
          <div className="foundation">
            <div>
              <span className="category-title">창업</span>
            </div>
            <li className="category-list">코파운더</li>
            <li className="category-list">파운더</li>
          </div>
          <div className="employment">
            <div>
              <span className="category-title">취업</span>
            </div>
            <li className="category-list">프론트엔드</li>
            <li className="category-list">백엔드</li>
            <li className="category-list">데이터 엔지니어</li>
            <li className="category-list">인공지능</li>
          </div>
          <div className="hobby">
            <div>
              <span className="category-title">취미</span>
            </div>
            <li className="category-list">음악</li>
            <li className="category-list">미술</li>
            <li className="category-list">체육</li>
          </div>
          <div className="school-learning">
            <div>
              <span className="category-title">초/중/고 학습</span>
            </div>
            <li className="category-list">국어</li>
            <li className="category-list">영어</li>
            <li className="category-list">수학</li>
            <li className="category-list">과학</li>
            <li className="category-list">제 2 외국어</li>
          </div>
          <div className="university">
            <div>
              <span className="category-title">대학 교육</span>
            </div>
            <li className="category-list">논리적 사고</li>
            <li className="category-list">글쓰기</li>
            <li className="category-list">소통</li>
            <li className="category-list">협업</li>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Navbar;
