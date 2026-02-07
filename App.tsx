
import React, { useState, useEffect, useMemo } from 'react';
import SearchBox from './components/SearchBox';
import BookmarkCard from './components/BookmarkCard';
import AdminModal from './components/AdminModal';
import { Bookmark, Category } from './types';
import { INITIAL_BOOKMARKS, INITIAL_CATEGORIES, ADMIN_PASSWORD } from './constants';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'edit' | 'add' | null>(null);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : INITIAL_BOOKMARKS;
  });
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const filteredBookmarks = useMemo(() => {
    if (activeCategoryId === 'all') return bookmarks;
    return bookmarks.filter(b => b.categoryId === activeCategoryId);
  }, [bookmarks, activeCategoryId]);

  const handleLogin = (password: string) => {
    // 验证逻辑使用常量中的密码
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setModalMode(null);
    } else {
      alert('密码错误');
    }
  };

  const handleAddOrEdit = (data: Partial<Bookmark>) => {
    if (modalMode === 'add') {
      const newBookmark: Bookmark = {
        ...data as Bookmark,
        id: Date.now().toString()
      };
      setBookmarks([...bookmarks, newBookmark]);
    } else if (modalMode === 'edit' && editingBookmark) {
      setBookmarks(bookmarks.map(b => b.id === editingBookmark.id ? { ...b, ...data } : b));
    }
    setModalMode(null);
    setEditingBookmark(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定删除此网址吗？')) {
      setBookmarks(bookmarks.filter(b => b.id !== id));
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-blue-50">
      {/* Header & Search */}
      <header className="pt-16 pb-8 px-4 bg-gradient-to-b from-blue-100 to-transparent">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 rotate-3">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h1 className="text-3xl font-black text-blue-900 tracking-tight">CloudNav</h1>
          </div>
          
          <SearchBox onSearch={() => {}} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Admin Bar */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              onClick={() => setActiveCategoryId('all')}
              className={`whitespace-nowrap px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategoryId === 'all' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              全部网址
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`whitespace-nowrap px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2 ${
                  activeCategoryId === cat.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="flex space-x-3">
            {!isAdmin ? (
              <button 
                onClick={() => setModalMode('login')}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                <span>管理登入</span>
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setModalMode('add')}
                  className="px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-bold hover:bg-green-600 transition-all flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  <span>添加网址</span>
                </button>
                <button 
                  onClick={() => setIsAdmin(false)}
                  className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition-all flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  <span>退出</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Grid: 6 columns on large screens */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredBookmarks.map(bookmark => (
            <BookmarkCard 
              key={bookmark.id} 
              bookmark={bookmark} 
              isAdmin={isAdmin}
              onEdit={(b) => {
                setEditingBookmark(b);
                setModalMode('edit');
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-blue-100 text-center text-blue-400 text-xs">
        <p>© 2024 CloudNav. Cloudflare Ready.</p>
        <p className="mt-1">优质网址，一触即达</p>
      </footer>

      {/* Modals */}
      {modalMode && (
        <AdminModal 
          mode={modalMode} 
          initialData={editingBookmark || {}}
          categories={categories}
          onClose={() => { setModalMode(null); setEditingBookmark(null); }}
          onSubmit={modalMode === 'login' ? handleLogin : handleAddOrEdit}
        />
      )}
    </div>
  );
};

export default App;
