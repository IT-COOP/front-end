import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom'

import { userProfileSet, socialLogin } from '../../state/redux/module/userSlice'
import { Close } from '../../assets/icons'

function Join() {
  const [userInfo, setUserInfo] = useState({})
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('accessToken')
  const aToken = `Bearer ${token}`
  const data = {
    data : {
      nickname : "13자ㅇㅋ",
      profileImgUrl : "https://blogfiles.pstatic.net/MjAyMDExMTNfMTIw/MDAxNjA1MjUyMTA4OTcw.IMOWxxkHEJmFI1vTBn0o58gMV7nphPOgAn8xruBzvxMg.JWNW8vJ-Ox5EatR_QMWg1p1RwD0_x44GsSnUIAcL0Nsg.PNG.undernation/asdasd.png?type=w3",
      technologyStack:'react',
      selfIntroduction: '개빡세네 ㅎㅎ',
      portfolioUrl:'https://naver.com'
    },
    token:aToken
  }

  const userInfoValue = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    userInfo[inputName] = inputValue
    const userValue = {...userInfo}
    userValue[inputName] = inputValue
    setUserInfo(userValue)
  }

  const handleJoinSubmit = (e)=> {
    e.preventDefault();
    dispatch(userProfileSet(data))
  }

  const formLi = `flex flex-col w-[800px] h-[500px] rounded-[16px] bg-[#F9F9F9] sm:w-[340px] sm:h-[392px] sm:mb-[30px] sm:px-[20px]`
  const formTitle = `text-center font-bold text-[30px] mt-[74px] mb-[36px] sm:mt-[60px]  sm:text-[20px] sm:mb-[36px] `
  const formDesc = ` text-center text-[20px] mb-[40px] sm:mb-[60px] sm:text-[14px]`
  const inputBoxCss =`mx-auto mb-[50px] sm:mb-[45px]`
  const inputCss = `border-2 text-[24px] p-[20px] mr-[10px] rounded-[5px] w-[357px] h-[72px] sm:px-[20px] sm:py-[14px] sm:w-[232px] sm:h-[42px] sm:mr-[8px] `
  const checkBtn = `w-[117px] h-[72px] text-[24px] sm:w-[60px] sm:h-[42px] text-[14px] text-[#797979] bg-[#CCCCCC] rounded-[5px]`
  const nextBtn = `mx-auto font-bold text-24px rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px] sm:w-[300px] sm:h-[45px]`
  return (
    <section
      className='fixed w-screen h-screen z-50 flex items-center justify-center ]'
    >
      {/* <h1 onClick={handleJoin}>이건 실험용이야허허허</h1> */}
        <ul className='relactive'>
          <Close className='absolute top-[14px] right-[14px]'/>
          <li className={`${formLi}`}>
            <h1 className={formTitle}>사용하실 닉네임을 설정해주세요.</h1>
            <p className={`${formDesc}`}>
              서비스를 이용할 때 사용되는 이름이에요!
            </p>
            <div className={`${inputBoxCss}`}>
              <input
                type='text'
                className={`${inputCss}`}
                placeholder='12자 이내로 입력해주세요'
                maxLength={12}
                name='nickname'
                onChange={userInfoValue}
                />
              <button
                className={`${checkBtn}`}
              >
                중복확인
              </button>
            </div>
            <button className={`${nextBtn}`}>
              다음으로
            </button>
          </li>
        </ul>
    </section>
  );
};

export default Join;