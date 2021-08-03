<!-- 兑换 -->
<template>
  <CustomNavBar :title="t('edit_profile')"/>
  <div class="page-wrap">
      <div class="edit-profile-page">
          <van-image
            round
            width="3rem"
            height="3rem"
            fit="cover"
            :src="avatar"
        />
        <Uploader :max-size="500 * 1024" :after-read="afterRead" :max-count="1" accept="image/png, image/jpeg">
            <Button type="primary" style="margin-top: 50px" >{{t('change_the_avatar')}}</Button>
        </Uploader>
      </div>
  </div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import { useI18n } from "vue-i18n";
import { Image as VanImage, Button, Uploader, Toast  } from 'vant';
import CustomNavBar from '@/components/custom_nav_bar/index.vue';
import * as services from '@/services/index';
import { IUserInfoResDTO } from '@/services/interface/response.d';
import * as utils from '@/utils';

export default {
    name: '',
    components: {
       CustomNavBar,
       VanImage,
       Button,
       Uploader
    },
    setup() {
        const { t } = useI18n();
        const avatar = ref<string>();
        const userInfo = ref<IUserInfoResDTO>();
        onMounted(async () => {
           try {
               utils.loading('加载中');
               const response = await services.userCenter();
               userInfo.value = response.data;
               avatar.value = response.data.head_img;
               utils.loadingClean()
           } catch(err) {
               utils.toast(err || err.msg);
           }
        })
        const afterRead = async (file: any) => {
           console.log(file.file)
           utils.loading('正在上传');
           const formData = new FormData();
           formData.append('file', file.file);
           const res = await services.upload_img(formData);
           await services.change_head_img({avatar: res.data.path});
           avatar.value = res.data.pathUrl;
           Toast.success('上传成功');
        }
        return {
            userInfo,
            avatar,
            afterRead,
            t
        }
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>