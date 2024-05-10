import { get, ref, set } from 'firebase/database';
import { db } from '../firebaseConfig';
export type UserProfile = {
  displayName?: string;
  birthday?: Date;
  city?: string;
  desc?: string;
  breed?: string;
  gender?: 'femail' | 'male';
} | null;
export const updateUserData = async (userId:string, userData:UserProfile) => {
  try {
    await set(ref(db, 'users/' + userId), userData);
    console.log('User data added to Realtime Database');
  } catch (error) {
    console.error('Error adding user data to Realtime Database:', error);
  }
};

export const getUserData = async (userId:string):Promise<UserProfile> => {
      try {
          const userRef = ref(db, `users/${userId}`);
          const snapshot = await get(userRef);
          
          if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log('User data:', userData);
            return userData;
          } else {
            console.log('No data available for the user');
            return null;
          }
        } catch (error) {
          console.error('Error getting user data:', error);
          return null;
        }
}