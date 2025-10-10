<template>
    <zs-layout menu-key="isMenu">
        <template #header>
            <router-link class="flex" to="/">
                <div class="title-box">
                    <img width="24" height="24" src="@assets/images/icon/logo_1.png" alt="logo">
                    <span>{{ title }}&nbsp;</span>
                </div>
            </router-link>

            <div class="flex-v-center">
                <avatar />
            </div>
        </template>
    </zs-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import avatar from '../avatar/index.vue'

const title = ref<string>()
title.value = document.title
</script>

<style lang="scss" scoped>
.title-box {
    @apply flex items-center;

    img {
        @apply mr-8px;
    }

    span {
        @apply pt-2px text-16px font-bold text-#333;
    }
}
</style>
