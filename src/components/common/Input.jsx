// 通用输入框组件 - 暖色调设计
export const Input = ({ label, className = '', ...props }) => {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 transition-all duration-300 ${className}`}
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'white',
          fontSize: '15px',
          transition: 'all 0.3s ease'
        }}
        {...props}
      />
    </div>
  );
};

// 通用文本域组件 - 暖色调设计
export const Textarea = ({ label, className = '', ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 transition-all duration-300 resize-y ${className}`}
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'white',
          fontSize: '15px',
          transition: 'all 0.3s ease'
        }}
        rows={4}
        {...props}
      />
    </div>
  );
};
