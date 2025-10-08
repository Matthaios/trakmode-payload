'use client'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { ChevronDown, Edit, Link as LinkIcon, Plus, X } from 'lucide-react'
import Link from 'next/link'

// import { cn } from '@/lib/utils' // Not needed with SCSS classes

// Icon mapping for built-in icons
const icons = {
  chevron: ChevronDown,
  edit: Edit,
  link: LinkIcon,
  plus: Plus,
  x: X,
}

const baseClass = 'btn'

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  asChild?: boolean
  as?: 'button' | 'anchor' | 'link'
  href?: string
  to?: string
  newTab?: boolean
  icon?: keyof typeof icons | React.ReactNode
  iconPosition?: 'left' | 'right'
  iconStyle?: 'none' | 'with-border' | 'without-border'
  tooltip?: string
  margin?: boolean
  round?: boolean
  buttonStyle?:
    | 'primary'
    | 'secondary'
    | 'pill'
    | 'subtle'
    | 'tab'
    | 'transparent'
    | 'error'
    | 'icon-label'
    | 'none'
  size?: 'xsmall' | 'small' | 'medium' | 'large'
  SubMenuPopupContent?: (props: { close: () => void }) => React.ReactNode
  enableSubMenu?: boolean
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const ButtonContents = ({
  children,
  icon,
  iconPosition: _iconPosition = 'right',
  iconStyle: _iconStyle = 'without-border',
  showTooltip,
  tooltip,
}: {
  children?: React.ReactNode
  icon?: keyof typeof icons | React.ReactNode
  iconPosition?: 'left' | 'right'
  iconStyle?: 'none' | 'with-border' | 'without-border'
  showTooltip?: boolean
  tooltip?: string
}) => {
  const BuiltInIcon = typeof icon === 'string' ? icons[icon as keyof typeof icons] : null
  const CustomIcon = typeof icon === 'object' ? icon : null

  return (
    <>
      {tooltip && showTooltip && <div className={`${baseClass}__tooltip`}>{tooltip}</div>}
      <span className={`${baseClass}__content`}>
        {children && <span className={`${baseClass}__label`}>{children}</span>}
        {icon && (
          <span className={`${baseClass}__icon`}>
            {CustomIcon}
            {BuiltInIcon && <BuiltInIcon />}
          </span>
        )}
      </span>
    </>
  )
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      className,
      buttonStyle = 'primary',
      size = 'medium',
      asChild = false,
      as = 'button',
      href,
      to,
      newTab = false,
      icon,
      iconPosition = 'right',
      iconStyle = 'without-border',
      tooltip,
      margin = true,
      round = false,
      SubMenuPopupContent: _SubMenuPopupContent,
      enableSubMenu: _enableSubMenu = false,
      disabled,
      onClick,
      onMouseDown,
      children,
      ...props
    },
    ref,
  ) => {
    const [showTooltip, setShowTooltip] = React.useState(false)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setShowTooltip(false)
      if (onClick) {
        onClick(event)
      }
    }

    const handlePointerEnter = () => {
      if (tooltip) {
        setShowTooltip(true)
      }
    }

    const handlePointerLeave = () => {
      if (tooltip) {
        setShowTooltip(false)
      }
    }

    const classes = [
      baseClass,
      className && className,
      icon && `${baseClass}--icon`,
      iconStyle && `${baseClass}--icon-style-${iconStyle}`,
      icon && !children && `${baseClass}--icon-only`,
      size && `${baseClass}--size-${size}`,
      icon && iconPosition && `${baseClass}--icon-position-${iconPosition}`,
      tooltip && `${baseClass}--has-tooltip`,
      !_SubMenuPopupContent && `${baseClass}--withoutPopup`,
      !margin && `${baseClass}--no-margin`,
    ]
      .filter(Boolean)
      .join(' ')

    const styleClasses = [
      buttonStyle && `${baseClass}--style-${buttonStyle}`,
      disabled && `${baseClass}--disabled`,
      round && `${baseClass}--round`,
      _SubMenuPopupContent ? `${baseClass}--withPopup` : `${baseClass}--withoutPopup`,
    ]
      .filter(Boolean)
      .join(' ')

    const buttonProps = {
      ...props,
      className: !_SubMenuPopupContent ? [classes, styleClasses].join(' ') : classes,
      disabled,
      onClick: !disabled ? handleClick : undefined,
      onMouseDown: !disabled ? onMouseDown : undefined,
      onPointerEnter: tooltip ? handlePointerEnter : undefined,
      onPointerLeave: tooltip ? handlePointerLeave : undefined,
      'aria-label': props['aria-label'],
      title: props['aria-label'],
    }

    const buttonContent = (
      <ButtonContents
        icon={icon}
        iconPosition={iconPosition}
        iconStyle={iconStyle}
        showTooltip={showTooltip}
        tooltip={tooltip}
      >
        {children}
      </ButtonContents>
    )

    if (asChild) {
      return (
        <Slot ref={ref} {...buttonProps}>
          {buttonContent}
        </Slot>
      )
    }

    switch (as) {
      case 'anchor': {
        return (
          <a
            ref={ref as React.RefObject<HTMLAnchorElement>}
            href={!disabled ? href : undefined}
            target={newTab ? '_blank' : undefined}
            rel={newTab ? 'noopener noreferrer' : undefined}
            className={buttonProps.className}
            aria-label={buttonProps['aria-label']}
            title={buttonProps.title}
            onClick={!disabled ? handleClick : undefined}
            onMouseDown={
              !disabled
                ? (buttonProps.onMouseDown as unknown as React.MouseEventHandler<HTMLAnchorElement>)
                : undefined
            }
            onPointerEnter={tooltip ? handlePointerEnter : undefined}
            onPointerLeave={tooltip ? handlePointerLeave : undefined}
          >
            {buttonContent}
          </a>
        )
      }

      case 'link':
        if (disabled) {
          return (
            <div
              ref={ref as React.RefObject<HTMLDivElement>}
              className={buttonProps.className}
              aria-label={buttonProps['aria-label']}
              title={buttonProps.title}
            >
              {buttonContent}
            </div>
          )
        }
        return (
          <Link
            href={to || href || '#'}
            className={buttonProps.className}
            onClick={!disabled ? handleClick : undefined}
            onMouseDown={
              !disabled
                ? (buttonProps.onMouseDown as unknown as React.MouseEventHandler<HTMLAnchorElement>)
                : undefined
            }
            onPointerEnter={tooltip ? handlePointerEnter : undefined}
            onPointerLeave={tooltip ? handlePointerLeave : undefined}
          >
            {buttonContent}
          </Link>
        )

      default:
        return (
          <button ref={ref as React.RefObject<HTMLButtonElement>} {...buttonProps}>
            {buttonContent}
          </button>
        )
    }
  },
)

Button.displayName = 'Button'

export { Button }
