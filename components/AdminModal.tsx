import React, { useState } from 'react';
import { Category } from '../types';

interface AdminModalProps {
  mode: 'login' | 'edit' | 'add';
  initialData: any;
  categories: Category[];
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ mode, initialData, categories, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(mode === 'login' ? formData.password : formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          {mode === 'login' ? '管理登入' : mode === 'add' ? '添加网址' : '编辑网址'}
        </h2>
        <form onSubmit={handleSubmit}>
          {mode === 'login' ? (
            <input
              type="password"
              placeholder="密码"
              className="w-full px-4 py-2 border rounded"
              onChange={(e) => setFormData({ password: e.target.value })}
            />
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="标题"
                value={formData.title || ''}
                className="w-full px-4 py-2 border rounded"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="URL"
                value={formData.url || ''}
                className="w-full px-4 py-2 border rounded"
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>
          )}
          <div className="flex gap-2 mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              确定
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
