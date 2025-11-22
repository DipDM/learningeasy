import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',

  title: 'LearningPortal',
  description: 'My first VuePress Site',
  head: [
  ],
  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    // Main Navigation
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'get', link: '/get-started' },
      { text: 'SQL', link: '/content/SQL/' }
    ],
    
    sidebar: {
      
      '/content/SQL/': [
        {
          text: 'SQL — Basics',
          collapsible: false,
          children: [
            
            '/content/SQL/',
            '/content/SQL/01-chapter/',
            '/content/SQL/02-chapter/',
            '/content/SQL/03-chapter/',
            '/content/SQL/04-chapter/',
            '/content/SQL/05-chapter/',
            '/content/SQL/06-chapter/',
            '/content/SQL/07-chapter/',
            '/content/SQL/08-chapter/',
            '/content/SQL/09-chapter/',
            '/content/SQL/10-chapter/',
          ]
        },
        {
          text: 'SQL — Advanced',
          collapsible: true,
          children: [
            '/SQL/05-indexing/indexes',
            '/SQL/06-performance/query-plan',
            '/SQL/07-security/permissions-and-sql-injection',
            '/SQL/08-exercises/practice-queries'
          ]
        },
        {
          text: 'Examples & Cheatsheets',
          collapsible: true,
          children: [
            '/SQL/99-cheatsheet/sql-cheatsheet',
            '/SQL/99-cheatsheet/common-patterns'
          ]
        }
      ],
     
      '/content/csharp/': [
        '',
        '/content/csharp/01-basics/variables',
        '/content/csharp/02-oop/classes'
      ]
    },
    // how many header levels the sidebar extracts for auto TOC
    sidebarDepth: 2,
  }),
  markdown: {
  code: {
    lineNumbers: false
  }
},

  bundler: viteBundler(),
})
