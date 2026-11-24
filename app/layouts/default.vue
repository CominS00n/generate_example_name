<template>
  <div class="flex min-h-dvh flex-col">
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2">
          <div
            class="h-7.5 w-7.5 bg-primary rounded-lg flex justify-center items-center"
          >
            <UIcon
              name="i-lucide-dices"
              class="text-white dark:text-brand-950"
            />
          </div>
          <span class="font-bold text-base">ExampleName</span>
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain class="min-h-0 flex-1">
      <UPageBody class="container mx-auto mt-4 pb-4">
        <slot />
      </UPageBody>
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          CominS00n • Copyright © {{ new Date().getFullYear() }}
        </p>
      </template>
    </UFooter>
  </div>
</template>

<script setup lang="ts"></script>
