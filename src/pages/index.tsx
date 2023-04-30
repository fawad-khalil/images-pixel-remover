import { Inter } from 'next/font/google'
import { LinkButton } from '@/components/Buttons/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Fawad Khalil's TryItOn Test Task Site&nbsp;
          {/* <code className="font-mono font-bold">src/pages/index.tsx</code> */}
        </p>
      </div>

      <div className='pt-10'>
          <LinkButton href={"/photos"}>Enter Site</LinkButton>
      </div>
    </main>
  )
}
