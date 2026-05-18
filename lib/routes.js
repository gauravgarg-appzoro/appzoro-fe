// import dynamic from 'next/dynamic'

export const routes = {
  homepage: {
    path: '/',
    // component: dynamic(() => import('./pages/index')),
    exact: true,
    private: true,
    permission: true,
    generateRoute: () => {
      return '/';
    },
  },

  process: {
    path: '/process',
    // component: dynamic(() => import('./pages/process')),
    exact: true,
    private: true,
    permission: true,
    generateRoute: () => {
      return '/process';
    },
  },

  uiUxDesign: {
    path: '/ui-ux-design',
    // component: dynamic(() => import('./pages/ui-ux-design')),
    exact: true,
    private: true,
    permission: true,
    generateRoute: () => {
      return '/ui-ux-design';
    },
  },

  portfolio: {
    path: '/portfolio',
    // component: dynamic(() => import('./pages/portfolio')),
    exact: true,
    private: true,
    permission: true,
    generateRoute: () => {
      return '/portfolio';
    },
  },

  portfolioDetails: {
    path: '/portfolio/[slug]',
    destination: '/[slug]',
    // component: dynamic(() => import('./pages/portfolio/[slug]')),
    exact: true,
    private: true,
    permission: true,
    generateRoute: (id, slug) => {
      return `/portfolio/${slug}?id=${id}`;
    },
  },

  team: {
    path: '/team',
    // component: dynamic(() => import('./pages/team')),
    exact: true,
    private: true,
    permission: true,
    generateRoute: () => {
      return '/team';
    },
  },

  press: {
    path: '/press',
    // component: dynamic(() => import('./pages/press')),
    exact: true,
    private: true,
    permission: true,
    generateRoute: () => {
      return '/press';
    },
  },

  blogList: {
    path: '/blog-list',
    // component: dynamic(() => import('./pages/blog-list')),
    exact: true,
    private: false,
    permission: false,
    generateRoute: () => {
      return '/blog-list';
    },
  },

  contact: {
    path: '/contact',
    // component: dynamic(() => import('./pages/contact')),
    exact: true,
    private: true,
    permission: true,
    generateRoute: () => {
      return '/contact';
    },
  },

  // login: {
  //   path: '/',
  //   component: dynamic(() => import('./pages/Loginpage/Loginpage')),
  //   exact: true,
  //   private: false,
  //   permission: false,
  //   generateRoute: () => {
  //     return '/'
  //   },
  // },

  // signup: {
  //   path: '/signup',
  //   component: dynamic(() => import('./pages/Signuppage/Signuppage')),
  //   exact: true,
  //   private: false,
  //   permission: false,
  // },
  // forgotpasswordrequest: {
  //   path: '/forgotpasswordrequest',
  //   component: dynamic(() =>
  //     import('./pages/Forgotpasswordpage/Forgotpasswordpage')
  //   ),
  //   exact: true,
  //   private: false,
  //   permission: false,
  //   generateRoute: () => {
  //     return '/forgotpasswordrequest'
  //   },
  // },
  // changepassword: {
  //   path: '/changepassword',
  //   component: dynamic(() =>
  //     import('./pages/Createaccountpage/Createaccountpage')
  //   ),
  //   exact: true,
  //   private: true,
  //   permission: false,
  //   generateRoute: () => {
  //     return '/changepassword'
  //   },
  // },

  // forgotpassword: {
  //   path: '/forgotpassword/:token',
  //   component: dynamic(() =>
  //     import('./pages/Createaccountpage/Createaccountpage')
  //   ),
  //   exact: true,
  //   private: false,
  //   permission: false,
  //   generateRoute: () => {
  //     return '/forgotpassword'
  //   },
  // },

  // customers: {
  //   path: '/customers',
  //   component: dynamic(() =>
  //     import('./pages/Customerslistpage/Customerslistpage')
  //   ),
  //   exact: true,
  //   private: true,
  //   permission: true,
  //   generateRoute: () => {
  //     return '/customers'
  //   },
  // },

  // customerdetail: {
  //   path: '/customer/:id',
  //   component: dynamic(() =>
  //     import('./pages/Customerdetailpage/Customerdetailpage')
  //   ),
  //   exact: true,
  //   private: true,
  //   permission: true,
  //   generateRoute: (id) => {
  //     return `/customer/${id}`
  //   },
  // },

  // tempspacelist: {
  //   path: '/template/spacelist',
  //   component: dynamic(() =>
  //     import('./pages/Tempspacelistpage/Tempspacelistpage')
  //   ),
  //   exact: true,
  //   private: true,
  //   permission: true,
  //   generateRoute: (fName, id) => {
  //     return `/template/spacelist?fname=${fName}&fId=${id}`
  //   },
  // },

  // extrapage: {
  //   path: '/extra',
  //   component: dynamic(() => import('./pages/Extrapage/Extrapage')),
  //   exact: true,
  //   private: true,
  //   permission: true,
  //   generateRoute: () => {
  //     return '/extra'
  //   },
  // },
};

export const renderRoutes = Object.entries(routes);
