import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useRoute } from 'vue-router';


const firebaseConfig = {
    apiKey: "AIzaSyCJGEW-0MofgYgEdAWdXW6YoOB_o3J8JwI",
    authDomain: "medisure-crud.firebaseapp.com",
    projectId: "medisure-crud",
    storageBucket: "medisure-crud.appspot.com",
    messagingSenderId: "943820419606",
    appId: "1:943820419606:web:70bcae12737b605be67b37"
  };
const app = initializeApp(firebaseConfig);

// get db
 const db = getFirestore(app);
 const auth = getAuth(app);

// initialize services
export const employees = collection(db,"users");


// To initialize user state, whether auth or not  
export const getUserState = () =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(auth, resolve, reject)
  )

export const getUser = async id => {
  const user = await employees.doc(id).get();
  return user.exists ? user.data() : null
}

// for updating employee details
// export const getUsers =  (id) => {
//   const user =  employees.doc(id).get();
//   return user.exists ? user.data : null;
// }



// export const useAuthState = () => {
//   const user = ref(null)
//   const error = ref(null)

 
//   let unsubscribe
//   onMounted(() => {
//     unsubscribe = onAuthStateChanged(
//       auth,
//       u => (user.value = u),
//       e => (error.value = e)
//     )
//   })
//   onUnmounted(() => unsubscribe())

//   const isAuthenticated = computed(() => user.value != null)

//   return { user, error, isAuthenticated }
// }

// export const useLoadUsers = () => {
//   const users = ref([])
//   const close = employees.onSnapshot(snapshot => {
//     users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}))
//   })
//   onUnmounted(close)
//   return users
// }
 