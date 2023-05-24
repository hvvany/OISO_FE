<template>
  <div>
    <h1>계획 수정</h1>
    <div class="plan">
      <label for="sido_code">시도 코드 </label>
      <input
        class="plan__input"
        v-model="sido_code"
        type="text"
        placeholder="시도 코드 입력"
        ref="sido_code"
        readonly />
      <p v-show="err === 1">{{ errMsg }}</p>

      <label for="title">계획 제목 </label>
      <input
        class="plan__input"
        v-model="title"
        type="text"
        placeholder="계획 제목 입력"
        ref="title" />
      <p v-show="err === 2">{{ errMsg }}</p>
      <label for="startPeriod">시작일 </label>
      <input
        class="plan__input"
        v-model="startPeriod"
        type="text"
        placeholder="시작일 확인"
        ref="startPeriod" />
      <p v-show="err === 3">{{ errMsg }}</p>
      <label for="endPeriod">종료일 </label>
      <input
        class="plan__input"
        v-model="endPeriod"
        type="text"
        placeholder="종료일 입력"
        ref="endPeriod" />
      <p v-show="err === 4">{{ errMsg }}</p>
      <button class="plan__btn" type="button" @click="validate">
        계획 수정 완료
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
      mytripNo: 0,
    };
  },
  created() {
    const planInfo = JSON.parse(this.$route.params.plan);
    console.log(planInfo);
    this.sido_code = planInfo.sido_code;
    this.title = planInfo.title;
    this.startPeriod = planInfo.startPeriod;
    this.endPeriod = planInfo.endPeriod;
    this.mytripNo = planInfo.mytripNo;
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
        this.modifyPlan();
      }
    },
    modifyPlan() {
      console.log(this.sido_code, this.title, this.startPeriod, this.endPeriod);
      this.userId = this.userInfo.userId;
      http
        .put(`/mytrip/plan/${this.userId}`, {
          mytripNo: this.mytripNo,
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

label {
  margin-top: 0.6rem;
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
  margin: 0.6rem 0.6rem;
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

button {
  width: 50px;
  border: 1px solid #989898;
  background-color: white;
  border-radius: 8px;
  padding: 10px 12px;
  margin: 0px 10px;
  font-size: 14px;
}
</style>
