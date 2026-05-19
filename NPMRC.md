# shamefully-hoist=true: 允许在npm安装时跨范围提升依赖，这可能会导致某些依赖版本的不一致。
# 注释（解释）：启用后 pnpm 会把匹配的依赖提升到工作区根的 node_modules，兼容某些需要扁平化依赖的工具/插件。
shamefully-hoist=true

# strict-peer-dependencies=false: 关闭对 peerDependencies 的严格检查。
# 注释（解释）：设置为 false 时，如果 peerDependencies 不满足，安装不会失败（可能掩盖版本不匹配问题）。
strict-peer-dependencies=false

# shell-emulator=true: 启用 shell 模拟器，用于在无终端环境下模拟某些脚本行为。
# 注释（解释）：让某些安装脚本在非交互环境更稳定，通常不常用，视 CI/环境需求开启。
shell-emulator=true

# public-hoist-pattern[]=*eslint*
# 注释（解释）：将匹配该模式的依赖提升为公共 hoist（允许提升到根 node_modules），常用于 eslint 插件需要被多个包共享。
public-hoist-pattern[]=*eslint*

# public-hoist-pattern[]=*stylelint*
# 注释（解释）：同上，但针对 stylelint 及其插件。
public-hoist-pattern[]=*stylelint*

# public-hoist-pattern[]=*commitlint*
# 注释（解释）：同上，但针对 commitlint 相关包。
public-hoist-pattern[]=*commitlint*

# public-hoist-pattern[]=unplugin-icons
# 注释（解释）：指定单个包名进行提升，避免在子包中重复安装。
public-hoist-pattern[]=unplugin-icons

# public-hoist-pattern[]=vite
# 注释（解释）：把 vite 提升到根，以便工作区内多个包共享同一 vite 版本。
public-hoist-pattern[]=vite

# public-hoist-pattern[]=unocss
# 注释（解释）：把 unocss 提升到根，避免重复安装多个副本。
public-hoist-pattern[]=unocss

# use-node-version=20.10.0
# 注释（解释）：注释掉的行，通常用于记录或强制工具使用特定 Node 版本（被注释表示未生效）。
# use-node-version=20.10.0

# registry=https://registry.npmmirror.com
# 注释（解释）：将 npm 请求的 registry 指向镜像，加速安装（国内常用 cnpm 镜像）。
registry=https://registry.npmmirror.com

# ignore-workspace-root-check=true
# 注释（解释）：允许在 workspace 根目录执行某些被 pnpm 限制的操作（例如在 root 安装依赖），通常用于 CI 或特殊工作流。
ignore-workspace-root-check=true
