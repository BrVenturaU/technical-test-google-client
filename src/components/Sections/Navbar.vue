<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand">Technical Test Maps</a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto ml-3">
                <li class="nav-item">
                    <router-link :to="{ name: 'Map' }" class="nav-link"
                    >Dashboard</router-link
                    >
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                <router-link :to="{name: 'Profile'}">Hi! {{ authUser.userName }}</router-link>
                </li>
                <li class="nav-item">
                    <span class="icon icon-logout align-middle"></span>
                </li>
            </ul>
        </div>
        </nav>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapGetters("user", ["authUser"]),
  },
  methods: {},
};
</script>

<style scoped>
.nav-item .icon-logout{
    cursor: pointer;
}
</style>
