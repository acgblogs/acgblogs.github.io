const sidebar = require('./sidebar')
module.exports = {
    title: '趣博客',
    description: "努力才能造就更好的自己",
    head: [
        ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/logo.png' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    theme: 'reco',
    themeConfig: {
        sidebar,
        sidebarDepth: 2,
        subSidebar: 'auto',
        logo: '/avatar.png',
        lastUpdated: '最近更新',
        author: 'geass', // 作者
        // 搜索设置
        search: true,
        searchMaxSuggestions: 10,
        nav: [
            { text: '首页', link: '/' },
            { text: '博客', link: '/blogs/basic/customFunction.html' },
            { text: '算法', link: '/algorithm' },
            { text: '开源社区', icon: 'reco-github', link: 'https://github.com/acgblogs' },
        ],
        // 博客设置,当设置type为blog时生效，但不设置socialLinks会报错，先不管
        blogConfig: {
            socialLinks: []
        },
    },
}