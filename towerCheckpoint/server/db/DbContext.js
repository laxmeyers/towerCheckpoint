import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventSchema } from '../models/Event';
import { TicketsSchema } from '../models/Tickets';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Events = mongoose.model('Event', EventSchema)
  Tickets = mongoose.model('Ticket', TicketsSchema)
}

export const dbContext = new DbContext()
