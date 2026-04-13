<template>
  <section
    class="s-profile a-mb-72"
  >
    <div class="container">
      <div class="s-profile__wrapper">
        <div class="s-profile__avatar">
          <div class="s-profile__img a-mb-16">
            <q-img
              :src="require('/public/img/profile/profile.png')"
              class="m-education-direction-all__image"
            />
          </div>
          <h4 class="a-mb-8">
            Иван Иванович
          </h4>
          <div class="s-profile__avatar-change">
            <q-input
              filled
              type="file"
              hint="Сменить аватар"
              label-color="stroke"
            />
          </div>
        </div>
        <div class="s-profile__box">
          <MProfileInfo
            class="a-mb-56"
          />
          <MProfileChange
            class=""
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import MProfileChange from 'src/components/molecules/MProfileChange';
import MProfileInfo from 'src/components/molecules/MProfileInfo';
</script>
<style lang="scss">
.s-profile {
  &__wrapper {
    display: grid;
    grid-template-columns: rem(270) 1fr;
    gap: rem(40);
    @media(max-width: $breakpoint-sm) {
      grid-template-columns: 1fr;
    }
  }

  &__img {
    height: rem(270);
    width: rem(270);
    @media(max-width: $breakpoint-xs) {
      height: rem(160);
      width: rem(160);
    }
  }

  &__avatar {
    &-change {
      max-width: rem(125);
      .q-field__native, .q-field--filled .q-field__control:before,
      .q-field--filled .q-field__control {
        display: none;
      }
      .q-field__messages > div {
        color: color(stroke);
        font-size: rem(14);
        font-weight: 500;
        margin-top: rem(-7);
      }
      .q-field--with-bottom {
        cursor: pointer;
        padding: rem(10) 0;
      }
      .q-field__bottom {
        z-index: -1;
        padding: 0;
      }
    }
  }
}
</style>
