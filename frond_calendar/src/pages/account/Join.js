import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const navigate = useNavigate();

  const [joinDTO, setJoinDTO] = useState({ username: "", password: "", cpassword: "", name: "", email: "" });
  const { username, password, cpassword, name, email } = joinDTO;

//   const [errorUN, setErrorUN] = useState("");
//   const [errorPW1, setErrorPW1] = useState("");
//   const [errorPW2, setErrorPW2] = useState("");
//   const [errorNN, setErrorNN] = useState("");
//   const [errorEM, setErrorEM] = useState("");
//   const [errorPH, setErrorPH] = useState("");

  const onChangeJoin = (e) => { setJoinDTO({ ...joinDTO, [e.target.name]: e.target.value }); };

  useEffect(() => { 
    // isValid();
 }, [joinDTO])
  
//   function isValid() {
//     console.log(joinDTO);
//     const isValidUN = (un) => { const regex = /^[a-z]+[a-z0-9]{5,12}$/g; return regex.test(un); };
//     const isValidPW = (pw) => { const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; return regex.test(pw); };
//     const isValidNN = (nn) => { const regex = /^[a-z]+[a-z0-9]{5,}$/g; return regex.test(nn); };
//     const isValidEM = (em) => { const regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g; return regex.test(em); };
//     const isValidPH = (phone) => { const regex = /^[0-9]{1,5}$/g; return regex.test(phone); };

//     if (username === "" || isValidUN(username)) { setErrorUN(""); }
//     else { setErrorUN("영소문자, 숫자 포함 6-13자"); }

//     if (password === "" || isValidPW(password)) { setErrorPW1(""); }
//     else { setErrorPW1("대/소문자, 숫자 포함 8-20자"); }

//     if (password === cpassword) { setErrorPW2(""); }
//     else { setErrorPW2("패스워드를 확인해주세요."); }

//     if (name === "" || isValidNN(name)) { setErrorNN(""); }
//     else { setErrorNN("영소문자, 숫자 포함 6-13자"); }

//     if (email === "" || isValidEM(email)) { setErrorEM(""); }
//     else { setErrorEM("올바른 이메일 형식으로 입력해주세요"); }

//     if (!isValidPH(phone1)) { setErrorPH("전화번호 전체를 입력해주세요."); }
//     else if (!isValidPH(phone2)) { setErrorPH("전화번호 전체를 입력해주세요."); }
//     else if (!isValidPH(phone3)) { setErrorPH("전화번호 전체를 입력해주세요."); }
//     else { setErrorPH(""); }
//   }

  const submit = async (e) => {
    e.preventDefault();
    console.log(joinDTO);
    // if (errorUN !== '') { document.querySelector("input[id='username']").focus(); }
    // else if (errorPW1 !== '') { document.querySelector("input[id='password']").focus(); }
    // else if (errorPW2 !== '') { document.querySelector("input[id='cpassword']").focus(); }
    // else if (errorNN !== '') { document.querySelector("input[id='name']").focus(); }
    // else if (errorEM !== '') { document.querySelector("input[id='email']").focus(); }
    // else if (errorPH !== '') { document.querySelector("input[id='phone1']").focus(); }
    // else {
      await axios.post("http://localhost:8080/user/signup", joinDTO)
        .then((response) => { navigate(`/`); }).catch(errors => { console.log(errors) });
    // }
  }



  return (
    <div className='inner_login inner_join'>
      <h1>회원가입</h1>
      <form action='join2' onSubmit={submit}>

        <div>
          <input type='text' id='username' name='username' value={username} placeholder='아이디'
            onChange={e => {
              onChangeJoin(e);
              // handleUN();
            }} />
          {/* {errorUN ? (<p className="error-message">{errorUN}</p>) : (<p className="error-message"> </p>)} */}
        </div>

        <div>
          <input type='password' id='password' name='password' value={password} placeholder='비밀번호'
            onChange={e => {
              onChangeJoin(e);
              // handlePW1();
            }} />
          {/* {errorPW1 ? (<p className="error-message">{errorPW1}</p>) : (<p className="error-message"> </p>)} */}
        </div>

        <div>
          <input type='password' id='cpassword' name='cpassword' value={cpassword} placeholder='비밀번호 확인'
            onChange={e => {
              onChangeJoin(e);
              // handlePW2();
            }} />
          {/* {errorPW2 ? (<p className="error-message">{errorPW2}</p>) : (<p className="error-message"> </p>)} */}
        </div>
        
        <div>
          <input type='text' id='name' name='name' value={name} placeholder='닉네임'
            onChange={e => { onChangeJoin(e); }} />
          {/* {errorNN ? (<p className="error-message">{errorNN}</p>) : (<p className="error-message"> </p>)} */}
        </div>

        <div>
          <input type='text' id='email' name='email' value={email} placeholder='이메일'
            onChange={e => { onChangeJoin(e); }} />
          {/* {errorEM ? (<p className="error-message">{errorEM}</p>) : (<p className="error-message"> </p>)} */}
        </div>

        {/* <div className="phone">
          <input type='text' id='phone1' name='phone1' value={phone1} default='010' placeholder='010'
            onChange={e => { onChangeJoin(e); }} />-
          <input type='text' id='phone2' name='phone2' value={phone2} placeholder='0000'
            onChange={e => { onChangeJoin(e); }} />-
          <input type='text' id='phone3' name='phone3' value={phone3} placeholder='0000'
            onChange={e => { onChangeJoin(e); }} />
          {errorPH ? (<p className="error-message">{errorPH}</p>) : (<p className="error-message"> </p>)}
        </div> */}

        <div>
          <button type="submit">회원가입</button>
        </div>
        <div>
          <p> </p>
          <p> </p>
        </div>
      </form>
    </div>
  )
}

export default Join;