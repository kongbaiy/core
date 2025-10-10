#!/bin/bash

# 进入Jenkins工作空间根目录
cd /var/jenkins_home/workspace/core

# 固定配置
REPO_URL="https://lightsoft.life:8001/web/sso.git"
BRANCH_NAME="feature-mode"
TARGET_DIR="sso"
FULL_PATH="apps/$TARGET_DIR"

# 1. 克隆或更新仓库
echo "Cloning $BRANCH_NAME into $FULL_PATH..."
if [ -d "$FULL_PATH" ]; then
    echo "Updating existing repository..."
    cd "$FULL_PATH"
    git pull origin "$BRANCH_NAME"
    cd ..
else
    git clone -b "$BRANCH_NAME" "$REPO_URL" "$FULL_PATH"
fi

# 检查操作结果
if [ $? -ne 0 ]; then
    echo "Error: Git operation failed"
    exit 1
fi

# 2. 安装依赖
echo "Installing dependencies in $FULL_PATH..."
cd "$FULL_PATH"
pnpm install || { echo "Error: pnpm install failed"; exit 1; }

# 3. 执行构建（关键修改：直接在sso目录构建）
echo "Building project..."
pnpm run build || { echo "Error: Build failed"; exit 1; }  # 使用项目自身的build命令

# 返回初始目录（可选）
cd -


# 4. 重命名dist目录
echo "Preparing deployment files..."
if [ -d "dist" ]; then
    mv dist lightsoft_sso
    echo "Renamed dist to lightsoft_sso successfully"
else
    echo "Error: dist directory not found in $(pwd)"
    exit 1
fi

# 5. 部署到目标目录
TARGET_PATH="/usr/local/html/lightsoft_sso"

echo "Deploying to $TARGET_PATH..."

# 如果目标存在则删除
if [ -d "$TARGET_PATH" ]; then
    echo "Removing existing target directory..."
    rm -rf "$TARGET_PATH" || {
        echo "Error: Failed to remove existing directory"
        exit 1
    }
fi

# 移动新文件
mv lightsoft_sso "$TARGET_PATH" || {
    echo "Error: Failed to deploy to $TARGET_PATH"
    exit 1
}

echo "Deployment completed successfully!"
