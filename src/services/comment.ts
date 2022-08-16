import { commentModels } from '../models';

interface CreateCommentDto {
  boardId: string;
  userId: string;
  comment: string;
  parent_id: string;
}

const createComment = async (createCommentDto: CreateCommentDto) => {
  const comment = await commentModels.readComment(createCommentDto.parent_id);
  const cdepth = comment.length > 0 ? comment[0].cdepth + 1 : 0;
  return await commentModels.createComment({ ...createCommentDto, cdepth });
};

export default { createComment };
