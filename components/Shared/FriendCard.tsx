"use client"

  import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { BsThreeDots } from 'react-icons/bs';


const FriendCard = ({ image, name, id }: { image: string, name: string, id: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/t/chat?token=${id}`)
  }
  return (
    <div className='w-full p-2 flex justify-between items-center bg-background rounded-xl' onClick={handleClick}>
    <div className='flex items-center'>
      <Image src={image as string} alt='friend' className='rounded-full' width={50} height={50} />
      <div className='ml-2 flex flex-col'>
        <p className='text-sm text-primary'>{name}</p>
        <p className='text-xs text-primary'>{id}</p>
      </div>
    </div>
    <BsThreeDots size={20} className="text-gray-500"  />
  </div>
  )
}

export default FriendCard