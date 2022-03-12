import React from 'react';

import RecruitBoard from './RecruitBoard';

const RecruitBoardList = () => {
  const data = [
    {
      title: '제목입니다',
      recruitContent:'내용입니다',
      recruitLocation:'서울/수도권',
      imgUrls : ['https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2','https://www.google.com/imgres?imgurl=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Fblog%2F1676324D4DE12D7415&imgrefurl=https%3A%2F%2Fblog.daum.net%2Fmygirl25%2F10756297&tbnid=GMlmiGUUAVUbAM&vet=10CBMQxiAoAmoXChMIwJ700sS_9gIVAAAAAB0AAAAAEAY..i&docid=uKTC4zvpDLJMHM&w=764&h=573&itg=1&q=%EA%B3%A0%EC%96%91%EC%9D%B4%EC%82%AC%EC%A7%84&ved=0CBMQxiAoAmoXChMIwJ700sS_9gIVAAAAAB0AAAAAEAY','https://www.google.com/imgres?imgurl=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F25580B3C54C7569A34&imgrefurl=https%3A%2F%2Fprofgod.tistory.com%2F18&tbnid=rKI2Q1ihGmXZJM&vet=10CA8QxiAoCGoXChMIwJ700sS_9gIVAAAAAB0AAAAAEAY..i&docid=XmSWOY_6EbFXFM&w=319&h=425&itg=1&q=%EA%B3%A0%EC%96%91%EC%9D%B4%EC%82%AC%EC%A7%84&ved=0CA8QxiAoCGoXChMIwJ700sS_9gIVAAAAAB0AAAAAEAY'],
      userId : '작성자의 id',
      nickname : '더미닉네임',
      recruitKeepItCount: 10,
      recruitCommentCount : 5,
      createDate :'ISOString',
      recruit:""
  }
]
  console.log(data[0].imgUrls)
  return (
    <ul className={'flex'}>
      {data.map(board=>
        <RecruitBoard
          key = { board.userId }
          title = { board.title }
          nickname ={ board.nickname }
          recruitContent ={ board.recruitContent }
          recruitCommentCount={ board.recruitCommentCount }
          recruitKeepItCount = { board.recruitKeepItCount }
          recruitLocation ={ board.recruitLocation }
          imgUrls = { board.imgUrls }
        />)}
        {data.map(board=>console.log(board.imgUrls))}
    </ul>
  );
};


export default RecruitBoardList;