import { defineStore } from 'pinia';
import { employees } from '@/firebase';
import { useRoute } from 'vue-router';
import { getDoc, doc } from 'firebase/firestore';
import { onMounted, ref, watchEffect } from 'vue';

export const useStore = defineStore("userStore", {  
    state: () => ({
        firstName: '',
        lastName: '',
        designation: '',
        employeeNumber: '',
        photoUrl: '',
        image: '',
        str: ''
    }),
    actions: {
        fill() {
            const route = useRoute();
            let userId = route.params.userId;
            let docRef = doc(employees, userId);
            getDoc(docRef).then((doc) => {
            let userRef = (doc.data());
            this.photoUrl = userRef.photoUrl
            this.firstName = userRef.firstName;
            this.lastName = userRef.lastName;
            this.designation = userRef.designation
            this.employeeNumber = userRef.employeeNumber;
            this.image = userRef.photoUrl;
            this.str = 'http://192.168.1.4:8080/forClient/' + userId;
            })
        }
    }
});