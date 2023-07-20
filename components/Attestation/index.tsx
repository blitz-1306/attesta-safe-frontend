import { FC } from "react";
import { Attestator } from "../../contracts/types";
import { useGlobalWalletState } from "../../store/context/GlobalWallet";
import Search from "../Search";
import styles from "./index.module.scss";

const Attestation: FC = () => {
    const { state } = useGlobalWalletState();

    return (
        <div className={styles.attestation}>
            <div>
            {state.attestator && (
                <div>
                    <Search attestator={state.attestator as Attestator}/>
                </div>
            )}
            </div>
        </div>
    )
};

export default Attestation;
