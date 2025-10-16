import LogoDarkLetters from '@/assets/trakmode-dark.png'
import LogoLightLetters from '@/assets/trakmode-light.png'
import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="relative h-10 w-auto">
      <Image
        src={LogoLightLetters}
        alt="Trakmode Logo"
        className="h-full w-auto hidden dark:block"
      />

      <Image
        src={LogoDarkLetters}
        alt="Trakmode Logo"
        className="h-full w-auto dark:hidden block"
      />
    </div>
  )
}
