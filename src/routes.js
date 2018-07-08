import User from './components/User.vue';
import Login from './components/Login.vue';

export const routes = [
    { path: '', name: 'Login', components: {
        default: Login
    } },
    { path: '/user',name: 'User' ,components: {
        default: User
    }
    }
];
