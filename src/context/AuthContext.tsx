import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as fbSignOut,
  signInAnonymously
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';
import { UserProfile } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOut: () => Promise<void>;
  updateAddress: (address: UserProfile['savedAddress']) => Promise<void>;
  togglePushPreference: (enabled: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            setUserProfile(snap.data() as UserProfile);
          } else {
            const initialProfile: UserProfile = {
              uid: user.uid,
              email: user.email || `guest_${user.uid.slice(0, 6)}@gifticlub.mx`,
              displayName: user.displayName || (user.isAnonymous ? 'Invitado Gifti' : 'Amigo Gifti'),
              photoURL: user.photoURL || undefined,
              pushEnabled: true,
              savedAddress: {
                street: 'Av. Insurgentes Sur 1602',
                colonia: 'Crédito Constructor',
                city: 'Benito Juárez',
                state: 'CDMX',
                postalCode: '03940'
              }
            };
            await setDoc(userDocRef, {
              ...initialProfile,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
            setUserProfile(initialProfile);
          }
        } catch (error) {
          console.warn('Could not load user profile from Firestore:', error);
          // Fallback profile if offline
          setUserProfile({
            uid: user.uid,
            email: user.email || 'cliente@gifticlub.mx',
            displayName: user.displayName || 'Cliente Gifti',
            photoURL: user.photoURL || undefined,
            pushEnabled: true
          });
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Google Sign In Error:', error);
      // If popup blocked or cancelled, let the user know cleanly
      if (error?.code === 'auth/popup-blocked') {
        alert('Por favor habilita las ventanas emergentes en tu navegador para iniciar sesión con Google.');
      }
      throw error;
    }
  };

  const signInAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error('Guest Sign In Error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  const updateAddress = async (address: UserProfile['savedAddress']) => {
    if (!currentUser) return;
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await setDoc(userDocRef, {
        savedAddress: address,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setUserProfile(prev => prev ? { ...prev, savedAddress: address } : null);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${currentUser.uid}`);
    }
  };

  const togglePushPreference = async (enabled: boolean) => {
    if (!currentUser) return;
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await setDoc(userDocRef, {
        pushEnabled: enabled,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setUserProfile(prev => prev ? { ...prev, pushEnabled: enabled } : null);
    } catch (error) {
      console.warn('Could not update push preference in Firestore:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        signInWithGoogle,
        signInAsGuest,
        signOut,
        updateAddress,
        togglePushPreference
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
