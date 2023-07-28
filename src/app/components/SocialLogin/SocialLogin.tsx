import React from 'react';

const SocialLogin = () => {
  return (
    <div>
      <div>
        <a href="http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/login">
          Kakao Login
        </a>
      </div>
      <div>
        <a href="http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/login">
          Google Login
        </a>
      </div>
      <a href="http://localhost:8080/oauth2/authorization/naver?redirect_uri=http://localhost:3000/login">
        Naver Login
      </a>
    </div>
  );
};

export default SocialLogin;
