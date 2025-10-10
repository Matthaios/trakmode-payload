'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  AppleLogo,
  DribbleLogo,
  FacebookLogo,
  FigmaLogo,
  FigmaLogoOutlined,
  GoogleLogo,
  TwitterLogo,
} from '@/components/shared/social-logos'

const socialButtonVariants = cva(
  'group relative inline-flex h-max cursor-pointer items-center justify-center font-semibold whitespace-nowrap outline-focus-ring transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:stroke-fg-disabled disabled:text-fg-disabled disabled:*:text-fg-disabled',
  {
    variants: {
      variant: {
        gray: 'bg-primary text-secondary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover',
        black:
          'bg-black text-white shadow-xs-skeumorphic ring-1 ring-transparent ring-inset before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0%',
        facebook:
          'bg-[#1877F2] text-white shadow-xs-skeumorphic ring-1 ring-transparent ring-inset before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0% hover:bg-[#0C63D4]',
        dribble:
          'bg-[#EA4C89] text-white shadow-xs-skeumorphic ring-1 ring-transparent ring-inset before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0% hover:bg-[#E62872]',
      },
      size: {
        sm: 'gap-2 rounded-lg px-3 py-2 text-sm before:rounded-[7px] data-[icon-only]:p-2',
        md: 'gap-2.5 rounded-lg px-3.5 py-2.5 text-sm before:rounded-[7px] data-[icon-only]:p-2.5',
        lg: 'gap-3 rounded-lg px-4 py-2.5 text-md before:rounded-[7px] data-[icon-only]:p-2.5',
        xl: 'gap-3.5 rounded-lg px-4.5 py-3 text-md before:rounded-[7px] data-[icon-only]:p-3.5',
        '2xl': 'gap-4 rounded-[10px] px-5.5 py-4 text-lg before:rounded-[9px] data-[icon-only]:p-4',
      },
    },
    defaultVariants: {
      variant: 'gray',
      size: 'lg',
    },
  },
)

const socialButtonIconVariants = cva('pointer-events-none shrink-0 transition-inherit-all', {
  variants: {
    variant: {
      gray: 'text-fg-quaternary group-hover:text-fg-quaternary_hover',
      black: '',
      facebook: '',
      dribble: '',
    },
  },
  defaultVariants: {
    variant: 'gray',
  },
})

export interface SocialButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof socialButtonVariants> {
  asChild?: boolean
  social: 'google' | 'facebook' | 'apple' | 'twitter' | 'figma' | 'dribble'
  theme?: 'brand' | 'color' | 'gray'
  disabled?: boolean
}

const SocialButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(
  (
    {
      className,
      variant,
      size,
      social,
      theme = 'brand',
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'

    const isIconOnly = !children

    const socialToVariant = {
      google: 'gray',
      facebook: 'facebook',
      apple: 'black',
      twitter: 'black',
      figma: 'black',
      dribble: 'dribble',
    } as const

    const buttonVariant = theme === 'brand' ? socialToVariant[social] : 'gray'

    const logos = {
      google: GoogleLogo,
      facebook: FacebookLogo,
      apple: AppleLogo,
      twitter: TwitterLogo,
      figma: theme === 'gray' ? FigmaLogoOutlined : FigmaLogo,
      dribble: DribbleLogo,
    }

    const Logo = logos[social]

    const iconColorful =
      (theme === 'brand' && (social === 'google' || social === 'figma')) ||
      (theme === 'color' &&
        (social === 'google' ||
          social === 'facebook' ||
          social === 'figma' ||
          social === 'dribble')) ||
      undefined

    const iconClassName =
      theme === 'gray'
        ? socialButtonIconVariants({ variant: 'gray' })
        : theme === 'brand' && (social === 'facebook' || social === 'apple' || social === 'twitter')
          ? 'text-white'
          : theme === 'color' && (social === 'apple' || social === 'twitter')
            ? 'text-alpha-black'
            : ''

    return (
      <Comp
        className={cn(
          socialButtonVariants({ variant: buttonVariant, size, className }),
          isIconOnly && 'data-[icon-only]',
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <Logo
          className={cn(socialButtonIconVariants({ variant: buttonVariant }), iconClassName)}
          colorful={iconColorful}
        />
        {children}
      </Comp>
    )
  },
)

SocialButton.displayName = 'SocialButton'

export { SocialButton, socialButtonVariants }
