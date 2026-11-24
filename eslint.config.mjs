import antfu from "@antfu/eslint-config";

import nuxt from "./.nuxt/eslint.config.mjs";

export default antfu(
  {
    formatters: true,
    vue: {
      overrides: {
        // Vue rules
        "vue/block-order": [
          "error",
          { order: ["template", "script", "style"] },
        ],
        "vue/multi-word-component-names": "off",
        "vue/no-v-html": "off",

        // TypeScript rules
        "ts/consistent-type-definitions": ["error", "interface"],

        // Import rules for Nuxt auto-imports
        "import/no-unresolved": "off",
        "import/named": "off",

        // Allow console in development
        "no-console": ["warn", { allow: ["warn", "error"] }],
        "vue/multiline-html-element-content-newline": [
          "error",
          { allowEmptyLines: true },
        ],
        // บังคับให้มีบรรทัดใหม่ก่อนแท็กปิด
        "vue/html-closing-bracket-newline": [
          "error",
          {
            singleline: "never",
            multiline: "always",
          },
        ],

        // บังคับให้ attributes แยกบรรทัดเมื่อมีมากกว่า 1 attribute
        "vue/max-attributes-per-line": [
          "error",
          {
            singleline: {
              max: 1,
            },
            multiline: {
              max: 1,
            },
          },
        ],

        // บังคับให้ self-closing tags อยู่ในบรรทัดใหม่
        "vue/html-self-closing": [
          "error",
          {
            html: {
              void: "never",
              normal: "always",
              component: "always",
            },
            svg: "always",
            math: "always",
          },
        ],

        // บังคับให้ indent ใน template ถูกต้อง
        "vue/html-indent": [
          "error",
          2,
          {
            attribute: 1,
            baseIndent: 1,
            closeBracket: 0,
            alignAttributesVertically: true,
            ignores: [],
          },
        ],

        // บังคับให้ attributes มี indent ที่สม่ำเสมอ
        "vue/first-attribute-linebreak": [
          "error",
          {
            singleline: "ignore",
            multiline: "below",
          },
        ],
      },
    },
    typescript: true,
    stylistic: {
      indent: 2,
      quotes: "double",
      semi: true,
    },
    // Ignore Nuxt generated files
    ignores: [".nuxt", ".output", "dist", "node_modules"],
  },
  {
    rules: {
      "ts/consistent-type-definitions": ["error", "type"],
      "perfectionist/sort-imports": [
        "error",
        {
          tsconfig: { rootDir: "." },
        },
      ],
    },
  },
  nuxt(),
  {
    files: ["app/**/*.{ts,vue}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*", "../**"],
              message:
                "import ข้ามโฟลเดอร์ใน app ให้ใช้ ~/ หรือ #shared ตาม Nuxt alias",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["test/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["*.vue", "**/*.vue"],
              message:
                "ใน test ให้ import component จาก #components หรือทดสอบ layout ผ่าน NuxtLayout เพื่อใช้การ resolve ของ Nuxt",
            },
            {
              regex: "^\\.{1,2}/(?:.*\\/)?(?:app|shared)/",
              message:
                "ใน test ให้ import app ผ่าน ~/ และ shared ผ่าน #shared ตาม Nuxt alias",
            },
          ],
        },
      ],
    },
  },
);
