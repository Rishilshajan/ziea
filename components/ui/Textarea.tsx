import React, { TextareaHTMLAttributes, forwardRef, useEffect, useRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', onChange, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    
    // Allow both the forwarded ref and our internal ref to work
    const setRefs = (element: HTMLTextAreaElement | null) => {
      internalRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.target.style.height = 'auto';
      e.target.style.height = `${Math.max(150, e.target.scrollHeight)}px`;
      if (onChange) {
        onChange(e);
      }
    };
    
    // Set initial height based on content on mount
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.style.height = 'auto';
        internalRef.current.style.height = `${Math.max(150, internalRef.current.scrollHeight)}px`;
      }
    }, [props.value]);

    const textareaClasses = `w-full px-4 py-3 bg-white border border-[#d6c3b3] rounded-xl font-jost font-normal text-base text-[#2C3829] transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 hover:border-primary/50 duration-200 resize-none overflow-hidden min-h-[150px] ${className}`;
    const labelClasses = "font-jost text-sm font-medium text-[#2C3829] mb-1 block ml-1";

    return (
      <div className="group relative w-full">
        {label && <label className={labelClasses}>{label}</label>}
        
        <div className="relative">
          <textarea 
            ref={setRefs} 
            className={textareaClasses} 
            onChange={handleInput}
            rows={4}
            {...props} 
          />
        </div>

        {error && <p className="text-red-500 text-xs mt-1 font-jost ml-1">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
