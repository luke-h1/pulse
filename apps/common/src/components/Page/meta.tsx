import { CmdLink } from '@ui/components/CmdPalete';
import { FooterLink } from '@ui/components/Footer';

/**
 * Generic meta to describe what we want to show in the header and footer
 * Used in the CmdPallete and Footer components
 * Made generic to satisfy both the admin and frontend apps
 */

interface Meta {
  actionLinks: CmdLink;
  pageLinks: CmdLink;
  footerLinks: {
    firstGroup: FooterLink[];
    secondGroup: FooterLink[];
    thirdGroup: FooterLink[];
  };
}

export const adminMeta: Meta = {
  actionLinks: {
    authLinks: [
      {
        title: 'Manage users',
        href: '/users',
      },
      {
        title: 'Manage posts',
        href: '/posts',
      },
      {
        title: 'Manage projects',
        href: '/projects',
      },
      {
        title: 'Utilities',
        href: '/utilities',
      },
    ],
    unauthLinks: [
      {
        title: 'Login',
        href: '/auth/login',
      },
      {
        title: 'Register',
        href: '/auth/register',
      },
    ],
  },
  pageLinks: {
    authLinks: [],
    unauthLinks: [],
  },
  footerLinks: {
    firstGroup: [
      {
        href: '/',
        label: 'Home',
      },
    ],
    secondGroup: [],
    thirdGroup: [],
  },
};

export const frontendMeta: Meta = {
  actionLinks: {
    authLinks: [
      {
        title: 'Create Post',
        href: '/posts/create',
      },
      {
        title: 'Create Project',
        href: '/projects/create',
      },
      {
        title: 'My Profile',
        href: '/users/me',
      },
    ],
    unauthLinks: [
      {
        title: 'Login',
        href: '/auth/login',
      },
      {
        title: 'Register',
        href: '/auth/register',
      },
    ],
  },
  pageLinks: {
    authLinks: [
      {
        title: 'Feed',
        href: '/feed',
      },
      {
        title: 'Posts',
        href: '/posts',
      },
      {
        title: 'Projects',
        href: '/projects',
      },
    ],
  },
  footerLinks: {
    firstGroup: [
      {
        href: '/',
        label: 'Home',
      },
      {
        href: '/feed',
        label: 'Feed',
      },
      {
        href: '/projects',
        label: 'Projects',
      },
      {
        href: '/posts',
        label: 'Posts',
      },
    ],
    secondGroup: [
      {
        href: '/posts/me',
        label: 'My Posts',
      },
      {
        href: '/projects/me',
        label: 'My Projects',
      },
    ],
    thirdGroup: [
      // {
      //   href: '/uses',
      //   label: 'Uses',
      // },
      // {
      //   href: '/uses/me',
      //   label: 'My Uses',
      // },
      {
        href: '/users/me',
        label: 'My Profile',
      },
    ],
  },
};
