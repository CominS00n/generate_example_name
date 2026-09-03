<script setup lang="ts">
import { ref } from "vue";

import firstNameTh from "../assets/example_name/first_name_th.json";
import firstNameEn from "../assets/example_name/first_name_en.json";
import lastNameTh from "../assets/example_name/last_name_th.json";
import lastNameEn from "../assets/example_name/last_name_en.json";

const nameTh = ref("");
const nameEn = ref("");
const email = ref("");
const result = ref<{ nameTh: string; nameEn: string; email: string }[]>([]);
const numberOfName = ref(1);
const firstNameRandom = ref(0);
const lastNameRandom = ref(0);

const generateName = () => {
  result.value = [];
  for (let i = 0; i < numberOfName.value; i++) {
    firstNameRandom.value = Math.floor(
      Math.random() * firstNameTh.first_name_th.length,
    );
    lastNameRandom.value = Math.floor(
      Math.random() * lastNameTh.last_name_th.length,
    );
    nameTh.value =
      firstNameTh.first_name_th[firstNameRandom.value] +
      " " +
      lastNameTh.last_name_th[lastNameRandom.value];
    nameEn.value =
      firstNameEn.first_name_en[firstNameRandom.value] +
      " " +
      lastNameEn.last_name_en[lastNameRandom.value];
    email.value = nameEn.value.toLowerCase().replace(" ", ".") + "@yopmail.com";
    result.value.push({
      nameTh: nameTh.value,
      nameEn: nameEn.value,
      email: email.value,
    });
  }
};
</script>

<template>
  <div class="--container">
    <h1>Random Name</h1>
    <form @submit.prevent="generateName">
      <div class="--menu-setting">
        <div class="--menu-setting-item-number-of-name">
          <input
            type="range"
            id="numberOfName"
            name="volume"
            min="1"
            max="11"
            v-model="numberOfName"
          />
          <label for="numberOfName">จำนวนชื่อ {{ numberOfName }}</label>
        </div>
      </div>
      <div class="--result" >
        <div v-for="item in result" :key="item.nameTh" class="--result-item">
          <p>{{ item.nameTh }}</p>
          <p>{{ item.nameEn }}</p>
          <p>{{ item.email }}</p>
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
.--menu-setting {
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
.--result-item {
  margin-bottom: 10px;
}
.--button-generate {
  margin-top: 20px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* background-color: #f5f5f5; */
}
</style>
