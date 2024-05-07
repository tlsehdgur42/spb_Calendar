
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginDTO, setLoginDTO] = useState({ username: "", password: "" });

  const onChangeLogin = (e) => {
    setLoginDTO({ ...loginDTO, [e.target.name]: e.target.value });
  };

  const postLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginDTO); // 로그인 함수 호출
      // 로그인 성공 후 페이지 이동
      navigate(`/calendar`);
    } catch (error) {
      console.error("Login failed:", error);
      // 로그인 실패 처리
    }
  };

  return (
    <div className='inner_login'>
      <h1>로그인</h1>
      <form onSubmit={postLogin} method='post'>
        <div>
          <input type='text' name='username' placeholder='아이디' value={loginDTO.username} onChange={onChangeLogin} />
        </div>
        <div>
          <input type='password' id='password' name='password' placeholder='비밀번호' value={loginDTO.password} onChange={onChangeLogin} />
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
        <div className='bottom'>
          <div className='left'>
            <Link to='/join'>회원가입</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;