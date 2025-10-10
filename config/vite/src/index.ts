// node
import { resolve } from 'node:path'
import process from 'node:process'
// import { fileURLToPath, URL } from 'node:url'

// import { webComponentsVue3Resolvers } from '@lightsoft/unplugin-auto-import'

// unocss
import presetUno from '@unocss/preset-uno'
import transformerDirectives from '@unocss/transformer-directives'
import vue from '@vitejs/plugin-vue'

// unocss config
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

// element plus
import ElementPlus from 'unplugin-element-plus/vite'
// icon
import IconsResolver from 'unplugin-icons/resolver'

import Icons from 'unplugin-icons/vite'
// auto import
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Components from 'unplugin-vue-components/vite'

import { defineConfig, loadEnv } from 'vite'
import { createProxy } from './proxy'

interface IAppConfig {
    envDir?: string
    envDirAuto?: boolean
    base?: (mode: string, process: NodeJS.Process) => string | string
}

function defineAppConfig(options?: IAppConfig) {
    return defineConfig(({ mode }) => {
        const {
            envDir = '../../',
            envDirAuto,
            base,
        } = options || {}
        const newEvnDir = envDirAuto ? process.cwd() : envDir
        const env = loadEnv(mode, newEvnDir)
        const newBase = typeof base === 'function' ? base(mode, process) : (base || '')

        return {
            base: newBase,
            plugins: [
                vue(),
                UnoCSS({
                    presets: [presetUno()],
                    transformers: [transformerDirectives()],
                }),
                AutoImport({
                    dts: '../../types/auto-imports.d.ts',
                    imports: ['vue', 'vue-router', 'vue-i18n', 'pinia'],
                    resolvers: [
                        ElementPlusResolver(),
                        IconsResolver({
                            prefix: 'Icon',
                        }),
                    ],
                }),
                ElementPlus({
                    useSource: true,
                    defaultLocale: 'zh-cn',
                }),
                Icons({
                    autoInstall: true,
                    compiler: 'vue3',
                }),
                // 自动注册组件
                Components({
                    resolvers: [
                        ElementPlusResolver(),
                        IconsResolver({
                            enabledCollections: ['ep'],
                            prefix: false,
                        }),
                        // webComponentsVue3Resolvers(),
                    ],
                    dts: 'src/components.d.ts',
                    dirs: ['src/components', '../../packages/components'],
                }),
            ],
            resolve: {
                alias: {
                    '@': resolve(process.cwd(), 'src'),
                },
            },
            server: {
                host: '0.0.0.0',
                proxy: createProxy(env),
            },
        }
    })
}

export default defineAppConfig
