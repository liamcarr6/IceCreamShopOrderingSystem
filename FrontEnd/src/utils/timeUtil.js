function getTime(date) {
  date = date || new Date();
  return [date.getHours(), date.getMinutes()].join(":");
}
function getDate(date) {
  date = date || new Date();
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/");
}
export { getTime, getDate};
