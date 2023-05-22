<template>
  <div>
    <h1>new trip</h1>
    <!-- 시도는 코드 말고 이름으로 선택할 수 있게 하고
        날짜는 형식에 맞는지 확인하자 -->
    <div class="plan">
      <input
        class="plan__input"
        v-model="sido_code"
        type="text"
        placeholder="시도 코드 입력"
        ref="sido_code" />
      <p v-show="err === 1">{{ errMsg }}</p>
      <input
        class="plan__input"
        v-model="title"
        type="text"
        placeholder="계획 제목 입력"
        ref="title" />
      <p v-show="err === 2">{{ errMsg }}</p>
      <input
        class="plan__input"
        v-model="startPeriod"
        type="text"
        placeholder="시작일 확인"
        ref="startPeriod" />
      <p v-show="err === 3">{{ errMsg }}</p>
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
    //id, sido_code, title, startPeriod, endPeriod
    sendPlan() {
      console.log(this.sido_code, this.title, this.startPeriod, this.endPeriod);
      if (this.comment != "") {
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
      } else {
        alert("정보를 입력해 주세요");
      }
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
</style>
