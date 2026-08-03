# ISNOWSOFT Portfolio Site

> LI XUBIN — 架构师 & 技术主管 | 个人作品集与技术文档站

纯静态前端站点，零构建依赖，双主题自适应，涵盖 12 个项目展示与 21 篇深度技术文档。

---

## 目录结构

```
portfolio-site/
├── index.html              # 主站首页
├── styles.css              # 全局样式（CSS 变量驱动双主题）
├── script.js               # 全局交互（15 个功能模块）
├── assets/
│   ├── css/style.css
│   └── images/
├── docs/                   # 技术文档中心
│   ├── index.html
│   ├── doc-microservice-architecture.html    # 微服务通用底层架构
│   ├── doc-ecommerce-skills.html              # 全渠道零售架构
│   ├── doc-spring-boot-principles.html        # Spring Boot 核心原理
│   ├── article-spring-cloud-alibaba.html      # Spring Cloud Alibaba 实战
│   ├── doc-msa-framework-guide.html           # MSA Framework 手册
│   ├── article-distributed-transaction.html   # 分布式事务实战
│   ├── doc-collab-editor-architecture.html    # 协同文档编辑器架构
│   ├── doc-iot-architecture.html              # IoT 架构设计
│   ├── doc-iot-lock-token-auth.html           # 门锁 Token 鉴权
│   ├── doc-iot-mqtt-detail.html               # MQTT 全细节解析
│   ├── doc-iot-massive-concurrency.html       # 海量设备并发处理
│   ├── doc-iot-ota-upgrade.html               # 固件 OTA 升级链路
│   ├── doc-iot-lock-security.html             # 门锁安全通信与风控
│   ├── doc-iot-multi-tenant.html              # 多租户 SaaS 门锁管理
│   ├── doc-ai-agent-engineering.html          # AI Agent 工程实战
│   ├── doc-ai-inventory-management.html       # AI 智能库存管理
│   ├── doc-harness-engineering.html           # Harness Engineering
│   ├── doc-cicd.html                          # CI/CD 自动化部署
│   ├── article-kubernetes-deployment.html     # Kubernetes 部署实战
│   ├── article-docker-best-practices.html     # Docker 最佳实践
│   └── doc-jenkins-pipeline-guide.html        # Jenkins Pipeline 指南
└── projects/               # 项目详情页
    ├── index.html
    ├── project-common.css
    └── project-1-saas.html ~ project-12-ship-crawler.html
```

---

## 快速启动

无需安装任何依赖，任意 HTTP 服务器即可运行：

```bash
# Python
cd portfolio-site && python -m http.server 8080

# Node.js
npx serve -l 8080

# VS Code Live Server
# 右键 index.html → Open with Live Server
```

浏览器访问 http://localhost:8080

---

## 主题系统

### 双主题切换

站点支持 **暗色（Dark）** 与 **亮色（Light）** 两种主题，通过 CSS 变量 + `data-theme` 属性实现：

- **切换方式**：点击导航栏右侧 `REALITY ○ SIM` 滑动开关
- **持久化**：主题偏好存储于 `localStorage`（键名 `portfolio-theme`）
- **跨页面同步**：所有页面（主站 / 文档 / 项目）共享同一主题状态
- **跨标签页同步**：通过 `storage` 事件监听，一个标签页切换后其余标签页自动跟随

### CSS 变量体系

所有颜色均通过 `:root` / `[data-theme="light"]` 中定义的 CSS 变量管理，杜绝硬编码色值：

```css
:root {
  --bg-primary: #0a0a0f;
  --text-primary: #e8e8f0;
  --accent-cyan: #00d4ff;
  --accent-purple: #8b5cf6;
  --accent-green: #22c55e;
  --accent-red: #ef4444;
  --code-blue: #6b8cff;
  --hl-keyword: #c084fc;
  --hl-function: #22d3ee;
  --hl-string: #4ade80;
  --hl-number: #fb923c;
}

[data-theme="light"] {
  --bg-primary: #f5f5fa;
  --text-primary: #1a1a2e;
  --accent-cyan: #0099cc;
}
```

