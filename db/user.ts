import { get, ref, set } from 'firebase/database';
import { db } from '../firebaseConfig';
export type UserProfile = {
  uid?: string;
  name?: string;
  birthday?: Date;
  city?: string;
  desc?: string;
  breed?: string;
  gender?: 'femail' | 'male';
  photoURL?: string | null;
  email?: string | null;
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
            return userData;
          } else {
            console.error('No data available for the user');
            return null;
          }
        } catch (error) {
          console.error('Error getting user data:', error);
          return null;
        }
}

export const getAllUsersData = async (): Promise<UserProfile[]> => {
  try {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const userDataArray: UserProfile[] = [];
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        userDataArray.push(userData);
      });
      return userDataArray;
    } else {
      console.log('No data available for any users');
      return [];
    }
  } catch (error) {
    console.error('Error getting all users data:', error);
    return [];
  }
};