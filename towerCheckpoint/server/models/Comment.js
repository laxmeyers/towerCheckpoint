import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants";

export const CommentSchema = new Schema({
    body: { ...basicStringType, maxLength: 5000 },

    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    eventId: {type: Schema.Types.ObjectId, required: true, ref: 'Event'}
}, defaultSchemaOptions)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})