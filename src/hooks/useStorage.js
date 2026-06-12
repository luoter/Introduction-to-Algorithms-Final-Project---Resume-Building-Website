import { useState, useEffect } from 'react';

// 本地存储 Hook
export const useStorage = (key, initialValue) => {
  // 从 localStorage 读取初始值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`读取 localStorage 键 ${key} 失败:`, error);
      return initialValue;
    }
  });

  // 更新值时同步到 localStorage
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`保存到 localStorage 键 ${key} 失败:`, error);
    }
  };

  return [storedValue, setValue];
};

// 简历列表管理 Hook
export const useResumeStorage = () => {
  const [resumes, setResumes] = useStorage('resumes', []);

  const addResume = (resume) => {
    const newResume = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...resume,
    };
    setResumes(prev => [newResume, ...prev]);
    return newResume;
  };

  const updateResume = (id, data) => {
    setResumes(prev => prev.map(r => 
      r.id === id ? { ...r, ...data, updatedAt: new Date().toISOString() } : r
    ));
  };

  const deleteResume = (id) => {
    setResumes(prev => prev.filter(r => r.id !== id));
  };

  const getResume = (id) => resumes.find(r => r.id === id);

  return {
    resumes,
    addResume,
    updateResume,
    deleteResume,
    getResume,
  };
};
