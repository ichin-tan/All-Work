import { auth, db } from '../config/Config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import {
    doc,
    setDoc,
    getDoc,
    updateDoc
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthService = {
    async signUp(email, password, name) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userData = {
                uid: user.uid,
                name: name,
                email: user.email,
                favorites: [],
            };

            await setDoc(doc(db, 'users', user.uid), userData);
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            throw error;
        }
    },

    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = {
                    uid: user.uid,
                    ...userDoc.data()
                };
                await AsyncStorage.setItem('user', JSON.stringify(userData));
                return userData;
            }
            throw new Error('User data not found');
        } catch (error) {
            throw error;
        }
    },

    async logout() {
        try {
            await signOut(auth);
            await AsyncStorage.removeItem('user');
        } catch (error) {
            throw error;
        }
    },

    async getCurrentUser() {
        try {
            const userJson = await AsyncStorage.getItem('user');
            return userJson ? JSON.parse(userJson) : null;
        } catch (error) {
            throw error;
        }
    }
};

export const UserService = {
    async updateProfile(uid, name) {
        try {
            await updateDoc(doc(db, 'users', uid), { name });
            const userJson = await AsyncStorage.getItem('user');
            if (userJson) {
                const userData = JSON.parse(userJson);
                const updatedUser = { ...userData, name };
                await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
                return updatedUser;
            }
        } catch (error) {
            throw error;
        }
    },

    async getFavorites(uid) {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                return userDoc.data().favorites || [];
            }
            return [];
        } catch (error) {
            throw error;
        }
    },

    async addFavorite(uid, cityName) {
        try {
            const userRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userRef);
            const currentFavorites = userDoc.data().favorites || [];

            if (!currentFavorites.includes(cityName)) {
                const updatedFavorites = [...currentFavorites, cityName];
                await updateDoc(userRef, { favorites: updatedFavorites });
                return updatedFavorites;
            }
            return currentFavorites;
        } catch (error) {
            throw error;
        }
    },

    async removeFavorite(uid, cityName) {
        try {
            const userRef = doc(db, 'users', uid);
            const updatedFavorites = (await this.getFavorites(uid)).filter(fav => fav !== cityName);
            await updateDoc(userRef, { favorites: updatedFavorites });
            return updatedFavorites;
        } catch (error) {
            throw error;
        }
    }
};