<template>
  <footer>
    <p>(주) 여행을 강다 | 대표 김준환 강다은</p>
    <p>사업자 등록번호 810-02-18941</p>
    <p>통신판매업 신고번호 2023-부산 강서-05219</p>
    <p>부산광역시 강서구 녹산산단 335로 7 송정삼정그린코아 더시티 고층</p>
    <p>항공, 숙소 및 투어 티켓 문의 1588-8282</p>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
footer {
  margin: 5rem 0 5rem 0;
  font-size: 0.5rem;
  color: rgb(151, 151, 151);
}
footer > p {
  margin: 0.5rem 2rem;
  text-align: start;
}
</style>
