import RandomFox from '@/components/RandomFox/RandomFox'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='my-10 flex flex-col gap-5 items-center'>
      <RandomFox/>
    </main>
  )
}
