
import { Category, Bookmark } from './types';

/**
 * 管理员设置
 * 修改此处的 ADMIN_PASSWORD 即可更改登入密码
 */
export const ADMIN_PASSWORD = 'admin123';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'tech', name: '技术工具', icon: '🔧' },
  { id: 'design', name: '设计灵感', icon: '🎨' },
  { id: 'media', name: '影视娱乐', icon: '🎬' },
  { id: 'daily', name: '日常常用', icon: '⭐' },
  { id: 'ai', name: '人工智能', icon: '🤖' }
];

export const INITIAL_BOOKMARKS: Bookmark[] = [
  { id: '1', categoryId: 'tech', title: 'GitHub', url: 'https://github.com', description: '代码托管平台', icon: 'https://github.com/favicon.ico' },
  { id: '2', categoryId: 'tech', title: 'Vercel', url: 'https://vercel.com', description: '前端部署平台', icon: 'https://vercel.com/favicon.ico' },
  { id: '3', categoryId: 'tech', title: 'Stack Overflow', url: 'https://stackoverflow.com', description: '编程问答社区', icon: 'https://stackoverflow.com/favicon.ico' },
  { id: '4', categoryId: 'daily', title: 'Google', url: 'https://google.com', description: '全球最强大搜索引擎', icon: 'https://google.com/favicon.ico' },
  { id: '5', categoryId: 'daily', title: 'Bilibili', url: 'https://bilibili.com', description: '国内领先视频弹幕网站', icon: 'https://bilibili.com/favicon.ico' },
  { id: '6', categoryId: 'design', title: 'Figma', url: 'https://figma.com', description: '在线UI设计工具', icon: 'https://figma.com/favicon.ico' },
  { id: '7', categoryId: 'design', title: 'Dribbble', url: 'https://dribbble.com', description: '全球顶尖设计师社区', icon: 'https://dribbble.com/favicon.ico' },
  { id: '8', categoryId: 'media', title: 'Netflix', url: 'https://netflix.com', description: '全球流媒体先驱', icon: 'https://netflix.com/favicon.ico' },
  { id: '9', categoryId: 'ai', title: 'ChatGPT', url: 'https://chat.openai.com', description: 'OpenAI 智能聊天机器人', icon: 'https://chat.openai.com/favicon.ico' },
  { id: '10', categoryId: 'ai', title: 'Claude', url: 'https://claude.ai', description: 'Anthropic 高性能AI助手', icon: 'https://claude.ai/favicon.ico' },
  { id: '11', categoryId: 'tech', title: 'React', url: 'https://react.dev', description: '组件化前端框架', icon: 'https://react.dev/favicon.ico' },
  { id: '12', categoryId: 'daily', title: 'Notion', url: 'https://notion.so', description: '全能协作工作空间', icon: 'https://notion.so/favicon.ico' },
];
