// Firebase Authentication setup para substituir Supabase Auth
// Instalar: npm install firebase

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

// Configuração do Firebase (substitua pelas suas credenciais)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Funções de autenticação compatíveis com Supabase
export const firebaseAuth = {
  // Registro de usuário
  signUp: async (email, password, metadata = {}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Atualizar perfil com metadados
      if (metadata.full_name) {
        await updateProfile(user, { displayName: metadata.full_name });
      }
      
      // Criar perfil no banco de dados
      await createUserProfile(user, metadata);
      
      return { user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  },

  // Login
  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  },

  // Logout
  signOut: async () => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Observar mudanças de autenticação
  onAuthStateChange: (callback) => {
    return onAuthStateChanged(auth, (user) => {
      callback('SIGNED_IN', { user });
    });
  },

  // Obter sessão atual
  getSession: async () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve({ 
          data: { 
            session: user ? { user } : null 
          } 
        });
      });
    });
  }
};

// Função para criar perfil do usuário no banco Cloud SQL
async function createUserProfile(user, metadata) {
  try {
    // Aqui você faria a inserção no Cloud SQL
    const response = await fetch('/api/create-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await user.getIdToken()}`
      },
      body: JSON.stringify({
        id: user.uid,
        email: user.email,
        full_name: metadata.full_name,
        user_type: metadata.type || 'patient'
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create user profile');
    }
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

// Middleware para validar token Firebase
export const validateFirebaseToken = async (token) => {
  try {
    const response = await fetch('/api/validate-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      const userData = await response.json();
      return userData;
    }
    
    return null;
  } catch (error) {
    console.error('Error validating token:', error);
    return null;
  }
};