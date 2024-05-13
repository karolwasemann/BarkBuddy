import { firestore } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where, orderBy, setDoc, doc, Timestamp, updateDoc, getDoc } from "firebase/firestore";
import { getUserData } from './user';

// Function to get a user's conversations
export const getUserConversations = async (userId: string) => {
  const q = query(collection(firestore, "conversations"), where("participants", "array-contains", userId));
  const querySnapshot = await getDocs(q);
  console.log("🚀 ~ getUserConversations ~ querySnapshot:", querySnapshot)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to send a message
export const sendMessage = async (
  conversationId: string, 
  senderId: string,
  text: string
) => {
  const messagesRef = collection(firestore, "conversations", conversationId, "messages");
  const conversationRef = doc(firestore, "conversations", conversationId);

  try {
    // Check if the conversation document exists
    const docSnap = await getDoc(conversationRef);
    const buddyId = conversationId.split("-").filter(id => id !== senderId)[0]

    if (!docSnap.exists()) {
      // Create the conversation document with initial values if it does not exist
      await setDoc(conversationRef, {
        participants: [senderId, buddyId], 
        lastMessage: text,
        lastMessageSender: senderId,
        lastMessageTime: Timestamp.now(),
        
      });
    }

    // Add the new message to the 'messages' subcollection
    const docRef = await addDoc(messagesRef, {
      senderId,
      text,
      timestamp: Timestamp.now(), 
      read: false
    });

    // Update the conversation document with the latest message details
    await setDoc(conversationRef, {
      lastMessage: text,
      lastMessageSender: senderId,
      lastMessageTime: Timestamp.now()
    }, { merge: true });

    console.log("Message sent with ID: ", docRef.id);
  } catch (error) {
    console.error("Error sending message: ", error);
    throw error;
  }
};

// Function to read messages from a conversation
export const readMessages = async (conversationId: string) => {
  const messagesRef = collection(firestore, "conversations", conversationId, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc")); 
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    senderId: doc.data().senderId,  
    text: doc.data().text,         
    timestamp: doc.data().timestamp 
  }));
};
