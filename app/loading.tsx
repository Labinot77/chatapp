
import { CgSpinner } from 'react-icons/cg'

const loading = () => {
  return (
    <main className='h-[90%] w-full flex justify-center items-center'>
      <CgSpinner size={28} className='animate-spin text-primary' />
    </main>
  )
}

export default loading