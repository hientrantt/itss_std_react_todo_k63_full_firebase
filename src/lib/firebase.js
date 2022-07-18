import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { useState, useEffect } from 'react';
import { async } from '@firebase/util';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjlzSqBUKiPit4tOb5XvW1xnd_NORmrHE",
  authDomain: "fir-sample-16ac1.firebaseapp.com",
  projectId: "fir-sample-16ac1",
  storageBucket: "fir-sample-16ac1.appspot.com",
  messagingSenderId: "512462420994",
  appId: "1:512462420994:web:2a6fe67efc2db45e8c3b1b"
};

const app = firebase.initializeApp(firebaseConfig);

const useFirebase = ()=>{
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);
  useEffect(async () => {
    if(!mounted){
      getItems();
      setMounted(true);
    }

  });

  const getItems = async  () => {
    const snapshot = await firebase.firestore().collection("todos").get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    ) ?? [];
    setItems(items);
    return items;
  }


  const addItems = async (newItem)=>{
    await firebase.firestore().collection("todos").add(newItem)
    .then(res => {
      const newItems = [...items];
      newItems.push({...newItem, id: res.id});
      setItems(newItems);
    })
    .catch(err => console.log(err));
  }

  const deleteItems = async () => {
    setItems([]);

    const idList = items.map((item)=> item.id);
    
    for(let id of idList) 
      await firebase.firestore().collection("todos").doc(id).delete();

  }

  const updateItems = async (itemUpdate)=>{
    await  firebase.firestore().collection("todos").doc(itemUpdate.id).update(itemUpdate)
    
    const newItems = items.filter((item) =>{
      return item = item.id == itemUpdate.id ? itemUpdate : item;
    });
    setItems(newItems)
  }

  return [items, getItems, addItems, updateItems, deleteItems];
}

export default useFirebase;

