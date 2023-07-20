import { Alert, Button, Snackbar } from "@mui/material";
import { ethers } from "ethers";
import React, { FC, useState } from "react";
import { Attestator__factory } from "../../contracts/types";
import { config } from "../../lib/constants";
import { useGlobalWalletState } from "../../store/context/GlobalWallet";
import styles from "../Attestation/index.module.scss";

const ConnectWalletButton: FC = () => {
  const { dispatch } = useGlobalWalletState();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const displayErrorMessage = (message: string) => {
    setErrorMessage(message);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleConnectWallet = async () => {
    try {
      if (!window.ethereum) {
        const msg = "Провайдер Metamask не найден";

        displayErrorMessage(msg);

        throw new Error(msg);
      }

      await switchChainToSiberium();

      const provider = new ethers.providers.Web3Provider(
        window.ethereum
      );

      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      dispatch({
        type: "CONNECT_WALLET",
        payload: {
          attestator: Attestator__factory.connect(config.ATTESTATOR_CONTRACT_ADDRESS, signer)
        }
      });
    } catch (error) {
      const msg = `Ошибка при подключении кошелька: ${(error as Error).message}`;
      displayErrorMessage(msg);
      console.error(msg);
    }
  };

  const switchChainToSiberium = async () => {
    if (!window.ethereum?.request) {
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: config.CHAIN_ID,
          rpcUrls: ["https://rpc.test.siberium.net"],
          chainName: "Siberium Testnet",
          nativeCurrency: {
            name: "SIBR",
            symbol: "SIBR",
            decimals: 18
          },
          blockExplorerUrls: ["https://explorer.test.siberium.net/"],
        }]
      });
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: config.CHAIN_ID }]
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        const msg = "Сеть не настроена в кошельке";
        displayErrorMessage(msg);
        console.error(msg, switchError);
      } else {
        const msg = "Ошибка выбора сети";
        displayErrorMessage(msg);
        console.error(msg, switchError);
      }
    }
  };

  return (
    <div className={styles.attestation}>
      <div className="attestor-container attesta-safe-container">
        <Button
          sx={{ margin: '0 auto', display: 'block', padding: '20px 60px' }}
          variant="contained"
          onClick={handleConnectWallet}>
          Подключить кошелек
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ConnectWalletButton;
