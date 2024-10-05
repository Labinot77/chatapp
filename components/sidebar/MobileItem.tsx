import Link from 'next/link';
import React from 'react'

interface Props {
  href: string;
  label: string;
  icon: any;
  active?: boolean;
}

const MobileItem = ({ href, label, icon: Icon, active }: Props) => {
  return (
    <Link 
    href={href} key={href}
    className={`group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100 ${active && 'bg-gray-100 text-black'}`} >
      <Icon className="h-6 w-6 shrink-0" />
    </Link>
  )
}

export default MobileItem