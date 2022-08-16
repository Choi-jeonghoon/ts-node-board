import { Request, Response } from 'express';
import { boardServices } from '../services/index';
import { HttpError } from '../common/httperr';

const getBoardWithComment = async (
  req: Request<{ boardId: string }, {}, {}, { offset: string; limit: string }>,
  res: Response
) => {
  try {
    const boardId = req.params.boardId;
    const commentOffset = req.query.offset;
    const commentLimit = req.query.limit;
    const readBoard = await boardServices.getBoardWithComment(
      boardId,
      commentOffset,
      commentLimit
    );
    return res.status(200).json(readBoard);
  } catch (error) {
    if (error instanceof HttpError) {
      return res
        .status(error.statusCode || 500)
        .json({ message: error.message });
    }
  }
};

const getBoards = async (
  req: Request<{}, {}, {}, { keyword: string }>,
  res: Response
) => {
  try {
    const { keyword } = req.query;
    const boardSearchResult = await boardServices.getBoards(keyword);
    return res.status(200).json(boardSearchResult);
  } catch (error) {
    if (error instanceof HttpError) {
      return res
        .status(error.statusCode || 500)
        .json({ message: error.message });
    }
  }
};

const increaseView = async (
  req: Request<{ boardId: string }, {}, { userId: string }, {}>,
  res: Response
) => {
  try {
    const boardId = req.params.boardId;
    const { userId } = req.body;
    const view = await boardServices.increaseView(boardId, userId);
    return res.status(200).json(view);
  } catch (error) {
    if (error instanceof HttpError) {
      return res
        .status(error.statusCode || 500)
        .json({ message: 'err.message ' });
    }
  }
};
export default { getBoardWithComment, getBoards, increaseView };
