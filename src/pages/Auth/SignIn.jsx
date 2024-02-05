//회원 가입 페이지
import React, {useEffect, useState} from "react"
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import './Auth.css';

const SignIn = () => {
    let navigate = useNavigate(); // 다른 component 로 이동할 때 사용
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // 비밀번호를 텍스트 형태로 보여줄지 여부 결정
    const [notAllow, setNotAllow] = useState(true);

    const resetInput = () => {
        setEmail('');
        setPw('');
    }

    const handleInputClick = async (e) => {
        console.log('sing-up');
        const request_data = { email: email, password: pw };
        console.log('req_data: ', request_data);
        try{
            let response = await axios({
                method: 'post',
                url: '/api/auth/signup',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(request_data)
            });
            console.log('서버 응답: ', response);
            console.log('response.status: ', response.status);
            if(response.status === 200) {
                alert("회원가입이 완료되었습니다!")
                //navigate("/", {});
            }
            else if(response.status === 400) {
                alert("이미 가입한 이메일입니다.")
                resetInput();
            }
            else {
                alert("회원가입에 실패하였습니다.")
                resetInput();
            }
        } catch (err) {
            resetInput();
        }
    }



    // 이메일 정규표현식 검사
    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    };

    // 비밀번호 정규표현식 검사
    const handlePw = (e) => {
        setPw(e.target.value);
        const regex =
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(e.target.value)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }
    };

    useEffect(() => {
        if(emailValid && pwValid) {
            setNotAllow(false); // 버튼 비활성화 해제
            return;
        }
        setNotAllow(true); // 기본적인 상황: 비활성화
    }, [emailValid, pwValid]); // 이메일, 비밀번호 state 값이 변경될 때마다 useEffect 실행


    // 비밀번호 토글 함수
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={{ backgroundColor: '#FBFBF3', minHeight: '100vh' }}>
            <div className="auth-page">
                <div className="title">로그인</div>

                <div className="inputTitle">이메일</div>
                <div className="inputWrap">
                    <input className="input" type="email" placeholder="test@example.com" value={email} onChange={handleEmail}/>
                </div>
                <div className="errorMessageWrap">
                    {!emailValid && email.length > 0 && (
                        <div>이메일 형식이 올바르지 않습니다.</div>
                    )}
                </div>

                <div className="inputTitle">비밀번호</div>
                <div className="inputWrap">
                    <input className="input" type={showPassword ? "text" : "password"} placeholder="영문, 숫자, 특수문자 포함 8자 이상" value={pw} onChange={handlePw}/>
                </div>
                <div className="errorMessageWrap">
                    {!pwValid && pw.length > 0 && (
                        <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                    )}
                </div>
                <label>
                    <input type='checkbox' className="custom-checkbox" onChange={toggleShowPassword} />
                    <span className="pwCheck">비밀번호 보기</span>
                </label>

                <button disabled={notAllow} className="authButton" onClick={handleInputClick}>로그인</button>
                <div className="signUpText">
                    <Link to={"/sign-up"} style={{ textDecoration: "none"}}>
                        <div style={{color: "dimgrey"}}>회원가입</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn;