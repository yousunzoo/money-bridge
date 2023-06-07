'use client'

import React, { useState } from 'react'
import ButtonModal from './common/ButtonModal'

function Test() {
  const [isOpen, setIsOpen] = useState(false)

  // 취소 버튼이 있는 경우에만 cancelText, cancelFn 작성
  // confirmFn, cancelText, cancelFn은 선택값!
  const modalContents = {
    content: '인증코드 시간이 만료되었습니다. 인증코드를 재발송 해주세요.',
    confirmText: '인증 코드 재발송',
    cancelText:'취소',
    confirmFn: () => console.log('send'),
  }
  return (
    <>
    <button className='px-2 bg-yellow-400 cursor-pointer' onClick={()=>setIsOpen(true)}>test</button>
    <ButtonModal modalContents={modalContents} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export default Test