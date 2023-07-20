import type { AppProps } from 'next/app'
import '../styles/global.scss'
import { ReactElement } from "react"
import { GlobalWalletProvider } from "../store/context/GlobalWallet";
import DefaultLayout from "../layout/default";
import {ErrorWrapper} from "../components/ErrorWrapper";

export default function MyApp({ Component, pageProps }: AppProps): ReactElement | null {
  return (
    <GlobalWalletProvider>
      <DefaultLayout>
          <ErrorWrapper>
            <Component {...pageProps} />
          </ErrorWrapper>
      </DefaultLayout>
    </GlobalWalletProvider>
  )
}
