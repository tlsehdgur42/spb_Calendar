import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// 쿠키를 가져오는 함수
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// 쿠키를 설정하는 함수
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

// 쿠키를 삭제하는 함수
const removeCookie = (name) => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};

export const AuthProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(getCookie('sessionId'));

  const login = async (loginDTO) => {
    try {
      const response = await axios.post("http://localhost:8080/user/login", loginDTO);
      const sessionId = response.headers['sessionId']; // 세션 ID 추출
      setCookie('sessionId', sessionId, 1); // 세션 ID를 쿠키로 저장
      setSessionId(sessionId);
    } catch (error) {
      console.error("Login failed:", error);
      // 로그인 실패 처리
    }
  };

  const logout = () => {
    removeCookie('sessionId'); // 세션 ID 쿠키 삭제
    setSessionId(null);
  };

  return (
    <AuthContext.Provider value={{ sessionId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};