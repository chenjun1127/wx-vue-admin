<template>
  <div class="tab-bar-list" :class="className">
    <div v-for="(item, index) in list" @click="change(index)" key="index" :class="currentIndex == index ? 'active' : ''">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['change']);
defineProps({
  currentIndex: {
    default: 0,
    type: Number,
  },
  list: {
    default: () => [],
    type: Array<any>,
  },
  className: {
    type: String,
  }
});
const change = (index: any) => {
  emits('change', index);
};
</script>
<style lang="scss" scoped>
.tab-bar-list {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 72px;
  position: relative;

  &::before {
    @extend .bottom-line;
  }

  padding: 0 30px;
  position: relative;
  align-items: center;

  &::before {
    position: absolute;
    content: '';
    @extend .triangle;
    left: 20px;
    top: 50%;
    transform: translateY(-50%) rotate(180deg);
  }

  &::after {
    position: absolute;
    content: '';
    @extend .triangle;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  >div {
    margin: 0 20px;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;

    &.active {
      font-size: 16px;

      &::after {
        content: '';
        width: 2.29166666vw;
        height: 3px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAECAYAAAAK2fi4AAACp0lEQVQ4T12UTW4cNxCF3yt2caQYcQIY3mnhfdZZzEF8n5xHF9E1stDGARxbgH/EYrMqKLJHI2TRIJss9mC++vh4H1EeHh7rk99st3qqvbV6w6J72SsoOvZRlaKdokKv7l4B142qTq/0qCDVQSWjIsfIGmqQFQhlRL3sE6LhoSDqfAIVgMasy3oq5negBGoEZi2JLRwnCtQjlGD+riHCABoQDYgOsjFogTCSFhFzDrARNBIWgUZED9KY+/nkuawfYZR1Lsf1vTAPN3ExL26gNAkxhPXhYlpKey5bw49vfaub3dhP4+lDO59h/Hgf5c37v/XX27e1/Wz1l6L6g10hRTcpNTjUd6lFvAZEMYYKZcJP2JEwSJUJNCrdq5O6QC/gcz2BRMx1HOCR+yKKCZyVOJo1AeZZ0dkgssbxrXwHcDqaYgltwowJI0FPmGvtCm7CD7YJLkEe+3POtZ41cplfGnWAFhHz3g2iDeEd4i3hyuY2fFgZYpuq9dHNT7V9se+GxzvjXxHy9PB4+ufrs/7+7laDVbe21X3fK25Eyz6qcWhJ2PmHE573UwLGmLBezJ0wIyp5NTgND+GWsKfRB8wENGGlwWnyBEed0GcDlsFgGrvmr41+AXwF29LkBCcX6IfBaSE8jY1ppOQZpNkvjUibp6mzFuzLYDeG2KDPW7Eg+xrdLUSauFvZio2xW5Sttb3bb+O587S18/kuDb4vf/z5UT9/+rc6VTMi8D+Dyy410thh1UWmlVu+HyAXPK8YonN8ZTT82oB4df0TLIkaCXrGRFq/bPUjVpCRQWzL2NUABuYNOWy/RgTDwue1bjgAptERKzrkAvOAnubnvmd0+OgrZthClvlgacDe4dIyKjIiMhoA768jIoq04gtw33fLiEiD39h3ezzf2X83yCPQWi5quAAAAABJRU5ErkJggg==) no-repeat;
        background-size: contain;
        display: inline-block;
        vertical-align: middle;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
      }
    }
  }
}
</style>