### 代码高亮

文档页中的代码块使用语义化 CSS 类实现语法着色，自动适配双主题：

| 类名 | 用途 | 暗色 | 亮色 |
|------|------|------|------|
| `.kw` | 关键词 | `#c084fc` | `#9333ea` |
| `.fn` | 函数名 | `#22d3ee` | `#0891b2` |
| `.str` | 字符串 | `#4ade80` | `#16a34a` |
| `.num` | 数字 | `#fb923c` | `#ea580c` |
| `.cmt` | 注释 | `var(--text-muted)` | `var(--text-muted)` |

---

## 功能模块

主站 `script.js` 包含 15 个功能模块：

| 模块 | 说明 |
|------|------|
| `initNeuralBackground` | Canvas 神经网络粒子背景动画 |
| `initCursorFollower` | 自定义光标跟随效果 |
| `initNavigation` | 响应式导航菜单 |
| `initThemeToggle` | 主题切换 + localStorage + 跨标签同步 |
| `initRoleRotation` | Hero 区域角色标签轮播 |
| `initProjectFilters` | 项目展示区分类筛选 |
| `initTimelineExpand` | 经历时间轴展开/折叠 |
| `initContactForm` | 联系表单交互 |
| `initAIChat` | AI 对话窗口 |
| `initAIStatus` | AI 状态指示器 |
| `initScrollReveal` | 滚动渐显动画 |
| `initMeterAnimations` | 技能仪表盘动画 |
| `initSkillsRadar` | 技能雷达图（Canvas） |
| `initHeaderScroll` | Header 滚动效果 |
| `initProjectModal` | 项目详情弹窗 |

---

## 技术文档

### 架构（7 篇）

| 文档 | 主题 |
|------|------|
| 微服务通用底层架构 | Spring Boot 4.x + Spring Cloud 2025 · 多租户 SaaS · 聚合支付 · 工作流引擎 · 灰度发布 · 幂等性 · 熔断降级 |
| 全渠道零售技术架构 | 微服务架构 · 高并发库存 · 多仓调度 · 事件驱动 · 跨境支付 · 物流状态机 · 业财一体 |
| Spring & Spring Boot 核心原理 | IoC / AOP / 自动配置 / 条件装配 |
| Spring Cloud Alibaba 实战 | Nacos / Sentinel / Seata / Gateway |
| MSA Framework 使用手册 | 微服务框架组件 / 配置中心 / 服务治理 |
| 分布式事务深度解析 | CAP/BASE 理论 / 2PC/XA / TCC / Saga / 消息事务 / Seata 框架 |
| 在线协同文档编辑器架构 | OT/CRDT 一致性算法 / WebSocket 实时同步 / 操作日志与快照 / 权限控制 / 离线编辑 |

### IoT（7 篇）

| 文档 | 主题 |
|------|------|
| IoT 业务场景架构设计 | 高并发限流 / 离线同步 / Edge 边缘计算 |
| 门锁 Token 鉴权认证体系 | 出厂证书烧录 / 挑战-应答激活 / mTLS 双向认证 / OAuth2 Token 鉴权 / MQTT ACL |
| MQTT 全细节深度解析 | QoS 等级策略 / 遗嘱消息 / 心跳保活 / 海量消息削峰 |
| 海量设备并发处理 | EMQX 集群扩展 / Kafka 分区削峰 / 分层存储 / 批量消费幂等 / 背压策略 |
| 固件 OTA 升级链路 | 升级包管理 / 灰度推送 / A/B 分区升级 / 失败回滚 / 状态上报 |
| 门锁安全通信与风控 | mTLS 双向认证 / 证书吊销 / Nonce 防重放 / 非法开锁风控拦截 |
| 多租户 SaaS 门锁管理 | 四级组织架构 / tenant_id 行级隔离 / MQTT Topic 租户隔离 / RBAC 权限体系 |

