import React, { useState } from 'react';
import { type } from './../../types/buttonTypes';

const login = () => {
  const [loginData, setLoginData] = useState({
    id: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(loginData, null, 2));
  };

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          value={loginData.id}
          placeholder="아이디"
          onChange={handleChange}
          required
        ></input>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
        ></input>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default login;
