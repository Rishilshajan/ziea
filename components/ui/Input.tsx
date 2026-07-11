import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightElement?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, rightElement, className = '', ...props }, ref) => {
    const isPassword = props.type === 'password';
    const passwordClasses = isPassword ? 'font-sans text-2xl tracking-[0.15em] placeholder:text-base placeholder:tracking-normal placeholder:font-jost' : '';
    
    const inputClasses = `w-full px-4 py-3 border border-outline-variant rounded-xl bg-white font-jost font-normal text-base text-on-surface transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 hover:border-primary/50 group-focus-within:translate-x-1 duration-200 ${passwordClasses} ${className}`;
    const labelClasses = "block font-jost font-medium text-sm text-on-surface-variant mb-2 ml-1";

    return (
      <div className="group relative w-full">
        {label && <label className={labelClasses}>{label}</label>}
        
        <div className="relative">
          <input ref={ref} className={inputClasses} {...props} />
          
          {rightElement && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
              {rightElement}
            </div>
          )}
        </div>

        {error && <p className="text-red-500 text-xs mt-1 font-jost ml-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
