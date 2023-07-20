import {FC} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    children: string | JSX.Element | JSX.Element[];
}
export const ErrorWrapper: FC<Props> = ({ children }: Props) => {

    return (
        <>
            <ToastContainer />
            {
                children
            }
        </>)
}
