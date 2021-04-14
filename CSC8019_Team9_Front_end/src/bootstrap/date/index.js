import Vue from "vue";
function formatDate(obj) {
  if (Object.prototype.toString.call(obj) === "[object Date]") {
    return formatFromObj(obj);
  }
  if (Object.prototype.toString.call(obj) === "[object Number]") {
    return formatFromNumber(obj);
  }
}
function formatFromNumber(number) {
  let date = new Date(number);
  return formatFromObj(date);
}

function formatFromObj(obj) {
  let date = [obj.getFullYear(), obj.getMonth() + 1, obj.getDate()].join("-"),
    time = [obj.getHours(), obj.getMinutes(), obj.getSeconds()].join(":"),
    datetime = [date, time].join(" ");
  return datetime;
}
Vue.prototype.$format = formatDate;
