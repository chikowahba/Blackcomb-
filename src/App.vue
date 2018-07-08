<template>
    <div class="container">
        <div class="row">
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import User from './components/User.vue';
    import Login from './components/Login.vue';

    export default {
        components: {
            appUser: User,
            appLogin: Login
        }
    }
</script>

<style>
    div.component {
        border: 1px solid black;
        padding: 30px;
    }
</style>
