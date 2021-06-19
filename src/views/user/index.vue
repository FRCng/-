<template>
  <div id="user-info">
    <van-nav-bar
      title="个人信息"
      left-arrow
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-cell title="头像" is-link @click="onChangePhoto">
      <div>
        <van-image class="wh25" round fit="cover" :src="user_info.photo" />
      </div>
    </van-cell>
    <van-cell title="昵称" is-link @click="nickName_show = true">
      <div>{{ user_info.name }}</div>
    </van-cell>
    <van-cell title="介绍" is-link />
    <van-cell title="性别" is-link @click="gender_show = true">
      <div>{{ user_info.gender == '0' ? '男' : '女' }}</div>
    </van-cell>
    <van-cell title="生日" is-link @click="birthday_show = true">
      <div>{{ user_info.birthday }}</div>
    </van-cell>
    <van-cell title="地区" is-link>
      <div>待完善</div>
    </van-cell>
    <!-- 昵称 -->
    <van-popup
      v-model="nickName_show"
      position="bottom"
      :style="{ height: '100%' }"
      ><NickName
        v-if="nickName_show"
        :name.sync="user_info.name"
        @close="close"
    /></van-popup>
    <!-- 生日 -->
    <van-popup
      v-model="birthday_show"
      position="bottom"
      :style="{ height: '60%' }"
      ><BirthDay
        v-if="birthday_show"
        :birthday.sync="user_info.birthday"
        @close="close"
      />
    </van-popup>
    <!-- 性别 -->
    <van-popup
      v-model="gender_show"
      position="bottom"
      :style="{ height: '60%' }"
      ><Gender
        v-if="gender_show"
        :gender.sync="user_info.gender"
        @close="close"
      />
    </van-popup>
    <!-- 头像 -->
    <input type="file" hidden ref="Img" @change="onFileChange" />
    <van-popup v-model="face_show" position="bottom" :style="{ height: '100%' }"
      ><Face v-if="face_show" @close="close" :face_Img="face_Img" />
    </van-popup>
  </div>
</template>

<script>
//组件
import NickName from './components/NickName';
import BirthDay from './components/birthday';
import Gender from './components/genter';
import Face from './components/faceImg';
//api
import { EditUser, UserInfo } from '@/api/user';
export default {
  name: 'Info',
  components: { Gender, NickName, BirthDay, Face },
  data() {
    return {
      user_info: {},
      nickName_show: false,
      birthday_show: false,
      gender_show: false,
      face_show: false,
      face_Img: null,
    };
  },
  created() {
    this.get_user_info();
  },
  methods: {
    onFileChange() {
      this.face_Img = this.$refs['Img'].files[0];
      this.face_show = true;
      console.log(this.face_Img);
    },
    onChangePhoto() {
      this.$refs['Img'].click();
    },
    close(type) {
      console.log(type);
      let json_type = ['birthday', 'nickName', 'gender', 'face_show'];
      const result = Object.values(type);
      console.log(result);
      result == 'birthday' && (this.birthday_show = false);
      result == 'nickName' && (this.nickName_show = false);
      result == 'gender' && (this.gender_show = false);
      result[0] == 'face_show' && (this.face_show = false);
      if (type.data) {
        console.log(type.data);
        this.user_info.photo = type.data;
      }
    },
    get_user_info() {
      UserInfo().then((res) => {
        if (res.data.data) {
          this.user_info = res.data.data;
        }
      });
    },
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      this.$toast.success('修改成功');
      this.$router.push('/my');
    },
  },
};
</script>

<style lang="scss">
#user-info {
  .wh25 {
    width: 25px;
    height: 25px;
  }
  color: #fff !important;
  .van-nav-bar {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff !important;
      font-size: 16px;
    }
    .van-nav-bar__text {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
}
</style>
