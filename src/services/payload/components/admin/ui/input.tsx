'use client'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import './input.scss'

const inputVariants = cva(
  'input', // Base class for SCSS styling
  {
    variants: {
      variant: {
        default: 'input--default',
        error: 'input--error',
        readOnly: 'input--read-only',
      },
      size: {
        default: 'input--size-default',
        sm: 'input--size-sm',
        lg: 'input--size-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean
  // Additional props for enhanced functionality
  label?: string
  description?: string
  error?: string
  required?: boolean
  // RTL support
  rtl?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      label,
      description,
      error,
      required,
      rtl,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'input'

    // Determine the actual variant based on props
    const actualVariant = error ? 'error' : disabled ? 'readOnly' : variant

    const inputElement = (
      <Comp
        className={inputVariants({ variant: actualVariant, size, className })}
        ref={ref}
        disabled={disabled}
        data-rtl={rtl}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error
            ? `${props.id || 'input'}-error`
            : description
              ? `${props.id || 'input'}-description`
              : undefined
        }
        {...props}
      />
    )

    // If no label or description, return just the input
    if (!label && !description && !error) {
      return inputElement
    }

    // Return input with wrapper for label, description, and error
    return (
      <div className="input-field">
        {label && (
          <label htmlFor={props.id} className="input-field__label">
            {label}
            {required && <span className="input-field__required">*</span>}
          </label>
        )}
        {inputElement}
        {description && !error && (
          <div id={`${props.id || 'input'}-description`} className="input-field__description">
            {description}
          </div>
        )}
        {error && (
          <div id={`${props.id || 'input'}-error`} className="input-field__error" role="alert">
            {error}
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input, inputVariants }
