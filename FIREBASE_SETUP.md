# Firebase Authentication Setup Guide

## Overview
This guide will help you set up Firebase Authentication for the Global VIP Numbers login system.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: "Global VIP Numbers" (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project dashboard, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:

### Email/Password Authentication
1. Click on "Email/Password"
2. Toggle "Enable" to ON
3. Click "Save"

### Google Authentication
1. Click on "Google"
2. Toggle "Enable" to ON
3. Select your project support email
4. Click "Save"

## Step 3: Get Firebase Configuration

1. In your Firebase project dashboard, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click "Add app" and select the web icon (</>)
5. Register your app with a nickname (e.g., "Global VIP Numbers Web")
6. Copy the Firebase configuration object

## Step 4: Update Configuration in Code

Open `login-script.js` and replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-actual-app-id"
};
```

## Step 5: Configure Authorized Domains

1. In Firebase Console, go to Authentication > Settings
2. Scroll down to "Authorized domains"
3. Add your domain(s):
   - `localhost` (for local development)
   - Your production domain (e.g., `yourdomain.com`)

## Step 6: Test the Setup

1. Open `login.html` in your browser
2. Try the Google login button
3. Try creating an account with email/password
4. Test the logout functionality

## Security Rules (Optional)

For additional security, you can set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/unauthorized-domain)"**
   - Solution: Add your domain to authorized domains in Firebase Console

2. **"Firebase: Error (auth/popup-closed-by-user)"**
   - Solution: This is normal user behavior when they close the popup

3. **"Firebase: Error (auth/network-request-failed)"**
   - Solution: Check your internet connection and Firebase project status

4. **Google Sign-in not working**
   - Solution: Ensure Google provider is enabled and OAuth consent screen is configured

### Development vs Production:

- **Development**: Use `localhost` in authorized domains
- **Production**: Add your actual domain and ensure HTTPS is enabled

## Environment Variables (Recommended)

For production, consider using environment variables:

```javascript
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};
```

## Additional Features

### User Management
- Users can be managed in Firebase Console > Authentication > Users
- You can manually add/remove users, reset passwords, etc.

### Analytics
- Firebase provides built-in analytics for user authentication events
- View in Firebase Console > Analytics

### Custom Claims
- For advanced user roles, you can use Firebase Custom Claims
- Requires Firebase Admin SDK on your backend

## Support

For more help:
- [Firebase Documentation](https://firebase.google.com/docs/auth)
- [Firebase Support](https://firebase.google.com/support)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase-authentication)

