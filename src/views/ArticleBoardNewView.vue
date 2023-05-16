<template>
  <div>
    <top-form-nav :title="'게시글 작성'"></top-form-nav>
    <input
      class="input__title"
      type="text"
      placeholder="제목을 입력해주세요."
      v-model="content_title" />
    <textarea id="input__content" v-model="content_text"></textarea>
    <app-nav :navmode="'board'"></app-nav>
  </div>
</template>

<script>
// import editor plugins
import suneditor from "suneditor";
import image from "suneditor/src/plugins/dialog/link";
import list from "suneditor/src/plugins/submenu/list";
import { font, video } from "suneditor/src/plugins";
import lang from "suneditor/src/lang";

import http from "@/util/http-common";
import TopFormNav from "@/components/layout/TopFormNav.vue";
import AppNav from "@/components/layout/AppNav.vue";
export default {
  name: "BoardNew",
  components: { TopFormNav, AppNav },
  data() {
    return {
      content_title: "",
      content_text: "",
    };
  },
  mounted() {
    suneditor.create("input__content", {
      plugins: [font, video, image, list],
      buttonList: [["font", "video", "image", "list"]],
      lang: lang.ko,
    });

    const editor = suneditor.create("example");
    // Gets a list of images uploaded to the editor
    /**
     * {
     *  element: image element
     *  src: imgage src
     *  index: data index
     *  name: file name
     *  size: file size
     *  select: select function
     *  delete: delete function
     * }
     **/
    editor.getImagesInfo();

    // Gets uploaded files(plugin using fileManager) information list.
    // image: [img], video: [video, iframe], audio: [audio]
    // When the argument value is 'image', it is the same function as "getImagesInfo".
    /**
     * {
     *  element: image element
     *  src: imgage src
     *  index: data index
     *  name: file name
     *  size: file size
     *  select: select function
     *  delete: delete function
     * }
     * pluginName: Plugin name (image, video, audio)
     **/
    // Upload images using image plugin
    // document.getElementById('example_files_input').files
    editor.insertImage(FileList);
  },
  methods: {
    sendArticle() {
      http
        .post("/article/board/new", {
          id: localStorage.getItem("userId"),
          title: this.content_title,
          content: this.content_text,
        })
        .then(({ status }) => {
          if (status == 200) {
            this.$router.push("article/board");
          }
        });
    },
  },
};
</script>

<style scoped>
.input__title {
  width: 80vw;
  border-radius: 20px;
  border-width: 1px;
  height: 3rem;
  padding: 0 1rem;
  margin: 1rem;
}
#input__content {
  width: 99vw;
  height: 80vh;
  text-align: start;
}
</style>