### AI（3 篇）

| 文档 | 主题 |
|------|------|
| Harness Engineering | Prompt → Context → Harness Engineering 三次范式跃迁 |
| AI 智能库存管理 | 多智能体协同 / 分布式决策 / 库存优化 |
| AI Agent 工程实战 | ReAct 推理 / Function Calling / 记忆系统 / 多 Agent 协同 / MCP 协议 |

### DevOps（4 篇）

| 文档 | 主题 |
|------|------|
| CI/CD 自动化部署 | 流水线设计 / 蓝绿部署 / 金丝雀发布 |
| Kubernetes 部署实战 | 集群搭建 / Deployment / 服务网络 / 持久化存储 / 监控运维 |
| Docker 最佳实践 | Dockerfile 编写 / 镜像优化 / 安全加固 / Compose 编排 / 监控日志 |
| Jenkins Pipeline 指南 | 声明式/脚本式语法 / 共享库 / 多分支策略 / 凭据管理 |

每篇文档均包含：
- 左侧：文章正文（代码块 + 架构图 + 对比表格 + 高亮提示框）
- 右侧：粘性目录导航（TOC），自动高亮当前阅读位置
- 顶部：面包屑导航 + 主题切换开关
- 底部：上/下篇导航链接

---

## 项目展示

| 项目 | 领域 |
|------|------|
| 智慧租住 SaaS 平台 | 房产科技 |
| 智能门锁保洁服务系统 | IoT + 服务调度 |
| 微服务零停机发布系统 | DevOps |
| 跨境电商平台 | 电商 |
| Harness Engineering | 工程化框架 |
| 微服务通用框架组件 | 基础架构 |
| 企业级 CI/CD 流水线平台 | DevOps |
| AI 智能体库存管理 | AI + 供应链 |
| 全域电商业务平台 | 电商 |
| 制造执行系统（MES） | 工业互联网 |
| 海外船东数据爬虫系统 | 数据工程 |
| 自研跨境电商国家站平台 | 跨境电商 |

---

## 设计规范

### 字体

| 用途 | 字体 | 回退 |
|------|------|------|
| 正文 | Space Grotesk | Inter, system-ui, sans-serif |
| 代码 | JetBrains Mono | Fira Code, Cascadia Code, Consolas |

### 响应式断点

| 断点 | 适配 |
|------|------|
| ≤ 1024px | 隐藏 TOC 侧栏，文章全宽 |
| ≤ 900px | 项目卡片单列 |
| ≤ 768px | 导航折叠，Hero 重排 |
| ≤ 480px | 极小屏幕优化 |

### 无障碍

- 跳转链接（Skip Link）：Tab 键可直接跳至主内容
- ARIA 标签：导航、按钮、弹窗均标注 aria-label / aria-expanded
- 减弱动画：prefers-reduced-motion: reduce 时禁用粒子背景和过渡动画
- 键盘导航：所有交互元素支持 focus-visible 样式

---

## 浏览器兼容

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome | 80+ |
| Firefox | 78+ |
| Safari | 14+ |
| Edge | 80+ |

核心依赖：CSS Custom Properties、CSS Grid、backdrop-filter、Canvas API、localStorage。

---

## 开发约定

1. **颜色管理**：所有颜色值必须使用 CSS 变量，禁止内联 style 中硬编码 #hex / rgb()
2. **主题适配**：新增颜色变量需同时在 :root（暗色）和 [data-theme="light"]（亮色）中定义
3. **代码高亮**：使用 .kw / .fn / .str / .num / .cmt 语义类，不使用内联颜色
4. **主题同步**：新增页面须包含主题切换按钮 + localStorage 读写 + storage 事件监听
5. **语义化 HTML**：使用 header / main / nav / article / section 等语义标签
6. **无障碍**：交互元素须有 aria-label，图片须有 alt，表单须关联 label