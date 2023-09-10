import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

interface CmdPalleteContextState {
  isOpen: boolean;
  focusedIndex: number;
  open: () => void;
  close: () => void;
  setFocusedIndex: (index: number) => void;
  filterCommands: (query: string) => void;
}

export const CmdPalleteContext = createContext<CmdPalleteContextState>({
  isOpen: false,
  focusedIndex: 0,
  open: () => {},
  close: () => {},
  setFocusedIndex: () => {},
  filterCommands: () => {},
});

interface Props {
  children: ReactNode;
}

export const CmdPalleteContextProvider = ({ children }: Props) => {
  const [open, setOpened] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onOpen = () => {
    setOpened(true);
    setFocusedIndex(0);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClose = () => {
    setOpened(false);
  };

  const contextState: CmdPalleteContextState = useMemo(() => {
    return {
      isOpen: open,
      focusedIndex,
      open: onOpen,
      close: onClose,
      setFocusedIndex,
      filterCommands: () => {},
    };
  }, [open, focusedIndex, onOpen, onClose, setFocusedIndex]);

  return (
    <CmdPalleteContext.Provider value={contextState}>
      {children}
    </CmdPalleteContext.Provider>
  );
};

export const useCmdPalleteContext = () => {
  const context = useContext(CmdPalleteContext);
  if (!context) {
    throw new Error(
      'useCmdPalleteContext must be used within a cmdPalleteProvider',
    );
  }

  return context;
};
