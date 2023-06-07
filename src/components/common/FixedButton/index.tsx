import React from 'react'
import {useRoleStore} from '@/store/roleStore';

function FixedButton() {
  const {getRole} = useRoleStore();
  const status = () => {
    console.log('상담 가능 상태 변경')
  }
  const text = '상담 신청하기';
  


  return (
    <>
      <button onClick={status}>{text}</button>
      <button>상담 신청하기</button>
      <button>프로필 수정하기</button>
      <button>프로필 저장하기</button>
      <button>콘텐츠 작성하기</button>
    </>
  );
}

export default FixedButton