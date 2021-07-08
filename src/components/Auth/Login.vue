<template>
    <div class="row mt-5">
        <div class="col-12 col-sm-6 col-md-4  mx-auto">
            <div class="card rounded-lg px-4 shadow-lg">
                <span class="icon icon-entrance mx-auto mt-1"/>
                <div class="card-body">
                    <form @submit.prevent="logUser">
                        <FormGroup
                            divClass="form-group text-start"
                            typeInput="text"
                            placeholder="Nombre de usuario o correo..."
                            v-model="userName"
                            />
                            <InputErrorMessage :errors="errors" :propertyNames="['UserName']" />
                        <FormGroup
                            divClass="form-group text-start"
                            typeInput="password"
                            placeholder="Contraseña..."
                            v-model="password"
                            />
                            <InputErrorMessage :errors="errors" :propertyNames="['Password']" />
                        <button type="submit"
                            class="btn btn-principal rounded-lg shadow-lg w-50 mt-5">
                            Iniciar
                        </button>
                        <router-link :to="{name: 'Register'}" class="btn btn-primary mx-2 rounded-lg shadow-lgw-50 mt-5">Registrarme</router-link>
                    </form>
                    <div class="text-center mt-4" v-if="loading">
                        <b-spinner type="grow" label="Loading..."></b-spinner>
                    </div>
                    <div class="text-center mt-4" v-if="errorMessage">
                        <strong class="text-danger">{{errorMessage}}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FormGroup from '../Base/FormGroup.vue';
import InputErrorMessage from '../Base/InputErrorMessage.vue';
import { mapActions, mapState } from "vuex";
export default {
    components:{
        FormGroup,
        InputErrorMessage
    },
    created() {
        document.body.classList.remove('register-bg-image');
        document.body.classList.add('login-bg-image');
    },
    data() {
        return {
            userName: '',
            password: '',
        }
    },
    computed:{
        ...mapState('user', ['loading', 'errorMessage', 'errors'])
    },
    methods: {
        ...mapActions('user', ['login']),
        logUser(){
            const vm = this;
            const user = {
                userName: vm.userName,
                password: vm.password,
            }

            vm.login(user);
        }
    },
}
</script>
<style>

</style>