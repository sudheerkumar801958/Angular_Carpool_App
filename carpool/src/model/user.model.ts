// user.model.ts
export interface User {
    id: string;         // Unique identifier for the user
    name: string;       // User's full name
    email: string;      // User's email address
    userType: 'offer' | 'grab';  // 'offer' for offer ride users and 'grab' for grab ride users
    phoneNumber?: string;  // Optional phone number
    location?: string;     // Optional user location
  }
  