import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { IconType } from 'react-icons/lib';
import { IoMoon } from 'react-icons/io5';

type BaseItem = {
  title: string;
};

export type PageItem = BaseItem & {
  href: string;
};

export type SocialItem = BaseItem & {
  href: string;
  icon: IconType;
};

export type ThemeItem = BaseItem & {
  id: 'theme';
  icon: IconType;
};

export type ActionItem = BaseItem & {
  href?: string;
  action?: () => void;
};

export type SearchItemType = {
  pages: PageItem[];
  social: SocialItem[];
  themes: ThemeItem[];
  unauthenticated: PageItem[];
  authenticated: ActionItem[];
};

export const searchItems: SearchItemType = {
  pages: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Feed',
      href: '/feed',
    },
    {
      title: 'Projects',
      href: '/projects',
    },
    {
      title: 'Posts',
      href: '/posts',
    },
    {
      title: 'My Projects',
      href: '/projects/me',
    },
    {
      title: 'My Posts',
      href: '/posts/me',
    },
  ],
  social: [],
  themes: [
    {
      id: 'theme',
      title: 'Change theme',
      icon: IoMoon,
    },
  ],
  unauthenticated: [
    {
      title: 'Login',
      href: '/auth/login',
    },
    {
      title: 'Register',
      href: '/auth/register',
    },
  ],
  authenticated: [
    {
      title: 'Logout',
      action: () => {},
    },
    {
      title: 'Profile',
      href: '/users/me',
    },
  ],
};

interface CmdPalleteContextState {
  isOpen: boolean;
  focusedIndex: number;
  open: () => void;
  close: () => void;
  setFocusedIndex: (index: number) => void;
  commands: SearchItemType;
  filterCommands: (query: string) => void;
}

export const CmdPalleteContext = createContext<CmdPalleteContextState>({
  isOpen: false,
  focusedIndex: 0,
  open: () => {},
  close: () => {},
  setFocusedIndex: () => {},
  commands: {
    pages: [],
    social: [],
    themes: [],
    authenticated: [],
    unauthenticated: [],
  },
  filterCommands: () => {},
});

interface Props {
  children: ReactNode;
}

export const CmdPalleteContextProvider = ({ children }: Props) => {
  const [commands, setCommands] = useState(searchItems);
  const [open, setOpened] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const onOpen = () => {
    setOpened(true);
    setCommands(searchItems);
    setFocusedIndex(0);
  };

  const onClose = () => {
    setOpened(false);
  };

  const filterCommands = (query: string) => {
    setCommands({
      pages: searchItems.pages.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase());
      }),
      social: searchItems.social.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase());
      }),
      themes: searchItems.themes.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase());
      }),
      authenticated: searchItems.authenticated.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase());
      }),
      unauthenticated: searchItems.unauthenticated.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase());
      }),
    });
  };

  const contextState: CmdPalleteContextState = useMemo(() => {
    return {
      isOpen: open,
      focusedIndex,
      open: onOpen,
      close: onClose,
      setFocusedIndex,
      commands,
      filterCommands,
    };
  }, [
    open,
    focusedIndex,
    onOpen,
    onClose,
    setFocusedIndex,
    commands,
    filterCommands,
  ]);

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
