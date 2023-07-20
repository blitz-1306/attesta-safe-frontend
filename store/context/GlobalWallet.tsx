import { FC, ReactNode, createContext, useReducer, useContext, Dispatch } from "react";
import { Attestator } from "../../contracts/types";

type State = {
  attestator: Attestator | null;
}

type Action = { type: 'CONNECT_WALLET', payload: any }

const initialState: State = {
  attestator: null,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CONNECT_WALLET':
      return { ...state, attestator: action.payload.attestator };
    default: return state;
  }
}

const GlobalWalletContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(
  undefined
);

interface GlobalWalletProviderProps {
  children: ReactNode;
}

export const GlobalWalletProvider: FC<GlobalWalletProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalWalletContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalWalletContext.Provider>
  );
};

export const useGlobalWalletState = (): { state: State; dispatch: Dispatch<Action> } => {
  const context = useContext(GlobalWalletContext);

  if (!context) {
    throw new Error('useGlobalWalletState must be used within a GlobalStateProvider');
  }

  return context;
};
