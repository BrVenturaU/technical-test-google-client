<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-12 col-sm-6 col-md-4 mx-auto">
        <span class="icon icon-user mx-auto mt-1"></span>
        <form @submit.prevent="updateUser">
          <FormGroup
            divClass="form-group text-start"
            typeInput="text"
            placeholder="Nombre de usuario..."
            v-model="userName"
          />
          <InputErrorMessage
            :errors="errors"
            :propertyNames="['UserName', 'duplicateUserName']"
          />
          <FormGroup
            divClass="form-group text-start"
            typeInput="password"
            placeholder="Contraseña actual..."
            v-model="currentPassword"
          />
          <InputErrorMessage
            :errors="errors"
            :propertyNames="['CurrentPassword', 'passwordMismatch']"
          />
          <FormGroup
            divClass="form-group text-start"
            typeInput="password"
            placeholder="Nueva contraseña..."
            v-model="password"
          />
          <InputErrorMessage
            :errors="errors"
            :propertyNames="[
              'Password',
              'passwordRequiresDigit',
              'passwordTooShort',
            ]"
          />
          <FormGroup
            divClass="form-group text-start"
            typeInput="password"
            placeholder="Confirmar..."
            v-model="passwordConfirmation"
          />
          <InputErrorMessage
            :errors="errors"
            :propertyNames="['PasswordConfirmation']"
          />
          <button
            type="submit"
            class="btn btn-principal rounded-lg shadow-lg w-50 mt-2"
          >
            Enviar
          </button>
        </form>
        <div class="text-center mt-4" v-if="loading">
          <b-spinner type="grow" label="Loading..."></b-spinner>
        </div>
        <div class="text-center mt-4" v-if="errorMessage">
          <strong class="text-danger">{{ errorMessage }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormGroup from "../Base/FormGroup.vue";
import InputErrorMessage from "../Base/InputErrorMessage.vue";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    FormGroup,
    InputErrorMessage,
  },
  created() {
      this.userName = this.authUser.userName;
  },
  data() {
    return {
      userName: "",
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
    };
  },
  computed: {
      ...mapGetters("user", ["authUser"]),
    ...mapState("user", ["loading", "errorMessage", "errors"]),
  },
  methods: {
    ...mapActions("user", ["update"]),
    updateUser() {
      const vm = this;
      const user = {
        userName: vm.userName,
        currentPassword: vm.currentPassword,
        password: vm.password,
        passwordConfirmation: vm.passwordConfirmation,
      };

      vm.update(user);
    },
  },
};
</script>
<style>
</style>