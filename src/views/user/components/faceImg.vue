<template>
  <div class="face">
    <van-nav-bar
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <img class="Img" :src="ImgSrc" ref="img" />
  </div>
</template>

<script>
import Cropper from 'cropperjs';
import 'cropper/dist/cropper.min.css';
import { EditUser } from '@/api/user';
export default {
  name: 'Face',
  data() {
    return {
      ImgSrc: '',
      cropper: null,
    };
  },
  props: {
    face_Img: {},
  },
  beforeMount() {
    this.ImgSrc = window.URL.createObjectURL(this.face_Img);
  },
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
      // dragMode: 'move',
      // aspectRatio: 1,
      // autoCropArea: 0.9,
      // restore: false,
      // guides: false,
      // center: false,
      // highlight: false,
      // cropBoxMovable: false,
      // cropBoxResizable: false,
      // toggleDragModeOnDblclick: false,
    });
  },
  methods: {
    getCropped() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob);
        });
      });
    },
    onClickLeft() {
      this.$emit('close', { type: 'face_show' });
    },
    async onClickRight() {
      const file = await this.getCropped();
      const fd = new FormData();
      fd.append('photo', file);
      EditUser(fd).then((res) => {
        const data = res.data;
        if (data) {
          this.$toast.success('修改成功');
          this.$emit('close', {
            type: 'face_show',
            data: window.URL.createObjectURL(file),
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
.face {
  height: 100%;
  background-color: #000;
  .van-nav-bar {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5) !important;

    left: 0;
    right: 0;
    bottom: 0;
  }
}
.Img {
  display: block;
  max-width: 100%;
}
</style>
