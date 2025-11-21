# Node.js 版本要求

## 问题

当前系统使用的是 **Node.js v16.20.2**，但本项目需要 **Node.js 18 或更高版本**。

## 错误信息

```
TypeError: crypto$2.getRandomValues is not a function
```

这个错误是因为 Vite 5.x 和其他依赖需要 Node.js 18+ 的功能。

## 解决方案

### 选项 1：升级 Node.js（推荐）

1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载并安装 **Node.js 18 LTS** 或更高版本
3. 重新安装项目依赖：
   ```bash
   cd app
   npm install
   npm run dev
   ```

### 选项 2：使用 nvm 管理 Node.js 版本

如果您使用 nvm (Node Version Manager)：

```bash
# 安装 Node.js 18
nvm install 18

# 使用 Node.js 18
nvm use 18

# 重新安装依赖
cd app
npm install
npm run dev
```

### 选项 3：使用 Docker（可选）

如果您不想更改系统 Node.js 版本，可以使用 Docker：

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

## 验证 Node.js 版本

安装完成后，验证版本：

```bash
node --version
# 应该显示 v18.x.x 或更高
```

## 项目依赖要求

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **Vite**: 5.x
- **React**: 18.3.1

## 注意事项

- 升级 Node.js 后，建议删除 `node_modules` 文件夹和 `package-lock.json`，然后重新运行 `npm install`
- 如果遇到权限问题，可能需要使用管理员权限运行命令
