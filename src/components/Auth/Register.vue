<template>
    <div class="row">
        <div class="col-12 col-sm-6 col-md-4  mx-auto">
            <div class="card rounded-lg p-4 shadow-lg">
                <span class="icon icon-person-add mx-auto mt-3"/>
                <div class="card-body">
                    <form @submit.prevent="createAccount">
                        <FormGroup
                            divClass="form-group text-start"
                            typeInput="text"
                            placeholder="Nombre..."
                            v-model="firstName"
                            :required="true"
                            />
                        <FormGroup
                            divClass="form-group text-start"
                            typeInput="text"
                            placeholder="Apellido..."
                            v-model="lastName"
                            :required="true"
                            />
                        <FormGroup
                            divClass="form-group text-start"
                            typeInput="text"
                            placeholder="Nombre de usuario..."
                            v-model="userName"
                            :required="true"
                            />
                        <FormGroup
                            divClass="form-group text-start"
                            typeInput="text"
                            placeholder="Correo..."
                            v-model="email"
                            :required="true"
                            />
                        <FormGroup
                            divClass="form-group text-start"
                            typeInput="password"
                            placeholder="Contraseña..."
                            v-model="password"
                            :required="true"
                            />
                        <FormGroup
                            divClass="form-group text-start"
                            typeInput="password"
                            placeholder="Confirmar..."
                            v-model="passwordConfirmation"
                            :required="true"
                            />
                        <button type="submit"
                            class="btn btn-principal rounded-lg shadow-lg w-50 mt-5">
                            Enviar
                        </button>
                    </form>
                    <div class="text-center mt-4" v-if="loading">
                        <b-spinner type="grow" label="Loading..."></b-spinner>
                    </div>
                    <div class="text-center mt-4" v-if="error">
                        <strong class="text-danger">{{error}}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FormGroup from '../Base/FormGroup.vue';
import { mapActions, mapState } from "vuex";
export default {
    components:{
        FormGroup
    },
    data() {
        return {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            passwordConfirmation:''
        }
    },
    computed:{
        ...mapState('user', ['loading', 'error'])
    },
    methods: {
        ...mapActions('user', ['register']),
        createAccount(){
            const vm = this;
            const user = {
                firstName: vm.firstName,
                lastName: vm.lastName,
                userName: vm.userName,
                email: vm.email,
                password: vm.password,
                passwordConfirmation:vm.passwordConfirmation
            }

            vm.register(user);
        }
    },
}
</script>
<style>
    body{
        /* The image used */
        background-image: url("~@/assets/images/bg.jpg");

        /* Center and scale the image nicely */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>