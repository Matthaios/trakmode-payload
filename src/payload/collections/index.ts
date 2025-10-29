import { Users } from './Users'
import { Offers } from './Offers'
import { Media } from './Media'
import { PrivateAssets } from './PrivateAssets'
import { Orders } from './Orders'
import { group } from '@/payload/utils/group'

export const collections = [
  ...group('Account', [Users, Orders]),
  ...group('Creator Hub', [Offers, Media, PrivateAssets]),
]
