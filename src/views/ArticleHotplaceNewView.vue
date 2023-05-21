<template>
  <div>
    <top-form-nav
      :title="'핫플 등록'"
      :mode="'등록'"
      :canEdit="canEdit"></top-form-nav>
    <input
      class="input__title"
      type="text"
      placeholder="제목을 입력해주세요."
      v-model="content_title" />
    <!-- <input type="file" name="files" id="files" multiple="multiple" /> -->
    <div class="filebox">
      <input class="upload-name" value="첨부파일" placeholder="첨부파일" />
      <label for="files">파일찾기</label>
      <input type="file" name="files" id="files" multiple="multiple" />
    </div>
    <textarea
      class="input__text"
      placeholder="본문을 입력해주세요."
      v-model="content_text"></textarea>

    <!-- 파일 업로드 애니메이션 -->
    <div v-if="uploading" class="hotplace-new__background">
      <div v-if="uploading" class="upload-animation"></div>
    </div>

    <app-footer></app-footer>
    <app-nav :navmode="'hotplace'"></app-nav>
  </div>
</template>

<script>
import http from "@/util/http-common";
import TopFormNav from "@/components/layout/TopFormNav.vue";
import AppNav from "@/components/layout/AppNav.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

import { mapGetters } from "vuex";
export default {
  name: "HotplaceNew",
  components: { TopFormNav, AppNav, AppFooter },
  data() {
    return {
      content_title: "",
      content_text: "",
      canEdit: false,
      uploading: false,
    };
  },
  mounted() {},
  methods: {
    async sendArticle() {
      this.uploading = true;
      let hotplaceData = {
        id: this.userInfo.userId,
        title: this.content_title,
        content: this.content_text,
        fileInfos: [],
      };
      if (this.content_text !== "" && this.content_title !== "") {
        const uploadPromises = Array.from(
          document.querySelector("#files").files
        ).map(async (file) => {
          const imgData = new FormData();
          imgData.append("key", "f2ca20b108085e2a0acc6988c4e16c0f");
          imgData.append("image", file);
          const response = await http.post(
            "https://api.imgbb.com/1/upload",
            imgData
          );
          const imageData = response.data.data;

          hotplaceData.fileInfos.push({
            originName: file.name,
            onlinePath: imageData.display_url,
            deletePath: imageData.delete_url,
          });
        });
        await Promise.all(uploadPromises);
        console.log(hotplaceData.fileInfos);

        // 게시글 post 요청
        http.post("/article/hotplace/new", hotplaceData).then(({ status }) => {
          if (status == 200) {
            this.$router.push({ name: "hotplace" });
          }
        });
      } else {
        alert("정보를 입력해 주세요");
      }
      this.uploading = false;
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
.input__title {
  width: 80vw;
  border-radius: 3px;
  border-width: 1px;
  border-color: #dddddd;
  height: 3rem;
  padding: 0 1rem;
  margin: 1rem;
}
.input__text {
  padding: 1rem;
  margin: 1rem;
  width: 80vw;
  height: 130vw;
  border-radius: 3px;
  border-width: 1px;
  border-color: #dddddd;
}
.filebox input[type="file"] {
  display: none;
}
.filebox {
  display: flex;
  padding: 0 1.2rem;
}

.filebox .upload-name {
  height: 40px;
  padding: 0 1rem;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 60vw;
  color: #999999;
}
.filebox label {
  padding: 1rem;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  height: 40px;
  width: 20vw;
  margin-left: 1rem;
  font-size: 0.5rem;
}
.hotplace-new__background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(2px);
}
.upload-animation {
  background-image: url("../../public/img/upload_action_icon.gif");
  background-size: cover;
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  position: fixed;
  left: calc(50vw - 5rem);
  top: calc(50vh - 5rem);
}
</style>
