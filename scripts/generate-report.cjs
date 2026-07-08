const fs = require('fs')
const path = require('path')
const {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} = require('docx')

const root = path.resolve(__dirname, '..')
const outPath = path.join(root, '202339070157沈凡栋前端框架技术期末项目报告.docx')

function text(content, options = {}) {
  return new TextRun({
    text: content,
    font: 'Microsoft YaHei',
    size: options.size ?? 24,
    bold: options.bold ?? false,
    color: options.color ?? '1F2933',
  })
}

function para(content, options = {}) {
  return new Paragraph({
    alignment: options.alignment,
    spacing: { before: options.before ?? 80, after: options.after ?? 80, line: 360 },
    children: Array.isArray(content) ? content : [text(content)],
  })
}

function heading(content, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    heading: level,
    spacing: { before: 260, after: 140 },
    children: [text(content, { bold: true, size: level === HeadingLevel.HEADING_1 ? 32 : 28 })],
  })
}

function numbered(items) {
  return items.map((item, index) => para(`${index + 1}. ${item}`, { before: 40, after: 40 }))
}

function table(rows) {
  const border = { style: BorderStyle.SINGLE, size: 1, color: 'D8E1DA' }
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2600, 6760],
    rows: rows.map(
      (row) =>
        new TableRow({
          children: row.map(
            (cell, index) =>
              new TableCell({
                borders: { top: border, bottom: border, left: border, right: border },
                width: { size: index === 0 ? 2600 : 6760, type: WidthType.DXA },
                margins: { top: 120, bottom: 120, left: 140, right: 140 },
                children: [para(cell, { before: 0, after: 0 })],
              }),
          ),
        }),
    ),
  })
}

function imageParagraph(file, caption) {
  const imagePath = path.join(root, 'docs', 'report-assets', file)
  const children = []

  if (fs.existsSync(imagePath)) {
    children.push(
      new Paragraph({
        spacing: { before: 140, after: 80 },
        children: [
          new ImageRun({
            type: 'png',
            data: fs.readFileSync(imagePath),
            transformation: { width: 560, height: 369 },
            altText: { title: caption, description: caption, name: file },
          }),
        ],
      }),
    )
  }

  children.push(para(caption, { alignment: AlignmentType.CENTER, before: 0, after: 140 }))
  return children
}

