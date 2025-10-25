import { Users } from './Users'
import { Offers } from './Offers'
import { Media } from './Media'
import { PrivateAssets } from './PrivateAssets'
import { Orders } from './Orders'
import { Tracks } from './Tracks'
import { TourEvents } from './TourEvents'
import { Videos } from './Videos'
import { ListenItems } from './ListenItems'
import { Products } from './Products'
import { Services } from './Services'
import { Tutorials } from './Tutorials'
import { Collaborations } from './Collaborations'
import { Bookings } from './Bookings'
import { group } from '../utils/group'

export const collections = [
  ...group('Creator Hub', [
    Offers,
    Media,
    PrivateAssets,
    Tracks,
    TourEvents,
    Videos,
    ListenItems,
    Products,
  ]),
  ...group('Services', [Services, Bookings]),
  ...group('Education', [Tutorials]),
  ...group('Network', [Collaborations]),
  ...group('Account', [Orders, Users]),
]
