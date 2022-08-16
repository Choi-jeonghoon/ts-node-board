import { commentServices } from '../services/index';
import { Request, Response } from 'express';
import { HttpError } from '../common/httperr';

const createComment = async (
  req: Request<
    {},
    {},
    { boardId: string; userId: string; comment: string; parent_id: string },
    {}
  >,
  res: Response
) => {
  try {
    const { boardId, userId, comment, parent_id } = req.body; //parent_id는 1부터 시작
    const createCommentDto = {
      boardId,
      userId,
      comment,
      parent_id,
    };
    await commentServices.createComment(createCommentDto);
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    if (error instanceof HttpError) {
      return res
        .status(error.statusCode || 500)
        .json({ message: error.message });
    }
  }
};

export default { createComment };
