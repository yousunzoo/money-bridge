'use client'

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import ModalOverlay from './ModalOverlay';

interface OneButtonModalProps {
  children: ReactNode;
  isOpen:boolean;
  setIsOpen:Dispatch<SetStateAction<boolean>>
}
function OneButtonModal({children, isOpen, setIsOpen}:OneButtonModalProps) {

  useEffect(()=>{
    document.body.style.overflow = isOpen ? 'hidden' : 'initial'
  },[isOpen])

  const handleClose = () => {
    setIsOpen(false)
  }
  if(!isOpen) return
  return (
    <div className='fixed top-0 left-0 w-full h-full'>
      <ModalOverlay />
      <div className='fixed w-80 h-60 p-4 bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <button onClick={handleClose} className='absolute right-4'>닫기</button>
        <p>{children}</p>
      </div>
    </div>
  )
}

export default OneButtonModal