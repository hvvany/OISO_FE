<template>
  <div class="filebox">
    <input class="upload-name" :value="fileName" placeholder="첨부파일" />
    <label for="files">파일찾기</label>
    <input
      type="file"
      name="files"
      id="files"
      multiple="multiple"
      @change="fileChange()" />
  </div>
</template>

<script>
export default {
  name: "FileInput",
  components: {},
  data() {
    return {
      fileName: "첨부파일",
    };
  },
  created() {},
  methods: {
    fileChange() {
      this.fileName = document.querySelector("#files").value;
    },
  },
};
</script>

<style scoped>
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
</style>
