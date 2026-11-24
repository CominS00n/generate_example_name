# ExampleName — สุ่มชื่อตัวอย่าง

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-1597BB?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

เว็บสุ่มชื่อ-นามสกุลและชื่อเล่นภาษาไทย/อังกฤษ สำหรับใช้เป็นข้อมูลตัวอย่างตอนทดสอบระบบหรือทำ mock data

## ฟีเจอร์

- สุ่มได้ครั้งละ 1–50 รายชื่อ ชื่อจริงไม่ซ้ำกันในแต่ละครั้ง
- เลือกภาษาได้ทั้งไทยและอังกฤษ (ต้องเลือกอย่างน้อย 1 ภาษา)
- เลือกเพศ: ทั้งหมด / ชาย / หญิง โดยนามสกุลและชื่อเล่นจะตรงกับเพศของชื่อจริง
- เปิด/ปิดการแสดงนามสกุลและชื่อเล่น
- ตารางผลลัพธ์แบ่งหน้า หน้าละ 10 รายชื่อ และคัดลอกรายชื่อทีละแถวได้
- รองรับโหมดสว่างและโหมดมืด

## เทคโนโลยี

- [Nuxt 4](https://nuxt.com) + [Nuxt UI 4](https://ui.nuxt.com) + Tailwind CSS 4
- [bun](https://bun.sh) เป็น package manager
- ESLint: [`@antfu/eslint-config`](https://github.com/antfu/eslint-config) ร่วมกับ [`@nuxt/eslint`](https://eslint.nuxt.com)
- Deploy บน [Vercel](https://vercel.com)

## เริ่มต้นใช้งาน

ติดตั้ง dependencies:

```bash
bun install
```

รัน development server ที่ `http://localhost:3000`:

```bash
bun run dev
```

## คำสั่งอื่น ๆ

| คำสั่ง                | ใช้ทำอะไร                                             |
| ------------------- | ---------------------------------------------------- |
| `bun run build`     | build สำหรับ production                               |
| `bun run preview`   | เปิดดูผล build บนเครื่อง                                 |
| `bun run lint`      | ตรวจโค้ดด้วย ESLint (แก้อัตโนมัติด้วย `bun run lint --fix`) |
| `bun run typecheck` | ตรวจ type ด้วย `vue-tsc`                              |

## โครงสร้างโปรเจกต์

```
app/
├── app.config.ts              # สี primary / neutral ของ Nuxt UI
├── assets/
│   ├── css/main.css           # ธีมสี brand และตัวแปรสีของ Nuxt UI
│   └── exampleNames/          # ข้อมูลชื่อ (first_name, last_name, nickname)
├── components/exampleName/
│   ├── Setting.vue            # ฟอร์มตั้งค่าและปุ่ม "สุ่มชื่อใหม่"
│   └── TableResult.vue        # ตารางผลลัพธ์ แบ่งหน้า และปุ่มคัดลอก
├── layouts/default.vue        # header / footer
├── pages/index.vue            # รับค่าตั้งค่าจาก Setting แล้วส่งผลลัพธ์ให้ TableResult
└── utils/randomNames.ts       # logic การสุ่มรายชื่อ
```

## เพิ่มหรือแก้ไขรายชื่อ

แก้ไฟล์ JSON ใน `app/assets/exampleNames/` แต่ละรายการมีรูปแบบเดียวกัน:

```json
{ "th": "ต้น", "en": "Ton", "gender": "male" }
```

`gender` ต้องเป็น `"male"` หรือ `"female"` เท่านั้น

| ไฟล์               | key ของรายการ |
| ----------------- | ------------- |
| `first_name.json` | `names`       |
| `last_name.json`  | `last_names`  |
| `nickname.json`   | `nicknames`   |

## ธีมสี

สีหลักคือ `brand` (Lagoon, `#1597BB`) ไล่ระดับ 50–950 ประกาศไว้ใน `app/assets/css/main.css`

- ปุ่มหลัก: `brand-600` ในโหมดสว่าง / `brand-400` ในโหมดมืด
- พื้นหลังโหมดมืด: `#0b1120`

## Deploy

Vercel จะ deploy อัตโนมัติเฉพาะ branch `production` (ตั้งไว้ใน `vercel.json`) ส่วน branch อื่นไม่ deploy

ขั้นตอนทั่วไป: พัฒนาบน `develop` แล้ว merge เข้า `production` เมื่อต้องการปล่อยเวอร์ชันใหม่ และสร้าง tag ตามเวอร์ชัน เช่น `v2.0.0`

## License

[MIT](./LICENSE)
