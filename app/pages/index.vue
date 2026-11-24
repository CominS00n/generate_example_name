<template>
  <div class="space-y-6">
    <UPageFeature
      title="สุ่มชื่อตัวอย่าง"
      :ui="{ title: 'text-4xl font-bold' }"
    />
    <UPageGrid>
      <ExampleNameSetting @generate="generate" />
      <ExampleNameTableResult
        :names="names"
        :settings="settings"
      />
    </UPageGrid>
  </div>
</template>

<script setup lang="ts">
import type { NameResult, NameSettings } from "~/utils/randomNames";

const names = shallowRef<NameResult[]>([]);
const settings = shallowRef<NameSettings>();

function generate(next: NameSettings) {
  settings.value = next;
  names.value = randomNames(next);
}
</script>
