import { queryClient } from '../service/queryClient'
import '../styles/global.css'
import type { AppProps } from 'next/app'
import { Inter, Roboto, Roboto_Mono } from 'next/font/google'
import { QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import NextNProgress from 'nextjs-progressbar';

if(process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
    import('../mocks').then(({ setupMocks }) => {
        setupMocks()
    })
}

export const inter = Inter({ 
    weight: ['400', '500', '600'],
    subsets: ['latin'] 
})

export const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const robotoMono = Roboto_Mono({
    weight: '400',
    subsets: ['latin'],
  })
  

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return ( 
        <>
            <NextNProgress 
                color='#018673'
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
            />
            <SessionProvider session={session}>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </SessionProvider>
        </>
   )
}
