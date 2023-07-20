import {FC} from "react";
import "react-tabs/style/react-tabs.css";
import * as dotenv from "dotenv";
import Attestation from "../components/Attestation/index";

dotenv.config();

const App: FC = () => {
    return (
        <div className="attestor-container">
            <Attestation />
        </div>
    );
};

export default App;
