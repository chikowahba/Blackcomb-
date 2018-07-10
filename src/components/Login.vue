<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>User name</label>
     <input required v-model="user.email" type="text" placeholder="email"/>
     <label>Password</label>
     <input required v-model="user.password" type="text" placeholder="Password"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
 </div>
</template>

<script>

    import axios from '../axios-auth';
    export default {
      data: function () {
          return {
              user : {}
          };
      },
      methods: {
        login : function() {
        axios
          .post('user/login',this.user)
          .then(response => {

            if (response.data.token)
            {
              localStorage.setItem('token', response.data.token)
              this.$router.push({ name: 'User' });
            }

          })
        }
      }
    }
</script>
