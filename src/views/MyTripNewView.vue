<template>
  <div>
    <h1>계획 추가</h1>
    <!-- 시도는 코드 말고 이름으로 선택할 수 있게 하고 (완)
        날짜는 형식에 맞는지 확인하자 -->
    <div class="plan">
      <label for="sido_code">지역 선택 </label>
      <div class="selectBox">
        <div class="select__div">
          <select v-model="sido_code" class="select">
            <option value="">선택</option>
            <option v-for="(value, key) in sidos" :value="value" :key="key">
              {{ key }}
            </option>
          </select>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </div>
      </div>

      <p v-show="err === 1">{{ errMsg }}</p>
      <label for="title">계획 제목 </label>
      <input
        class="plan__input"
        v-model="title"
        type="text"
        placeholder="계획 제목 입력"
        ref="title" />
      <p v-show="err === 2">{{ errMsg }}</p>
      <label for="startPeriod">시작일 ex) 20230524</label>
      <input
        class="plan__input"
        v-model="startPeriod"
        type="text"
        placeholder="시작일 확인"
        ref="startPeriod" />
      <p v-show="err === 3">{{ errMsg }}</p>
      <label for="endPeriod">종료일 ex) 20230530 </label>
      <input
        class="plan__input"
        v-model="endPeriod"
        type="text"
        placeholder="종료일 입력"
        ref="endPeriod" />
      <p v-show="err === 4">{{ errMsg }}</p>
      <button class="plan__btn" type="button" @click="validate">
        계획 생성
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/util/http-common";
export default {
  name: "mytripNew",
  components: {},
  data: function () {
    return {
      message: "",
      errMsg: "",
      err: 0,
      userId: "",
      sido_code: "",
      title: "",
      startPeriod: "",
      endPeriod: "",
      sidos: {
        서울: 1,
        인천: 2,
        대전: 3,
        대구: 4,
        광주: 5,
        부산: 6,
        울산: 7,
        세종: 8,
        경기도: 31,
        강원도: 32,
        충청북도: 33,
        충청남도: 34,
        경상북도: 35,
        경상남도: 36,
        전라북도: 37,
        전라남도: 38,
        제주도: 39,
      },
    };
  },
  methods: {
    validate() {
      this.err = 0;
      let isValid = true; // 유효하면 true
      !this.sido_code
        ? ((isValid = false),
          (this.err = 1),
          (this.errMsg = "시도코드를 입력해주세요"),
          this.$refs.sido_code.focus())
        : !this.title
        ? ((isValid = false),
          (this.err = 2),
          (this.errMsg = "계획 제목을 입력해주세요"),
          this.$refs.title.focus())
        : !this.startPeriod
        ? ((isValid = false),
          (this.err = 3),
          (this.errMsg = "시작일을 입력해주세요"),
          this.$refs.startPeriod.focus())
        : !this.endPeriod
        ? ((isValid = false),
          (this.err = 3),
          (this.errMsg = "종료일을 입력해주세요"),
          this.$refs.endPeriod.focus())
        : (isValid = true);

      if (isValid) {
        this.sendPlan();
      }
    },
    sendPlan() {
      console.log(this.sido_code, this.title, this.startPeriod, this.endPeriod);
      this.userId = this.userInfo.userId;
      http
        .post(`/mytrip/plan/${this.userId}`, {
          id: this.userId,
          sido_code: this.sido_code,
          title: this.title,
          startPeriod: this.startPeriod,
          endPeriod: this.endPeriod,
        })
        .then(({ status }) => {
          if (status == 200) {
            this.$router.push({ name: "mytrip" });
          }
        });
    },
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
};
</script>

<style scoped>
h1 {
  font-size: 1.4rem;
  margin: 1rem;
  font-weight: 700;
}

label,
.select__div {
  margin: 1rem 0 0.5rem 0;
}

.plan {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.plan__input {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 3rem;
  border-width: 1px;
  border-radius: 20px;
  padding: 0 1rem 0 1rem;
}

.plan__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 3rem;
  border-width: 1px;
  border-radius: 20px;
  margin: 0.6rem 0.6rem;
}

.selectBox {
  position: relative;
  width: 12rem;
  height: 3rem;
  border-radius: 20px;
  border: 1px solid rgb(88, 88, 88);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.selectBox .select {
  width: 12.2rem;
  height: 3rem;
  background: transparent;
  border: 0 none;
  outline: 0 none;
  padding: 0.8rem;
  position: relative;
  z-index: 3;
}
.selectBox .select option {
  background: rgb(255, 255, 255);
  color: black;
  padding: 3px 0;
  font-size: 16px;
}
</style>
