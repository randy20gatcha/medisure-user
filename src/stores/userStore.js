import { defineStore } from 'pinia';
import { employees } from '@/firebase';
import { useRoute } from 'vue-router';
import { getDoc, doc, getDocs } from 'firebase/firestore';
import { onMounted, ref, watchEffect } from 'vue';

export const useStore = defineStore("userStore", {  
    state: () => ({
        firstName: '',
        lastName: '',
        designation: '',
        employeeNumber: '',
        photoUrl: '',
       // image: '',  
        str: '',
        users: []
    }),
    actions: {
        fill() {     // this method's function is to  fill-in details of ForCompany and ForClient
            const route = useRoute();
            let userId = route.params.userId;
            let docRef = doc(employees, userId);           
            getDoc(docRef).then((doc) => {
            let userRef = (doc.data());
            this.photoUrl = userRef.photoUrl
            this.firstName = userRef.firstName;
            this.lastName = userRef.lastName;
            this.designation = userRef.designation;
            this.employeeNumber = userRef.employeeNumber;
            this.str = 'https://medisure-hr.web.app/forClient/' + userId;
            })  
        },
        async getData() {  // this method's function is to fill-in data table for HR view
            const fetchData = await getDocs(employees);
            this.users = [];
            fetchData.forEach((user) => {
              let userId = user.data();
              userId.id = user.id;
              this.users.push(userId);
            })
            //console.log('HR dataTable:',this.users);   
        },
             
    }
});