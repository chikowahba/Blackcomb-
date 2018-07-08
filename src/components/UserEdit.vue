<template>
    <div class="component" v-if = "contact">
      <div class = "row">
        <div class="col-xs-6">
            <div class="title">
                 First name
            </div>
            <div class="input-cover ">
                <input type="text" v-model = "contact.firstName" class="input-design" required>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="title">
                  Last name
            </div>
            <div class="input-cover ">
                <input type="text"   v-model = "contact.lastName" class="input-design" required>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="title">
                 Email
            </div>
            <div class="input-cover ">
                <input type="text"   v-model = "contact.email" class="input-design" required>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="title">
                 number
            </div>
            <div class="input-cover ">
                <input type="text"  v-model = "contact.number"  class="input-design" required>
            </div>
        </div>
          <div class="col-xs-12 ">
            <button @click="save(contact._id,contact)">Edit contact</button>
          </div>
      </div>
    </div>
    <div class="component" v-else>
      <h3>No contact selected</h3>
    </div>
</template>

<script>
    import axios from '../axios-auth';



    export default {
        props: {
            contact : {
                type:Object
            },
        },
        watch: {
      	contact: function(newVal, oldVal) { // watch it
            console.log('Prop changed: ', newVal, ' | was: ', oldVal)
          }
        },
        methods: {
            save (id,obj) {
                axios.patch('/contact/'+ id , obj)
                 .then((response) => {
                         this.$emit('contactChanged',obj);
                 });
            }

        }
    }
</script>

<style scoped>
    div {
        background-color: lightgreen;
    }
</style>
