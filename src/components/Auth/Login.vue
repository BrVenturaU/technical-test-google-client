<template>
    <div>
        <h1>Login</h1>
        <router-link :to="{name:'Register'}">Register</router-link>
    </div>
</template>
<script>
export default {
    created() {
        document.body.classList.remove('register-bg-image');
        document.body.classList.add('login-bg-image');
    },
}
</script>
<style>

</style>