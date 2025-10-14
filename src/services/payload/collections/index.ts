import { Users } from './Users'
import { Offers } from './Offers'
import { Media } from './Media'
import { PrivateAssets } from './PrivateAssets'
import { Orders } from './Orders'
import { group } from '../utils/group'

export const collections = [
  ...group('Content', [Offers, Media, PrivateAssets]),
  ...group('Account', [Orders, Users]),
]
