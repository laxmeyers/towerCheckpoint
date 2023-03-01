import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants";

export const EventSchema = new Schema({
    name: basicStringType,
    description: {...basicStringType, maxLength: 5000},
    coverImg: { ...basicStringType, maxLength: 2000 },
    location: basicStringType,
    capacity: { type: Number, required: true, default: 150 },
    startDate: { type: Date, required: true },
    isCanceled: { ...basicStringType, type: Boolean, default: false },
    type: { ...basicStringType, enum: ['concert', 'convention', 'sport', 'digital'] },

    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
    
}, defaultSchemaOptions)

EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})