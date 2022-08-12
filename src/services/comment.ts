import { commentModels } from '../models';

export const createComment = async (boardId, userId, comment, parent_id) => {
  return await commentModels.createComment(boardId, userId, comment, parent_id);
};

