import { db } from '../config/Config';
import { collection, addDoc, getDocs, deleteDoc, doc, writeBatch } from 'firebase/firestore';

const FAVORITE_COLLECTION = collection(db, 'favorites');

export const addFavorite = async (crypto) => {
    try {
        const docRef = await addDoc(FAVORITE_COLLECTION, {
            ...crypto,
        });
        console.log(docRef.id);

        return {
            ...crypto
        };
    } catch (error) {
        console.error('Error adding favorite:', error);
        throw error;
    }
};

export const getFavorites = async () => {
    try {
        const snapshot = await getDocs(FAVORITE_COLLECTION);
        return snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting favorites:', error);
        throw error;
    }
};

export const removeFavorite = async (firestoreId) => {
    console.log(firestoreId);

    try {
        await deleteDoc(doc(db, 'favorites', firestoreId));
    } catch (error) {
        console.error('Error removing favorite:', error);
        throw error;
    }
};

export const clearFavorites = async () => {
    try {
        const favorites = await getFavorites();
        const batch = writeBatch(db);

        favorites.forEach(fav => {
            const docRef = doc(db, 'favorites', fav.docId);
            batch.delete(docRef);
        });

        await batch.commit();
    } catch (error) {
        console.error('Error clearing favorites:', error);
        throw error;
    }
};
