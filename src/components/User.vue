<template>
    <div class="component">
        <h1>The User Component</h1>
        <table class="table">
          <thead>
              <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Mail</th>
                  <th scope="col">Phone</th>
                  <th scope="col">view</th>
                  <th scope="col">edit</th>
                  <th scope="col">delete</th>
              </tr>
          </thead>
          <tbody>
            <tr v-for = "(contact, index) in contacts" >
              <td>{{contact.firstName}}</td>
              <td>{{contact.lastName}}</td>
              <td>{{contact.email}}</td>
              <td>{{contact.number}}</td>
              <td><button @click="viewUser(contact,index)">view contact</button></td>
              <td><button @click="editUser(contact, index)">edit contact</button></td>
              <td><button @click="deleteUser(contact._id)">delete contact</button></td>
            </tr>
          </tbody>
        </table>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <app-user-detail
                        :contact = "selectedViewContact">
                </app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-6">
                <app-user-edit
                        :contact = "selectedEditContact"
                        @contactChanged="change"
                ></app-user-edit>
            </div>
        </div>
    </div>
</template>

<script>
    import UserDetail from './UserDetail.vue';
    import UserEdit from './UserEdit.vue';
    import axios from '../axios-auth';

    export default {
        data: function () {
            return {
                selectedViewIndex : null,
                selectedIndex : null,
                selectedEditContact : null,
                selectedViewContact : null,
                contacts : axios
                  .get('/contact')
                  .then(response => {
                    this.contacts = response.data;
                  })
                  .catch(function (error) {
                     console.log(error);
                   })
            };
        },
        methods: {
            viewUser(obj,index) {
              this.selectedViewIndex = index;
              this.selectedViewContact  = obj;
            },
            change(event){
            if (this.selectedViewIndex == this.selectedIndex) {
              this.selectedViewContact = event;
            }
              axios
                .get('/contact')
                .then(response => {
                  this.contacts = response.data.contacts;
                })
            },
            editUser(obj,index) {
              this.selectedIndex = index;
              this.selectedEditContact = JSON.parse(JSON.stringify(obj));
            },
            deleteUser (id) {
                axios.delete('/contact/'+ id )
                 .then((response) => {
                   axios
                     .get('/contact')
                     .then(response => {
                       this.contacts = response.data.contacts;
                       this.selectedEditContact = null;
                       this.selectedViewContact = null;
                     })
                });
            }
        },
        components: {
            appUserDetail: UserDetail,
            appUserEdit: UserEdit
        },
        mounted () {
        axios
          .get('/contact')
          .then(response => {
            this.contacts = response.data.contacts;
          })
      }
    }
</script>

<style scoped>
    div {
        background-color: lightblue;
    }
</style>
