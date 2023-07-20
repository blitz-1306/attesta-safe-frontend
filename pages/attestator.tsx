import {FC} from "react";
import "react-tabs/style/react-tabs.css";
import Attestation from "../components/Attestation/index";

const App: FC = () => {
    return (
        <div className="attestor-container">
            <Attestation />
        </div>
    );
};

export default App;
