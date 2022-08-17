import { boardModels } from '../models';
import { HttpError } from '../common/httperr';
const getBoardWithComment = async (
  boardId: string,
  commentOffset: string,
  commentLimit: string
) => {
  const existingBoard = await boardModels.getBoardByBoardId(boardId);
  if (!existingBoard) {
    const error = new HttpError(402, '게시판이 존재하지 않습니다.');

    throw error;
  }
  return await boardModels.getBoardWithComment(
    boardId,
    commentOffset,
    commentLimit
  );
};

const getBoards = async (keyword: string) => {
  const boardSearchResult = await boardModels.getBoards(keyword);
  if (keyword.length === 0) {
    const error = new HttpError(402, '검색어가 없습니다.');

    throw error;
  }
  if (boardSearchResult.length === 0) {
    const error = new HttpError(403, '검색 결과가 없습니다.');

    throw error;
  }
  return boardSearchResult;
};

const increaseView = async (boardId: string, userId: string) => {
  const existingUser = await boardModels.getUserById(boardId, userId);
  if (existingUser) {
    const view = Number((await boardModels.readView(boardId))[0].cnt);
    return view;
  }
  await boardModels.updateBoardViews(boardId, userId);
  const view = Number((await boardModels.readView(boardId))[0].cnt);
  return view;
};

export default { getBoardWithComment, getBoards, increaseView };
