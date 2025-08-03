import React, { useState, useRef, useEffect } from 'react';
import { FiBold } from 'react-icons/fi';

const RichTextEditor = ({ value, onChange, placeholder, className = "" }) => {
  const [isBold, setIsBold] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = value || '';
      // Auto-resize on value change
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.max(textareaRef.current.scrollHeight, 80) + 'px';
    }
  }, [value]);

  const handleInput = () => {
    if (onChange) {
      onChange(textareaRef.current.value);
    }
    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.max(textareaRef.current.scrollHeight, 80) + 'px';
    }
  };

  const toggleBold = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const text = textareaRef.current.value;
      
      const beforeText = text.substring(0, start);
      const selectedText = text.substring(start, end);
      const afterText = text.substring(end);
      
      const newText = beforeText + '**' + selectedText + '**' + afterText;
      textareaRef.current.value = newText;
      
      // Update the value
      onChange(newText);
      
      // Restore cursor position
      textareaRef.current.setSelectionRange(start + 2, end + 2);
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          toggleBold();
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className={`border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <button
          type="button"
          onClick={toggleBold}
          className={`p-1 rounded ${
            isBold 
              ? 'bg-primary-100 text-primary-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
          title="Bold (Ctrl+B)"
        >
          <FiBold className="w-4 h-4" />
        </button>
        <div className="text-xs text-gray-500 ml-2">
          Use Ctrl+B or click the bold button to format text with **bold** markers
        </div>
      </div>
      
      {/* Editor */}
      <textarea
        ref={textareaRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="p-3 text-sm text-gray-700 focus:outline-none break-words whitespace-pre-wrap resize-none w-full border-0"
        style={{ 
          fontFamily: 'inherit',
          lineHeight: '1.5',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          minHeight: '80px'
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor; 