'use client'

import React, { useState } from 'react'
import OneButtonModal from './common/OneButtonModal'

function Test() {
  const [isOpen, setIsOpen] = useState(false)
  console.log(isOpen)
  return (
    <>
    <button className='px-2 bg-yellow-400 cursor-pointer' onClick={()=>setIsOpen(true)}>test</button>
  <OneButtonModal isOpen={isOpen} setIsOpen={setIsOpen}>
    확인
  </OneButtonModal>
    </>
  )
}

export default Test