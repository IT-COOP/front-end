import React from 'react';

const RecruitNav = () => {
  return (
    <nav className={'sticky'}>
      <ul className={'overflow-hidden'}>
        <li className={'flex'}>
          <h1 className={'whitespace-nowrap text-center p-3'}>지역</h1>
          <ul className={'inline-flex overflow-hidden overflow-x-auto'}>
            <li className={'whitespace-nowrap p-3'}>서울/수도권</li>
            <li className={'whitespace-nowrap p-3'}>강원도</li>
            <li className={'whitespace-nowrap p-3'}>충청도</li>
            <li className={'whitespace-nowrap p-3'}>경상도</li>
            <li className={'whitespace-nowrap p-3'}>전라도</li>
          </ul>
        </li>
        <li className={'flex '}>
          <h1 className={'whitespace-nowrap p-3'}>직군</h1>
          <ul className={'inline-flex overflow-hidden overflow-x-auto'}>
            <li className={'whitespace-nowrap p-3'}>프론트엔드</li>
            <li className={'whitespace-nowrap p-3'}>백엔드</li>
            <li className={'whitespace-nowrap p-3'}>디자이너</li>
            <li className={'whitespace-nowrap p-3'}>기획자</li>
          </ul>
        </li>
        <li className={'inline-flex'}>
          <h1 className={'whitespace-nowrap p-3'}>스택</h1>
          <ul className={'inline-flex overflow-hidden overflow-x-auto'}>
            <li className={'whitespace-nowrap p-3'}></li>
            <li className={'whitespace-nowrap p-3'}></li>
            <li className={'whitespace-nowrap p-3'}></li>
            <li className={'whitespace-nowrap p-3'}></li>
            <li className={'whitespace-nowrap p-3'}></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default RecruitNav;