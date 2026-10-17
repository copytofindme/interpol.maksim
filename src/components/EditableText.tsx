import React, { useEffect, useRef } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  isEditing: boolean;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  tag?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3';
  asLink?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  isEditing,
  className = '',
  multiline = false,
  placeholder = 'Нажмите для ввода',
  tag: Tag = 'span',
  asLink = false,
}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (elementRef.current && elementRef.current.innerText !== value) {
      // update text if changed externally without breaking cursor
      if (document.activeElement !== elementRef.current) {
        elementRef.current.innerText = value;
      }
    }
  }, [value]);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const text = e.currentTarget.innerText;
    onChange(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const linkStyle = asLink ? 'notice-link-blue' : '';

  if (!isEditing) {
    return (
      <Tag className={`${className} ${linkStyle}`}>
        {value || <span className="opacity-40 italic">{placeholder}</span>}
      </Tag>
    );
  }

  return (
    <Tag
      ref={elementRef as unknown as React.RefObject<any>}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      title="Нажмите для редактирования"
      className={`editable-field cursor-text px-0.5 py-0.2 min-w-[20px] inline-block ${className} ${linkStyle}`}
      style={{ minHeight: '1em' }}
    >
      {value}
    </Tag>
  );
};
