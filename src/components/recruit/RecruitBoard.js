import React from 'react';
import PropTypes from 'prop-types';



const RecruitBoard = ({ title, nickname, recruitContent, recruitLocation, recruitKeepItCount, imgUrls  } ) => {
  
  return (
    <li className='flex flex-col justify-center p-4 m-auto border-2'>
      <img src={imgUrls[0]}></img>
      <h1>{title}</h1>
      <p>{nickname}</p>
      <p>{recruitContent}</p>
      <p>{recruitLocation}</p>
      <p>{recruitKeepItCount}</p>
    </li>
  );
};

RecruitBoard.propTypes = {
  title : PropTypes.string,
  recruitContent : PropTypes.string,
  recruitLocation : PropTypes.string,
  recruitKeepItCount : PropTypes.number,
  recruitCommentCount : PropTypes.number,
  imgUrls : PropTypes.array
}

export default RecruitBoard;