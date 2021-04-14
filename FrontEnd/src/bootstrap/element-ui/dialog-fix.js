export default {
  data() {
    return {
      mousedown: false
    };
  },
  methods: {
    handleMouseDown(e) {
      let target = e.target;
      if (
        document
          .querySelector("#dialog-fix .el-dialog__headerbtn")
          .contains(target)
      ) {
        return;
      }
      if (document.querySelector("#dialog-fix .el-dialog").contains(target)) {
        this.mousedown = true;
      }
    },
    handleMouseUp() {
      if (this.mousedown) {
        setTimeout(() => {
          this.mousedown = false;
        }, 0);
      }
    },
    handleBeforeClose(done) {
      if (this.mousedown) {
        return;
      } else {
        done();
      }
    }
  }
};
