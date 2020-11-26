#更新内容
**参数 loading 更新加载动画(可自定义)
参数 bgcolor 修改为加载骨架的背景颜色**


#解决问题
**出现this.animation.opacity is not a function 问题是因为组件的生命周期过快原因**


------------


# 引入组件大家都知道的
import mskeleton from './components/skeleton/skeleton';


#具体用法
参数 selector 下面需要骨架的样式开头
参数 show 决定显示或隐藏 
需要一个名为skeleton的view内容全写在下面
圆形的骨架需要加上skeleton-radius样式
矩形的则需要加上skeleton-rect样式

```html
<template>
  <div>
    <m-skeleton selector="skeleton" loading :show="showSkeleton"></m-skeleton>
    <view class="container skeleton">
        <view class="userinfo">
            <!-- 要渲染的圆形节点，加上 .skeleton-radius -->
            <image class="userinfo-avatar skeleton-radius" :src="img" mode="aspectFill"></image>
            <!-- 要渲染的矩形节点，加上 .skeleton-rect -->
            <text class="userinfo-nickname skeleton-rect">{{userInfo.nickName}}</text>
        </view>
        <view class="usermotto">
            <text class="user-motto skeleton-rect">{{motto}}</text>
        </view>
    </view>
  </div> 
</template>
```
```javascript
<script>
export default {
  data() {
    return {
      showSkeleton: true,
      motto: 1111,
      userInfo:{
        nickName:"nickName"
      },
      img:'http://img5.imgtn.bdimg.com/it/u=2754780702,3253667337&fm=26&gp=0.jpg',
      opacity:1
    };
  },
  onLoad(){
    setTimeout(()=>{
        this.showSkeleton = false;
    },1000)
  },
  methods:{
  },
};
</script>
```
```css
<style>
.userinfo{
  display: flex;
  flex-direction: column;
}
.userinfo-avatar{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  left: 20px;
  margin-left: 20px;
  object-fit: contain
}
.userinfo-nickname{
  margin: 20px;
}
</style>
```
 