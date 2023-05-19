import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.prototype.$kmpSearch = function (text, pattern) {
  const prefixTable = generatePrefixTable(pattern);
  const result = [];
  let i = 0;
  let j = 0;

  while (i < text.length) {
    if (pattern[j] === text[i]) {
      j++;
      i++;
      if (j === pattern.length) {
        result.push(i - j);
        j = prefixTable[j - 1];
      }
    } else if (j > 0) {
      j = prefixTable[j - 1];
    } else {
      i++;
    }
  }
  return result;
};

function generatePrefixTable(pattern) {
  const prefixTable = [0];
  let len = 0;
  for (let i = 1; i < pattern.length; i++) {
    if (pattern[i] === pattern[len]) {
      len++;
      prefixTable[i] = len;
    } else {
      if (len !== 0) {
        len = prefixTable[len - 1];
        i--;
      } else {
        prefixTable[i] = 0;
      }
    }
  }

  return prefixTable;
}
