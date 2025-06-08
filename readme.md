# 🔥 Firebase Cloud Functions Demo

This project demonstrates how to set up and deploy Firebase Cloud Functions using Firebase CLI. It includes basic configuration for Authentication, Firestore, and Storage.

---
## 🔥 Deployed Link
[Firebase Cloud Functions Demo](https://thought-meter-2.web.app)

## 🛠️ Setup Instructions

### 1. Create a Firebase Project

* Go to the [Firebase Console](https://console.firebase.google.com/)
* Click **"Add Project"** and follow the prompts

---

### 2. Enable Email/Password Authentication

* Navigate to: **Firebase Console > Your Project > Authentication > Sign-in method**
* Enable **Email/Password**

---

### 3. Create Firestore Database

* Go to: **Firebase Console > Firestore Database**
* Click **"Create Database"**
* Select **Start in test mode** (or production if required)
* Choose the **nearest region**

---

### 4. Set Up Cloud Storage

* Navigate to: **Firebase Console > Storage**
* Click **"Get Started"**
* Choose the **nearest region** and create the storage bucket

---

### 5. Link Firebase Project to Local Project

In your terminal:

```bash
firebase use --add
```

* Select your Firebase project
* Choose an alias (e.g., `default`, `dev`, `prod`)

---

### 6. Use Project Alias (Optional)

```bash
firebase use <project-alias>
```

---

### 7. Deploy to Firebase

```bash
firebase deploy
```

---

## ▶️ Run Locally with Emulator

Use Firebase Emulator Suite to run functions locally:

```bash
firebase emulators:start
```

---

## ✅ Requirements

* Node.js v18+
* Firebase CLI
* Google account with Firebase access

---

## 📚 References

* [Firebase Documentation](https://firebase.google.com/docs)
* [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite)

---