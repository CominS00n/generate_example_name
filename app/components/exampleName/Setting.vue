<template>
  <UCard
    class="h-fit"
    :ui="{ body: 'space-y-4' }"
  >
    <template #header>
      <span class="font-bold">ตั้งค่า</span>
    </template>
    <UFormField
      label="ภาษา"
      help="เลือกได้ทั้งสองภาษา และต้องเลือกไว้อย่างน้อย 1 ภาษา"
      :ui="{ hint: 'text-[14px]' }"
    >
      <div class="grid grid-cols-2 gap-2 w-full">
        <UCheckbox
          v-model="settings.languages.th"
          color="primary"
          variant="card"
          :disabled="settings.languages.th && !settings.languages.en"
          label="ไทย"
          description="สมชาย ใจดี"
        />
        <UCheckbox
          v-model="settings.languages.en"
          color="primary"
          variant="card"
          :disabled="settings.languages.en && !settings.languages.th"
          label="English"
          description="Somchai Jaidee"
        />
      </div>
    </UFormField>
    <UFormField label="เพศ">
      <URadioGroup
        v-model="settings.gender"
        color="primary"
        variant="card"
        :items="items"
        orientation="horizontal"
        :ui="{ fieldset: 'flex-1 flex-nowrap', item: 'w-full' }"
      />
    </UFormField>
    <UFormField
      label="จำนวนรายชื่อ"
      :help="`สูงสุด ${MAX_NAME_COUNT} รายชื่อต่อครั้ง`"
      :ui="{ hint: 'text-[14px]' }"
    >
      <UInputNumber
        v-model="settings.count"
        class="w-full"
        size="lg"
        :min="1"
        :max="MAX_NAME_COUNT"
      />
    </UFormField>
    <USwitch
      v-model="settings.showLastName"
      class="w-full"
      size="lg"
      label="แสดงนามสกุล"
      :ui="{ root: 'flex-row-reverse justify-between' }"
    />
    <USwitch
      v-model="settings.showNickname"
      class="w-full"
      size="lg"
      label="แสดงชื่อเล่น"
      :ui="{ root: 'flex-row-reverse justify-between' }"
    />
    <template #footer>
      <UButton
        icon="i-lucide-shuffle"
        label="สุ่มชื่อใหม่"
        class="w-full"
        size="lg"
        :ui="{
          base: 'flex items-center justify-center h-11',
          label: 'font-bold',
        }"
        @click="generate"
      />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { RadioGroupItem } from "@nuxt/ui";

import type { NameSettings } from "~/utils/randomNames";

const emit = defineEmits<{
  generate: [settings: NameSettings];
}>();

const items: RadioGroupItem[] = [
  { label: "ทั้งหมด", value: "all" },
  { label: "ชาย", value: "male" },
  { label: "หญิง", value: "female" },
];

const settings = reactive<NameSettings>({
  languages: { th: true, en: true },
  gender: "all",
  count: 1,
  showLastName: true,
  showNickname: true,
});

function generate() {
  // ส่งสำเนาออกไป เพื่อให้ผลลัพธ์ไม่เปลี่ยนตามเมื่อแก้ตั้งค่าหลังสุ่ม
  emit("generate", {
    ...settings,
    languages: { ...settings.languages },
  });
}
</script>
