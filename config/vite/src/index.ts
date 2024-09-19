// node
import { fileURLToPath, URL } from 'node:url'

// unocss
import presetUno from '@unocss/preset-uno'

import transformerDirectives from '@unocss/transformer-directives'
import vue from '@vitejs/plugin-vue'
// unocss config
import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'
// element plus
import ElementPlus from 'unplugin-element-plus/vite'

import IconsResolver from 'unplugin-icons/resolver'

// icon
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

import { defineConfig, loadEnv } from 'vite'

import { createProxy } from './proxy'

function defineAppConfig() {
    return defineConfig(({ mode }) => {
        const env = loadEnv(mode, '../../')

        return {
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
                    ],
                    dts: 'src/components.d.ts',
                    dirs: ['src/components', '../../packages/components'],
                }),
            ],
            resolve: {
                alias: {
                    '@': fileURLToPath(new URL('./src', import.meta.url)),
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
