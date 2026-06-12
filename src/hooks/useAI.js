import { useState } from 'react';
import { aiService } from '../services/aiService';

// AI Hook
export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 生成模块内容
  const generateModule = async (moduleType, inputData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await aiService.generateModule(moduleType, inputData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 优化简历
  const optimizeResume = async (resumeText) => {
    setLoading(true);
    setError(null);
    try {
      const result = await aiService.optimizeResume(resumeText);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 配置 API
  const setApiKey = (provider, apiKey) => {
    aiService.setApiKey(provider, apiKey);
  };

  // 获取配置
  const getConfig = () => {
    return aiService.getConfig();
  };

  return {
    loading,
    error,
    generateModule,
    optimizeResume,
    setApiKey,
    getConfig,
  };
};
