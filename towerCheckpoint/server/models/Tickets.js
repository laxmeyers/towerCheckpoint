import { Schema } from "mongoose";
import { defaultSchemaOptions } from "../db/Constants";

export const TicketsSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
    accountId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'},
}, defaultSchemaOptions)

TicketsSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

TicketsSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    justOne: true,
    ref: 'Event'
})