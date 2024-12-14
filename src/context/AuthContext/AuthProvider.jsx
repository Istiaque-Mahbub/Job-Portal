import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from '../../firebase/firebase.init';


const AuthProvider = ({children}) => {
    const [user,setUser] =useState(null);
    const [loading,setLoading]=useState(true);
    const googleProvider = new GoogleAuthProvider
    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const userSignOut = () =>{
        setLoading(true);
        return signOut(auth)
    }
    const signInWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const authInfo = {
      loading,
      user,
      createUser,
      signInUser,
      userSignOut,
      signInWithGoogle,
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            setLoading(false);
        })
        return () =>{
            unsubscribe();
        }
    },[])
    return (
        <AuthContext.Provider value={authInfo}>
           {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;