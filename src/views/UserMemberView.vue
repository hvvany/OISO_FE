<template>
  <div>
    <top-back-nav :title="'멤버 관리'"></top-back-nav>
    <div class="card__member" v-for="(member, idx) in memberData" :key="idx">
      <input
        class="text"
        v-if="modifyMode & (member.userId === userId)"
        type="text"
        v-model="userId"
        readonly />
      <div class="text" v-else>사용자 ID : {{ member.userId }}</div>
      <input
        class="text"
        v-if="modifyMode & (member.userId === userId)"
        type="text"
        v-model="userPwd" />
      <div class="text" v-else>사용자 PW : {{ member.userPwd }}</div>
      <input
        class="text"
        v-if="modifyMode & (member.userId === userId)"
        type="email"
        v-model="email" />
      <div class="text" v-else>
        사용자 E-MAIL : {{ member.emailId }}@{{ member.emailDomain }}
      </div>
      <button v-if="!modifyMode" @click="changeModify(member)">수정</button>
      <span v-else>
        <button @click="$router.go()">취소</button>
        <button @click="modifyMember()">수정</button>
      </span>
      <button @click="deleteMember(member)">삭제</button>
    </div>
    <app-nav></app-nav>
  </div>
</template>

<script>
import http from "@/util/http-common";
import TopBackNav from "@/components/layout/TopBackNav.vue";
import AppNav from "@/components/layout/AppNav.vue";
export default {
  name: "userMember",
  components: { TopBackNav, AppNav },
  data() {
    return {
      message: "",
      memberData: [],
      modifyMode: false,
      userId: "",
      userPwd: "",
      email: "",
    };
  },
  created() {
    this.getMember();
  },
  methods: {
    getMember() {
      http.get("/user/member").then((response) => {
        console.log(response);
        this.memberData = response.data;
      });
    },
    changeModify(member) {
      this.userId = member.userId;
      this.userPwd = member.userPwd;
      this.email = member.emailId + "@" + member.emailDomain;
      this.modifyMode = !this.modifyMode;
    },
    modifyMember() {
      console.log({
        userId: this.userId,
        userPwd: this.userPwd,
        emailId: this.email.split("@")[0],
        emailDomain: this.email.split("@")[1],
      });
      console.log(`/user/member/${this.userId}`);
      http
        .put(`/user/member/${this.userId}`, {
          userId: this.userId,
          userPwd: this.userPwd,
          emailId: this.email.split("@")[0],
          emailDomain: this.email.split("@")[1],
        })
        .then(({ status }) => {
          if (status == 200) {
            this.$router.go();
            this.modifyMode = !this.modifyMode;
          } else {
            alert("오류 발생");
          }
        });
    },
    deleteMember(member) {
      http.delete(`/user/member/${member.userId}`).then((response) => {
        console.log(response);
      });
      this.getMember();
    },
  },
};
</script>

<style scoped>
.card__member {
  background-color: white;
  border-radius: 8px;
  margin: 2vw;
  padding: 2vw;
}

input {
  width: 80%;
  border: 1px solid #989898;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
}

.text {
  margin: 1vw;
}

button {
  width: 20%;
  border: 1px solid #989898;
  background-color: white;
  border-radius: 8px;
  padding: 6px 12px;
  margin: 6px 10px;
  font-size: 12px;
}
</style>