const children = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 360, after: 220 },
    children: [text('校园二手交易平台项目报告', { bold: true, size: 40, color: '1F5D3B' })],
  }),
  para('课程名称：前端框架技术', { alignment: AlignmentType.CENTER }),
  para('学生信息：202339070157 沈凡栋', { alignment: AlignmentType.CENTER }),
  para('项目类型：Vue3 前端课程设计项目', { alignment: AlignmentType.CENTER }),
  heading('一、项目背景'),
  para(
    '校园中常见闲置教材、电子产品、生活用品、运动用品等二手物品。学生之间存在二手交易需求，但如果只依赖聊天群或线下询问，信息容易分散，查找效率较低。',
  ),
  para(
    '本项目围绕校园二手交易场景，设计并实现一个简单但完整的前端平台，用于展示二手商品、搜索筛选商品、查看商品详情、收藏商品、发布闲置商品和查看个人中心。',
  ),
  heading('二、需求分析'),
  ...numbered([
    '用户注册和登录。',
    '首页展示和导航。',
    '商品列表浏览。',
    '商品关键词搜索和分类筛选。',
    '商品详情查看。',
    '商品收藏和取消收藏。',
    '发布二手商品。',
    '个人中心展示收藏和发布记录。',
    '退出登录。',
  ]),
  para('项目不实现真实后端接口、数据库、在线支付、即时聊天、真实图片上传和管理员后台。所有数据采用本地模拟数据和 localStorage 保存。'),
  heading('三、技术选型'),
  table([
    ['技术', '用途'],
    ['Vue3', '页面和组件开发'],
    ['Vite', '项目构建和开发服务器'],
    ['Vue Router', '页面路由切换'],
    ['Pinia', '全局状态管理'],
    ['localStorage', '本地数据持久化'],
    ['CSS3', '页面布局和样式'],
    ['JavaScript', '业务逻辑和交互实现'],
  ]),
  heading('四、系统架构设计'),
  para('本项目采用单页应用架构。浏览器加载 Vue 应用后，页面切换由 Vue Router 完成，用户状态和商品状态由 Pinia 管理，关键数据同步保存到 localStorage。'),
  ...numbered([
    'main.js 创建 Vue 应用，并挂载 Pinia 和 Vue Router。',
    'App.vue 负责公共页面结构，包含头部、主体和底部。',
    'router/index.js 负责配置页面路由和登录权限控制。',
    'stores/userStore.js 负责用户注册、登录、退出和收藏状态。',
    'stores/productStore.js 负责商品列表、商品查询和商品发布。',
    'components 目录存放复用组件，views 目录存放页面级组件。',
  ]),
  heading('五、页面与功能设计'),
  table([
    ['页面', '功能'],
    ['首页 /', '展示平台介绍、分类入口和推荐商品'],
    ['登录页 /login', '用户登录'],
    ['注册页 /register', '用户注册'],
    ['商品列表页 /products', '商品浏览、搜索和筛选'],
    ['商品详情页 /products/:id', '商品详情展示和收藏'],
    ['发布商品页 /publish', '登录用户发布商品'],
    ['个人中心页 /profile', '查看收藏商品和已发布商品'],
  ]),
  heading('六、组件设计'),
  table([
    ['组件', '作用'],
    ['AppHeader', '公共头部和导航'],
    ['AppFooter', '公共底部'],
    ['ProductCard', '商品卡片展示'],
    ['ProductFilter', '搜索和分类筛选'],
    ['EmptyState', '空状态提示'],
  ]),
  heading('七、状态管理设计'),
  para('项目使用 Pinia 管理全局状态。userStore 管理注册用户、当前登录用户、收藏商品 id、注册、登录、退出登录和收藏操作。productStore 管理商品列表、初始商品数据、发布商品、商品查询和商品搜索。'),
  para('localStorage 使用 campus_market_users、campus_market_current_user、campus_market_products 三个 key 保存数据。'),
  heading('八、运行截图说明'),
  ...imageParagraph('01-home.png', '图 1：首页，展示平台入口、分类和推荐商品。'),
  ...imageParagraph('02-products.png', '图 2：商品列表页，展示搜索和分类筛选。'),
  ...imageParagraph('03-detail.png', '图 3：商品详情页，展示商品信息和收藏按钮。'),
  ...imageParagraph('04-profile.png', '图 4：个人中心页，展示用户信息、收藏和发布区域。'),
  heading('九、测试与验证'),
  para('项目主要通过构建验证和浏览器冒烟测试进行检查。构建命令为 npm run build，验证结果为构建成功。'),
  para('浏览器冒烟测试覆盖流程：注册 -> 登录 -> 商品搜索 -> 商品详情 -> 收藏商品 -> 发布商品 -> 个人中心 -> 退出登录。最终结果为 ok: true，页面标题为“校园二手交易平台”，控制台错误为空。'),
  heading('十、项目总结'),
  para('本项目完成了一个基于 Vue3 的校园二手交易平台前端系统。项目覆盖了课程要求中的 Vue3 基础语法、组件化开发、Vue Router 页面切换、Pinia 状态管理和页面交互。'),
  para('项目实现了登录注册、商品浏览、搜索筛选、商品详情、收藏商品、发布商品、个人中心等完整流程。虽然没有接入真实后端和数据库，但通过 localStorage 模拟了数据保存，保证刷新页面后主要数据仍然可用。'),
  heading('十一、不足与改进方向'),
  ...numbered([
    '当前数据保存在浏览器 localStorage 中，不适合多人同时使用。',
    '商品图片使用占位展示，没有真实上传功能。',
    '没有实现买卖双方即时沟通。',
    '没有实现管理员审核和商品下架功能。',
    '后续可以扩展真实后端接口、数据库、图片上传、聊天功能和后台管理功能。',
  ]),
]

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: 'Microsoft YaHei', size: 24 },
      },
    },
    paragraphStyles: [
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 32, bold: true, font: 'Microsoft YaHei', color: '1F2933' },
        paragraph: { spacing: { before: 260, after: 140 }, outlineLevel: 0 },
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1200, right: 1200, bottom: 1200, left: 1200 },
        },
      },
      children,
    },
  ],
})

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outPath, buffer)
  console.log(outPath)
})
