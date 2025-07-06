export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
}

export interface AuthData {
  user: User;
  token: string;
}

// Симуляция базы данных пользователей
const users: User[] = [];

export const auth = {
  // Регистрация
  register: async (username: string, email: string, password: string): Promise<AuthData> => {
    // Проверяем, не существует ли уже пользователь с таким email или username
    const existingUserByEmail = users.find(user => user.email === email);
    if (existingUserByEmail) {
      throw new Error('User with this email already exists');
    }

    const existingUserByUsername = users.find(user => user.username === username);
    if (existingUserByUsername) {
      throw new Error('User with this username already exists');
    }

    // Создаем нового пользователя
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      name: username
    };

    users.push(newUser);

    // Создаем токен (в реальном приложении это должен быть JWT)
    const token = btoa(JSON.stringify({ userId: newUser.id, timestamp: Date.now() }));

    const authData: AuthData = { user: newUser, token };
    
    // Сохраняем в localStorage
    localStorage.setItem('auth', JSON.stringify(authData));
    
    return authData;
  },

  // Вход
  login: async (identifier: string, password: string): Promise<AuthData> => {
    // Ищем пользователя по email или username
    const user = users.find(u => u.email === identifier || u.username === identifier);
    if (!user) {
      throw new Error('User not found');
    }

    // В реальном приложении здесь должна быть проверка пароля
    // Для демонстрации просто создаем токен
    const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));

    const authData: AuthData = { user, token };
    
    // Сохраняем в localStorage
    localStorage.setItem('auth', JSON.stringify(authData));
    
    return authData;
  },

  // Выход
  logout: (): void => {
    localStorage.removeItem('auth');
  },

  // Получение текущего пользователя
  getCurrentUser: (): User | null => {
    const authData = localStorage.getItem('auth');
    if (!authData) return null;

    try {
      const parsed: AuthData = JSON.parse(authData);
      return parsed.user;
    } catch {
      return null;
    }
  },

  // Проверка авторизации
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth');
  }
}; 