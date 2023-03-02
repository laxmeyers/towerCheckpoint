import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class CommentsService {
    async destroyComment(commentId, requestorId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (!comment) {
            throw new BadRequest('Invalid comment Id')
        }
        if (comment.creatorId != requestorId) {
            throw new Forbidden("You can't do that")
        }

        await comment.remove()
        return comment
    }
    async getCommentsForEvent(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
        return comments
    }

    async createMessage(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')
        return comment
    }

}

export const commentsService = new CommentsService()