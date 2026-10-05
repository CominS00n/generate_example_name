<script setup lang="ts">
import { onMounted, ref } from "vue";

import firstName from "../assets/example_name/first_name.json";
import lastName from "../assets/example_name/last_name.json";
import nickname from "../assets/example_name/nicknames.json";

const settings = ref({
  nameTh: true,
  nameEn: true,
  nickname: true,
  email: true,
  domain: "yopmail.com",
});

const nameTh = ref("");
const nameEn = ref("");
const email = ref("");
const nicknameTh = ref("");
const nicknameEn = ref("");
const result = ref<
  {
    nameTh: string;
    nameEn: string;
    email: string;
    nicknameTh: string;
    nicknameEn: string;
  }[]
>([]);
const numberOfName = ref(1);
const firstNameRandom = ref(0);
const lastNameRandom = ref(0);
const nicknameRandom = ref(0);

const generateNameThAndEn = () => {
  return {
    nameTh: `${firstName.names[firstNameRandom.value].name} ${lastName.last_names[lastNameRandom.value].last_name}`,
    nameEn: `${firstName.names[firstNameRandom.value].name_en} ${lastName.last_names[lastNameRandom.value].last_name_en}`,
  };
};
const generateEmail = () => {
  return `${generateNameThAndEn().nameEn.toLowerCase().replace(" ", ".")}@${settings.value.domain}`;
};
const generateNickname = () => {
  return {
    nicknameTh: nickname.Nicknames[nicknameRandom.value].nickname,
    nicknameEn: nickname.Nicknames[nicknameRandom.value].nickname_en,
  };
};

const generateName = () => {
  result.value = [];
  for (let i = 0; i < numberOfName.value; i++) {
    firstNameRandom.value = Math.floor(Math.random() * firstName.names.length);
    lastNameRandom.value = Math.floor(
      Math.random() * lastName.last_names.length,
    );
    nicknameRandom.value = Math.floor(
      Math.random() * nickname.Nicknames.length,
    );

    nameTh.value = settings.value.nameTh ? generateNameThAndEn().nameTh : "";
    nameEn.value = settings.value.nameEn ? generateNameThAndEn().nameEn : "";
    email.value = settings.value.email ? generateEmail() : "";
    nicknameTh.value = settings.value.nickname
      ? generateNickname().nicknameTh
      : "";
    nicknameEn.value = settings.value.nickname
      ? generateNickname().nicknameEn
      : "";

    result.value.push({
      nameTh: nameTh.value,
      nameEn: nameEn.value,
      email: email.value,
      nicknameTh: nicknameTh.value,
      nicknameEn: nicknameEn.value,
    });
  }
};

onMounted(() => {
  generateName();
});
</script>

<template>
  <div
    class="container mx-auto w-full flex flex-col items-center justify-center h-full"
  >
    <h1 class="text-2xl font-bold mb-2">Random Name</h1>
    <form @submit.prevent="generateName" class="--form">
      <div class="w-full flex flex-col items-center justify-center">
        <div class="w-full flex flex-col items-center justify-center mb-4">
          <label for="numberOfName">จำนวนชื่อ {{ numberOfName }}</label>
          <input
            type="range"
            id="numberOfName"
            name="volume"
            min="1"
            max="5"
            v-model="numberOfName"
          />
        </div>
        <div class="w-full flex items-center justify-center gap-6">
          <div class="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              id="nameTh"
              name="nameTh"
              v-model="settings.nameTh"
            />
            <label for="nameTh">ชื่อไทย</label>
          </div>
          <div class="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              id="nameEn"
              name="nameEn"
              v-model="settings.nameEn"
            />
            <label for="nameEn">ชื่ออังกฤษ</label>
          </div>
          <div class="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              id="nickname"
              name="nickname"
              v-model="settings.nickname"
            />
            <label for="nickname">ชื่อเล่น</label>
          </div>
        </div>
        <div class="flex items-center justify-center gap-4 mt-2">
          <div class="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              id="email"
              name="email"
              v-model="settings.email"
            />
            <label for="email">อีเมล</label>
          </div>
          <div class="flex flex-col items-start justify-center gap-2">
            <!-- <label for="domain">ชื่อโดเมน</label> -->
            <input
              type="text"
              id="domain"
              name="domain"
              v-model="settings.domain"
              :disabled="!settings.email"
            />
          </div>
        </div>
      </div>
      <div class="--result text-center">
        <div v-for="item in result" :key="item.nameTh" class="--result-items">
          <ul>
            <li>
              {{ item.nameTh }}
              <span class="--result-items-nickname">{{ item.nicknameTh }}</span>
            </li>
            <li>
              {{ item.nameEn }}
              <span class="--result-items-nickname">{{ item.nicknameEn }}</span>
            </li>
            <li>{{ item.email }}</li>
          </ul>
        </div>
      </div>

      <button type="submit" class="--button-generate">Generate</button>
    </form>
  </div>
</template>

<style scoped>
.--container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.--form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.--menu-setting-item-number-of-name {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.--result {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* background-color: #f5f5f5; */
  width: 50vw;
}
.--result-items {
  margin-bottom: 14px;
  font-size: 18px;

  &:last-child {
    margin-bottom: 0;
  }
}
.--result-items-nickname {
  margin-left: 10px;
}
.--button-generate {
  margin-top: 20px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* background-color: #f5f5f5; */
}

input#domain {
  width: 150px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;

  &:disabled {
    background-color: #f5f5f5;
    color: #ccc;
  }
  &:focus {
    outline: none;
    border: 1px solid #000;
  }
}
</style>
