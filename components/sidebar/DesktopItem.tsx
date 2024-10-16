"use client"

import Link from 'next/link';

interface Props {
  href: string;
  label: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const DesktopItem = ({ href, label, icon: Icon, active, onClick }: Props) => {
  return (
    <li onClick={onClick}>
      <Link 
      href={href} key={href}
      className={`group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 ${active && 'bg-gray-100 text-black'}`} > 
      <Icon className="h-6 w-6 shrink-0" />
        <span className='sr-only'>{label}</span>
      </Link>
    </li>
  )
}

export default DesktopItem