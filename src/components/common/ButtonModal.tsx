'use client'

import { ButtonModalProps } from '@/types/common'
import { useEffect } from 'react'



function ButtonModal({modalContents, isOpen, setIsOpen}:ButtonModalProps) {
  const {content, confirmText, cancelText, confirmFn, cancelFn} = modalContents

  useEffect(()=>{
    document.body.style.overflow = isOpen ? 'hidden' : 'initial'
  },[isOpen])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleCancelButton = () => {
    setIsOpen(false)
    if(cancelFn) cancelFn()
  }
  const handleConfirmButton = () => {
    setIsOpen(false)
    if(confirmFn) confirmFn()
  }
  if(!isOpen) return <></>
  return (
    <div className='fixed top-0 left-0 w-full h-full'>
      <div className='w-full h-full bg-black opacity-50'></div>
      <div className='flex flex-col justify-between fixed w-80 h-80 p-7 bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <button onClick={handleClose} className='absolute right-7'>닫기</button>
        <p className='pt-20 break-keep text-lg text-center'>{content}</p>
        <div className='flex w-full gap-4'>
          {cancelText && <button onClick={handleCancelButton} className='w-1/2 h-10 border-2 border-black'>{cancelText}</button>}
          <button onClick={handleConfirmButton} className={`${cancelText ? 'w-1/2' : 'w-full'} h-10 bg-black text-white`}>{confirmText}</button>
        </div>
      </div>
    </div>
  )
}

export default ButtonModal