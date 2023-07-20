import { FC, ReactNode, useEffect, useState } from "react";
import { useGlobalWalletState } from "../store/context/GlobalWallet";
import ConnectWalletButton from "../components/ConnectWalletButton/ConnectWalletButton";
import { useRouter } from "next/router";
import Header from "../components/Landing/Header/Header";
import Head from "next/head";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  const { state } = useGlobalWalletState();
  const [currentRoute, setCurrentRoute] = useState('/')
  const router = useRouter()

  useEffect(() => {
    setCurrentRoute(router.pathname)
  }, [router.pathname])
  return (
    <>
      <Head>
        <link href="https://fonts.cdnfonts.com/css/google-sans" rel="stylesheet" />
      </Head>
      <Header />
      {currentRoute === '/' ? children : state.attestator ? children : <ConnectWalletButton />}
    </>
  )
};

export default DefaultLayout;
