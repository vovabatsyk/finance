<template>
  <div>
    <div class="page-title">
      <h3>{{'profileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        />
        <label for="description">{{'name' | localize}}</label>
        <span
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{'Message_EnterName' | localize}}</span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import localizeFilter from '@/filter/localize.filter'

export default {
  name: 'profile',
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  validations: {
    name: { required }
  },
  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
        this.$message(localizeFilter('Profile_messageUpdate'))
      } catch (e) {}
    }
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
