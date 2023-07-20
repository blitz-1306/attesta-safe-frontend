import { FC } from "react";
import { Attestator } from "../contracts/types";
import { useGlobalWalletState } from "../store/context/GlobalWallet";
import CreateAttestation from "../components/Attesting/typed";

const Attesting: FC = () => {
  const { state } = useGlobalWalletState();

  return (
    <>
      <div className={`attestor-container`}>
      {state.attestator && <CreateAttestation attestator={state.attestator as Attestator} />}
      </div>
    </>
  );
};

export default Attesting;
