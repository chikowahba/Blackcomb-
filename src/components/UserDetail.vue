<template>
    <div class="component" v-if = "contact != null">
        <h3>You may view the User Details here</h3>
        <p>First Name: {{ contact.firstName }}</p>
        <p> Last Name: {{ contact.lastName }}</p>
        <p>Email: {{ contact.email }}</p>
        <p>number: {{ contact.number }}</p>
    </div>
    <div class="component" v-else>
      <h3>No contact selected</h3> 
    </div>
</template>

<script>
    export default {
        props: {
            contact : {
                type:Object
            },
        },
        mounted: function () {
           console.log(this)
         },
        methods: {

        },
    }
</script>

<style scoped>
    .component {
        background-color: lightcoral;
    }
</style>
