import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [loginDTO, setLoginDTO] = useState({ username: "", password: "" });
  const { username, password } = loginDTO;

  const onChangeLogin = (e) => {
    setLoginDTO({ ...loginDTO, [e.target.name]: e.target.value });
  };

  const postLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/login", loginDTO);
      console.log(response);
      
      // 서버로부터 받은 세션 식별자를 쿠키에 저장
      // document.cookie = `session_id=${response.data.sessionId};`;

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
          <input type='text' name='username' placeholder='아이디' value={username} onChange={onChangeLogin} />
        </div>
        <div>
          <input type='password' id='password' name='password' placeholder='비밀번호' value={password} onChange={onChangeLogin} />
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