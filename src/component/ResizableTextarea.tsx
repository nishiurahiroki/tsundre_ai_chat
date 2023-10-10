import React, { useRef, useEffect, TextareaHTMLAttributes } from 'react';

type ResizableTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const ResizableTextarea: React.FC<ResizableTextareaProps> = (props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = '28px';
      if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.addEventListener('input', handleTextareaChange);
    }
    return () => {
      if (textareaRef.current) {
        textareaRef.current.removeEventListener('input', handleTextareaChange);
      }
    };
  }, []);

  return <textarea ref={textareaRef} {...props} />;
};

export default ResizableTextarea;
