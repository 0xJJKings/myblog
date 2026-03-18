export default {
  site: {
    title: "0xJJKings Blog",
    subtitle: "CTF Player | Reverse Engineer",
    description: "CTF writeups, reverse engineering notes, and security research by 0xJJKings — member of Team Nova",
    keywords: "0xJJKings, CTF, reverse engineering, malware analysis, binary exploitation, cybersecurity, Team Nova, writeups",
    author: "0xJJKings",
    language: "en",
  },

  sidebar: {
    avatar: "/images/avatar.webp",
    position: "right", // left or right
  },

  widgets: ["recent_posts", "category", "tag", "tagcloud"],

  menu: [
    { name: "home", url: "/" },
    { name: "archives", url: "/archives" },
    { name: "about", url: "/about" },
  ],

  banner: "/images/banner.webp", // which means themes/reimu/source/images/banner.webp
  // You can also write it in the form of the following url
  // banner: "https://example.com"

  // If you want to use the srcset attribute, please enable it
  banner_srcset: {
    enable: true,
    srcset: [
      { src: "/images/banner-600w.webp", media: "(max-width: 479px)" },
      { src: "/images/banner-800w.webp", media: "(max-width: 799px)" },
      { src: "/images/banner.webp", media: "(min-width: 800px)" },
    ],
  },

  footer: {
    since: 2025, // 2025 - current year
    powered: true,
    count: false,
    busuanzi: false,
    icp: {
      icpnumber: "",
      beian: "",
      recordcode: "",
    },
    moe_icp: {
      icpnumber: "",
    }
  },

  analytics: {
    baidu_analytics: false,
    google_analytics: false,
    clarity: false,
  },

  social: {
    github: "https://github.com/0xJJKings",
  },

  // https://valine.js.org
  valine: {
    enable: false, // if you want to use valine,please set this value is true
    appId: "", // leancloud application app id
    appKey: "", // leancloud application app key
    pageSize: 10, // comment list page size
    avatar: "mp", // gravatar style https://valine.js.org/#/avatar
    lang: "en", // i18n: zh-cn/en
    placeholder: "Just go go", // valine comment input placeholder(like: Please leave your footprints )
    guest_info: "nick,mail,link", //valine comment header info
    recordIP: true, // whether to record the IP address of the commenters
    highlight: true, // whether to highlight the code blocks
    visitor: false, // whether to display the number of visitors
    serverURLs: "", // leancloud server url
  },

  // https://waline.js.org/
  waline: {
    enable: false,
    serverURL: "",
    lang: "en",
    locale: {}, // https://waline.js.org/guide/features/i18n.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%AF%AD%E8%A8%80
    emoji: [
      "https://unpkg.com/@waline/emojis@1.2.0/weibo",
      "https://unpkg.com/@waline/emojis@1.2.0/alus",
      "https://unpkg.com/@waline/emojis@1.2.0/bilibili",
      "https://unpkg.com/@waline/emojis@1.2.0/qq",
      "https://unpkg.com/@waline/emojis@1.2.0/tieba",
      "https://unpkg.com/@waline/emojis@1.2.0/tw-emoji",
    ],
    meta: ["nick", "mail", "link"],
    requiredMeta: ["nick", "mail"],
    wordLimit: 0,
    pageSize: 10,
    pageview: true,
  },

  // https://github.com/gitalk/gitalk/blob/master/readme-cn.md
  gitalk: {
    enable: false,
    clientID: "",
    clientSecret: "",
    repo: "",
    owner: "",
    admin: [],
  },

  // https://giscus.app/zh-CN
  giscus: {
    enable: false,
    repo: "",
    repoId: "",
    category: "",
    categoryId: "",
    mapping: "pathname",
    strict: 0,
    reactionsEnabled: 1,
    emitMetadata: 0,
    inputPosition: "bottom",
  },

  // https://utteranc.es
  utterances: {
    enable: false,
    repo: "owner/repo", // Change this to "Your GitHub Username/The Repository Name" used for storing blog comments
    issue_term: "title",
    theme: "auto", // auto means to automatically adapt to dark and light themes, you can also use specific themes like github-light, github-dark, preferred-color-scheme, etc.
  },

  // https://twikoo.js.org
  twikoo: {
    enable: false,
    envId: "", // Tencent Cloud envId; Vercel environment URL (https://xxx.vercel.app)
    region: "",
  },

  // https://disqus.com
  disqus: {
    enable: false,
    shortname: "", // your disqus shortname
    count: true,
  },

  friend: [
    {
      name: "Team Nova",
      url: "https://n0va.in",
      desc: "Security research team",
      avatar: "/images/avatar.webp",
    },
  ],

  copyright: {
    enable: true,
    content: {
      author: true,
      link: true,
      title: true,
      date: false,
      updated: false,
      license: true,
      license_type: 'by-nc-sa',
    },
  },

  preloader: {
    enable: true,
    text: "Loading...",
    rotate: true, // whether to rotate the icon
  },

  // see https://github.com/D-Sketon/mouse-firework
  firework: {
    enable: true,
    disable_on_mobile: false,
    options: {
      excludeElements: ["a", "button"],
      particles: [
        {
          shape: "circle",
          move: ["emit"],
          easing: "easeOutExpo",
          colors: [
            "var(--red-1)",
            "var(--red-2)",
            "var(--red-3)",
            "var(--red-4)",
          ],
          number: 20,
          duration: [1200, 1800],
          shapeOptions: {
            radius: [16, 32],
            alpha: [0.3, 0.5],
          },
        },
        {
          shape: "circle",
          move: ["diffuse"],
          easing: "easeOutExpo",
          colors: ["var(--red-0)"],
          number: 1,
          duration: [1200, 1800],
          shapeOptions: {
            radius: 20,
            alpha: [0.2, 0.5],
            lineWidth: 6,
          },
        },
      ],
    },
  },
  // show categories card on home page
  home_categories: {
    enable: false,
    content: [
      {
        categories: ""
      },
    ]
  },
  triangle_badge: {
    enable: false,
    type: "github",
    link: "https://github.com/0xJJKings",
  },
  // whether to display the notification when the article is outdated
  outdate: {
    enable: false,
    daysAgo: 180, // The number of days after which the article is considered outdated
  },

  share: [
    "twitter",
    "facebook",
    "linkedin",
    "reddit",
  ],

  sponsor: {
    enable: false,
    qr: [
      // { name: "支付宝", src: "/sponsor/alipay.jpg" },
      // { name: "微信", src: "/sponsor/wechat.png" },
    ],
  },
};
