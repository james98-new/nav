import React from 'react';
import { Bookmark } from '../types';

interface BookmarkCardProps {
  bookmark: Bookmark;
  isAdmin: boolean;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (id: string) => void;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow bookmark-card">
      <h3 className="font-semibold text-gray-800">{bookmark.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{bookmark.description}</p>
      <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm mt-2 block">
        访问
      </a>
      {isAdmin && (
        <div className="mt-2 flex gap-2">
          <button onClick={() => onEdit(bookmark)} className="text-sm text-blue-600">编辑</button>
          <button onClick={() => onDelete(bookmark.id)} className="text-sm text-red-600">删除</button>
        </div>
      )}
    </div>
  );
};

export default BookmarkCard;
