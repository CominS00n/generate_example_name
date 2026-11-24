<template>
  <UCard
    class="col-span-2 rounded-lg flex flex-col lg:h-0 lg:min-h-full"
    :ui="{ body: 'p-0 sm:p-0 flex-1 min-h-0 flex flex-col' }"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <span class="font-bold">ผลลัพธ์</span>
        <UBadge
          :label="`${names.length} รายชื่อ`"
          variant="soft"
          color="neutral"
        />
      </div>
    </template>
    <UTable
      v-model:pagination="pagination"
      :data="names"
      :columns="columns"
      :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
      empty="กด “สุ่มชื่อใหม่” เพื่อสุ่มรายชื่อ"
      sticky
      class="flex-1 min-h-0 overflow-y-auto"
    />
    <template #footer>
      <div class="flex justify-end">
        <UPagination
          v-model:page="page"
          :items-per-page="PAGE_SIZE"
          :total="names.length"
          class="h-11"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

import { getPaginationRowModel } from "@tanstack/vue-table";

import type { Language, NameResult, NameSettings } from "~/utils/randomNames";

const props = defineProps<{
  names: NameResult[];
  settings: NameSettings;
}>();

const PAGE_SIZE = 10;

const pagination = ref({ pageIndex: 0, pageSize: PAGE_SIZE });

// UPagination นับหน้าเริ่มที่ 1 ส่วน TanStack Table เริ่มที่ 0
const page = computed({
  get: () => pagination.value.pageIndex + 1,
  set: (value: number) => {
    pagination.value = { ...pagination.value, pageIndex: value - 1 };
  },
});

// สุ่มรายชื่อชุดใหม่แล้วกลับไปหน้าแรก
watch(
  () => props.names,
  () => {
    page.value = 1;
  },
);

const UUser = resolveComponent("UUser");
const UBadge = resolveComponent("UBadge");
const UButton = resolveComponent("UButton");

const languages = computed(() =>
  (["th", "en"] as const).filter(
    lang => props.settings.languages[lang],
  ),
);

/** ภาษาแรกเป็นชื่อหลัก ภาษาที่สอง (ถ้าเลือกไว้) เป็นคำอธิบายใต้ชื่อ */
function localized(texts: (lang: Language) => string) {
  const [primary, secondary] = languages.value;
  return {
    name: texts(primary!),
    description: secondary
      ? texts(secondary)
      : undefined,
  };
}

const toast = useToast();

const showLastName = computed(() => props.settings.showLastName);
const showNickname = computed(() => props.settings.showNickname);
const showEmail = computed(() => props.settings.showEmail);

/** email ใช้ชื่อ-นามสกุลภาษาอังกฤษเสมอ ไม่ขึ้นกับภาษาที่เลือก */
function email(row: NameResult) {
  return `${row.firstName.en}.${row.lastName.en}@${props.settings.mailDomain}`;
}

function fullName(row: NameResult, lang: Language) {
  return showLastName.value
    ? `${row.firstName[lang]} ${row.lastName[lang]}`
    : row.firstName[lang];
}

/** ข้อความที่คัดลอก: หนึ่งบรรทัดต่อภาษาที่เลือก เช่น "สมชาย ใจดี (ต้น)" ตามด้วย email (ถ้าเปิดไว้) */
function copyText(row: NameResult) {
  const lines = languages.value.map(lang =>
    showNickname.value
      ? `${fullName(row, lang)} (${row.nickname[lang]})`
      : fullName(row, lang),
  );
  if (showEmail.value) {
    lines.push(email(row));
  }
  return lines.join("\n");
}

async function copy(row: NameResult) {
  try {
    await navigator.clipboard.writeText(copyText(row));
    toast.add({
      title: "คัดลอกแล้ว",
      description: fullName(row, languages.value[0]!),
      icon: "i-lucide-check",
      color: "success",
    });
  }
  catch {
    toast.add({
      title: "คัดลอกไม่สำเร็จ",
      description: "เบราว์เซอร์ไม่อนุญาตให้เข้าถึงคลิปบอร์ด",
      icon: "i-lucide-x",
      color: "error",
    });
  }
}

const columns = computed<TableColumn<NameResult>[]>(() => {
  return [
    {
      id: "order",
      header: "#",
      meta: {
        class: {
          th: "w-[60px]",
          td: "w-[60px]",
        },
      },
      cell: ({ row }) => String(row.index + 1),
    },
    {
      id: "full-name",
      header: showLastName.value ? "ชื่อ-นามสกุล" : "ชื่อ",
      cell: ({ row }) =>
        h(
          UUser,
          localized(lang => fullName(row.original, lang)),
        ),
    },
    ...(showNickname.value
      ? [
          {
            id: "nickname",
            header: "ชื่อเล่น",
            meta: {
              class: {
                th: "w-[120px]",
                td: "w-[120px]",
              },
            },
            cell: ({ row }) =>
              h(
                UUser,
                localized(lang => row.original.nickname[lang]),
              ),
          } satisfies TableColumn<NameResult>,
        ]
      : []),
    ...(showEmail.value
      ? [
          {
            id: "email",
            header: "Email",
            cell: ({ row }) => email(row.original),
          } satisfies TableColumn<NameResult>,
        ]
      : []),
    {
      accessorKey: "gender",
      header: "เพศ",
      meta: {
        class: {
          th: "w-[100px]",
          td: "w-[100px]",
        },
      },
      cell: ({ row }) =>
        h(UBadge, {
          label: row.original.gender === "male"
            ? "ชาย"
            : "หญิง",
          variant: "outline",
          color: row.original.gender === "male"
            ? "primary"
            : "error",
        }),
    },
    {
      id: "actions",
      header: "",
      meta: {
        class: {
          th: "w-px",
          td: "w-px text-right",
        },
      },
      cell: ({ row }) =>
        h(UButton, {
          "icon": "i-lucide-copy",
          "variant": "ghost",
          "color": "neutral",
          "aria-label": `คัดลอก ${fullName(row.original, languages.value[0]!)}`,
          "onClick": () => copy(row.original),
        }),
    },
  ];
});
</script>
