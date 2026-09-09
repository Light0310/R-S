import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

let config;
try {
  const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
  config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
} catch (e) {
  console.error('Failed to load firebase-applet-config.json', e);
}

const firebaseConfig = {
  apiKey: config?.apiKey,
  authDomain: config?.authDomain,
  projectId: config?.projectId,
  storageBucket: config?.storageBucket,
  messagingSenderId: config?.messagingSenderId,
  appId: config?.appId
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app, config?.firestoreDatabaseId);
