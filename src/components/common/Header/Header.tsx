import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='flex items-center w-full px-3 my-2'>
      <Image src="/images/logo.png" alt="logo" width={30} height={30} />
      <button className='flex w-full justify-end'>로그인/회원가입</button>
    </div>
  );
}

export default Header