function generateCode() {
  let millis = Date.now(),
    suffix = generateRandom(4);
  return millis + suffix;
}
function generateRandom(bit) {
  let end = Math.pow(10, bit),
    start = Math.pow(10, bit - 1);
  return Math.floor(Math.random() * start) + (start - end);
}
export default generateCode;
