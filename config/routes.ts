export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/article',
                name: '文章',
                icon: 'smile',
                component: './Article',
              },
               {
                path: '/article/edit/:id',
                name: '操作文章',
                component: './Article/Edit',
              },

              {
                path: '/poetry',
                name: '诗词歌赋',
                icon: 'smile',
                component: './Poetry',
              },
               {
                path: '/poetry/edit/:id',
                name: '操作诗词歌赋',
                component: './Poetry/Edit',
              },

              {
                path: '/saying',
                name: '名言',
                icon: 'smile',
                component: './Saying',
              },
               {
                path: '/saying/edit/:id',
                name: '名言',
                component: './Saying/Edit',
              },



              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['user'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['user'],
                  },
                ],
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './TableList',
                authority: ['user'],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
