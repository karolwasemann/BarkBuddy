import { get, ref, set, update } from 'firebase/database';
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
  friends?: string[];
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


export const addFriend = async (userId: string, friendId: string): Promise<void> => {
  const userFriendsRef = ref(db, `users/${userId}/friends`);
  const friendFriendsRef = ref(db, `users/${friendId}/friends`);

  try {
    // Retrieve current user's friends list
    const userFriendsSnapshot = await get(userFriendsRef);
    let userFriends = userFriendsSnapshot.exists() ? userFriendsSnapshot.val() : [];

    // Retrieve friend's friends list
    const friendFriendsSnapshot = await get(friendFriendsRef);
    let friendFriends = friendFriendsSnapshot.exists() ? friendFriendsSnapshot.val() : [];

    // Check if already friends (optional step)
    if (userFriends.includes(friendId) && friendFriends.includes(userId)) {
      console.log('These users are already friends.');
      return;
    }

    // Add friend ID to user's friends list
    if (Array.isArray(userFriends)) {
      userFriends.push(friendId);
    } else {
      userFriends = [friendId]; // Initialize as an array with the friendId
    }

    // Add user ID to friend's friends list
    if (Array.isArray(friendFriends)) {
      friendFriends.push(userId);
    } else {
      friendFriends = [userId]; // Initialize as an array with the userId
    }

    // Set the updated friends list in the database
    await set(userFriendsRef, userFriends);
    await set(friendFriendsRef, friendFriends);

    console.log('Friend added successfully');
  } catch (error) {
    console.error('Error adding friend:', error);
  }
};