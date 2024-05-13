// Types.ts
export interface Message {
  senderId: string;
  receiverId: string;
  messageText: string;
  timestamp: number;
}
export interface ConversationParticipant {
    userId: string;         // Unique identifier for the user
    photoURL: string;       // URL to the user's profile picture
    displayName: string;    // Display name of the user
}

export interface Conversation {
    id: string;                      // Unique identifier for the conversation
    title?: string;                  // Title of the conversation, if applicable (e.g., for groups)
    participants: ConversationParticipant[];  // List of participants in the conversation
    lastMessage?: Message;           // The last message sent in this conversation
    lastUpdated: number;             // Unix timestamp of the last update in the conversation
    unreadCount: number;             // Number of unread messages for the current user
    isGroup: boolean;                // Flag to indicate if it's a group conversation
}
