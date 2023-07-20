import {FC} from "react";
import SchemaMaker from "../components/SchemaMaker/index";
import {useGlobalWalletState} from "../store/context/GlobalWallet";
import {Attestator} from "../contracts/types";

const CreateSchema: FC = () => {
    const { state } = useGlobalWalletState();

    return (
        <div className="attestor-container">
            <SchemaMaker attestator={state.attestator as Attestator}/>
        </div>
    );
};

export default CreateSchema;
