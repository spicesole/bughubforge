'use client';

import { useState } from 'react';
import { auth, User } from '@/utils/auth';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  translations: {
    profile: string;
    close: string;
    username: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    save: string;
    cancel: string;
    profileUpdated: string;
    passwordChanged: string;
    emailConfirmed: string;
    errorUpdating: string;
    passwordMismatch: string;
    passwordMinLength: string;
    currentPasswordRequired: string;
    newPasswordRequired: string;
    confirmPasswordRequired: string;
    emailConfirmation: string;
    confirmEmail: string;
    emailConfirmationSent: string;
    changePassword: string;
    confirmEmailForRecovery: string;
    edit: string;
    clickToEdit: string;
  };
}

export default function ProfileModal({ isOpen, onClose, currentUser, translations }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isConfirmingEmail, setIsConfirmingEmail] = useState(false);
  
  const [editUsername, setEditUsername] = useState(currentUser?.username || '');
  const [editEmail, setEditEmail] = useState(currentUser?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [emailConfirmationCode, setEmailConfirmationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen || !currentUser) return null;

  const validatePasswordChange = () => {
    const newErrors: Record<string, string> = {};

    if (!currentPassword) {
      newErrors.currentPassword = translations.currentPasswordRequired;
    }

    if (!newPassword) {
      newErrors.newPassword = translations.newPasswordRequired;
    } else if (newPassword.length < 6) {
      newErrors.newPassword = translations.passwordMinLength;
    }

    if (!confirmNewPassword) {
      newErrors.confirmNewPassword = translations.confirmPasswordRequired;
    } else if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = translations.passwordMismatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = () => {
    if (!editUsername.trim()) return;

    try {
      const updatedUser = { ...currentUser, username: editUsername.trim() };
      const authData = { user: updatedUser, token: 'demo-token' };
      localStorage.setItem('auth', JSON.stringify(authData));
      
      setSuccessMessage(translations.profileUpdated);
      setIsEditing(false);
      
      // Перезагружаем страницу для обновления данных
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setErrors({ general: translations.errorUpdating });
    }
  };

  const handleChangePassword = () => {
    if (!validatePasswordChange()) return;

    try {
      // В реальном приложении здесь был бы API запрос
      setSuccessMessage(translations.passwordChanged);
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setErrors({});
    } catch (error) {
      setErrors({ general: translations.errorUpdating });
    }
  };

  const handleConfirmEmail = () => {
    if (!emailConfirmationCode.trim()) {
      setErrors({ emailConfirmation: 'Введите код подтверждения' });
      return;
    }

    if (emailConfirmationCode.trim() !== generatedCode) {
      setErrors({ emailConfirmation: 'Неверный код подтверждения' });
      return;
    }

    try {
      // В реальном приложении здесь был бы API запрос
      setSuccessMessage(translations.emailConfirmed);
      setIsConfirmingEmail(false);
      setEmailConfirmationCode('');
      setGeneratedCode('');
      setErrors({});
    } catch (error) {
      setErrors({ general: translations.errorUpdating });
    }
  };

  const sendEmailConfirmation = () => {
    try {
      // Генерируем демонстрационный код (6 цифр)
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      
      setSuccessMessage(`${translations.emailConfirmationSent} (Демо код: ${code})`);
      setIsConfirmingEmail(true);
      setErrors({});
    } catch (error) {
      setErrors({ general: translations.errorUpdating });
    }
  };

  const clearMessages = () => {
    setErrors({});
    setSuccessMessage('');
    setGeneratedCode('');
  };

  const resetProfileForm = () => {
    setEditUsername(currentUser?.username || '');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setEmailConfirmationCode('');
    setGeneratedCode('');
    
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {translations.profile}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label={translations.close}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {successMessage && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3 mb-4">
            <p className="text-green-600 dark:text-green-400 text-sm">{successMessage}</p>
          </div>
        )}

        {errors.general && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 mb-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{errors.general}</p>
          </div>
        )}

        {/* Основная информация */}
        <div className="space-y-4 mb-6">
          {isEditing ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {translations.username}
                </label>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <button onClick={handleSaveProfile} className="btn-primary text-sm px-4 py-2">
                  {translations.save}
                </button>
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setEditUsername(currentUser.username);
                    clearMessages();
                  }} 
                  className="btn-secondary text-sm px-4 py-2"
                >
                  {translations.cancel}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div 
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition-colors"
                onClick={() => {
                  setIsEditing(true);
                  clearMessages();
                }}
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{translations.username}:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{currentUser.username}</span>
                <span className="ml-2 text-xs text-gray-500">({translations.clickToEdit})</span>
              </div>
              <div className="p-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{translations.email}:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{currentUser.email}</span>
              </div>
            </div>
          )}
        </div>

        {/* Смена пароля */}
        <div className="space-y-4 mb-6">
          {isChangingPassword ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {translations.currentPassword}
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                    errors.currentPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {translations.newPassword}
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {translations.confirmNewPassword}
                </label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                    errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.confirmNewPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmNewPassword}</p>}
              </div>
              <div className="flex space-x-2">
                <button onClick={handleChangePassword} className="btn-primary text-sm px-4 py-2">
                  {translations.save}
                </button>
                <button 
                  onClick={() => {
                    setIsChangingPassword(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                    clearMessages();
                  }} 
                  className="btn-secondary text-sm px-4 py-2"
                >
                  {translations.cancel}
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => {
                setIsChangingPassword(true);
                clearMessages();
              }}
              className="btn-secondary text-sm px-4 py-2"
            >
              {translations.changePassword}
            </button>
          )}
        </div>

        {/* Подтверждение email */}
        <div className="space-y-4">
          {isConfirmingEmail ? (
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  <strong>Демо-версия:</strong> Код подтверждения показан в сообщении выше.
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-xs mt-1">
                  В реальном приложении код был бы отправлен на {currentUser.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {translations.emailConfirmation}
                </label>
                <input
                  type="text"
                  value={emailConfirmationCode}
                  onChange={(e) => setEmailConfirmationCode(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                    errors.emailConfirmation ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Введите код"
                />
                {errors.emailConfirmation && <p className="text-red-500 text-xs mt-1">{errors.emailConfirmation}</p>}
              </div>
              <div className="flex space-x-2">
                <button onClick={handleConfirmEmail} className="btn-primary text-sm px-4 py-2">
                  {translations.confirmEmail}
                </button>
                <button 
                  onClick={() => {
                    setIsConfirmingEmail(false);
                    setEmailConfirmationCode('');
                    clearMessages();
                  }} 
                  className="btn-secondary text-sm px-4 py-2"
                >
                  {translations.cancel}
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={sendEmailConfirmation}
              className="btn-secondary text-sm px-4 py-2"
            >
              {translations.confirmEmail}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 