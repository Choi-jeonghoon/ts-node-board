import prisma from '../prisma';
import * as querybuilder from './querybuilders';

const getBoardByBoardId = async (boardId: string) => {
  let existingBoard: [] = [];
  existingBoard = await prisma.$queryRaw`
    SELECT * FROM board
    WHERE id=${boardId}
  `;
  return existingBoard;
};

const getBoardWithComment = async (
  boardId: string,
  commentOffset: string,
  commentLimit: string
) => {
  const start = (Number(commentOffset) - 1) * Number(commentLimit);

  return await prisma.$queryRawUnsafe(`
  SELECT
    b.id,
    b.user_id,
    user.nick_name,
    b.board_title,
    b.board_contents,
    (
      SELECT

      JSON_ARRAYAGG(JSON_OBJECT("parent_id",cc.parent_id,"nick_name",uu.nick_name,"comment",cc.comment)) AS comt
      
      FROM (
        SELECT
        *
        FROM comment
        ORDER BY creatred_at  
        ${
          start ? `LIMIT ${start}, ${commentLimit}` : `LIMIT 0, ${commentLimit}`
        }
        ) AS cc
      LEFT JOIN user AS uu ON cc.user_id=uu.id
      WHERE cc.board_id=${boardId}
    ) AS board_comment
  FROM board AS b
  LEFT JOIN (
    SELECT
    *
    FROM comment
    ) AS c ON b.id = c.board_id

  LEFT JOIN user AS u ON c.user_id = u.id
  LEFT JOIN user ON b.user_id = user.id

  WHERE b.id= ${boardId}

  GROUP BY b.id
  `);
};

const getBoards = async (keyword: string) => {
  return await prisma.$queryRawUnsafe<{ BoardSearchResult: string }[]>(`
  SELECT
    board.id,
    board.board_title AS boardTitle,
    board.board_contents AS boardContent,
    user.nick_name AS userName,
    c.commentComment,
    category.category

  FROM board
    LEFT JOIN user ON board.user_id=user.id
    LEFT JOIN (
      SELECT
        comment.board_id,
        JSON_ARRAYAGG(user.nick_name) AS userCommentNickname,
        JSON_ARRAYAGG(comment.comment) AS commentComment

      FROM comment
        JOIN user on user.id=comment.user_id
      GROUP BY comment.board_id    
    ) AS c ON c.board_id = board.id

  LEFT JOIN category ON category.id=board.category_id

  WHERE ${querybuilder.searchFilter(keyword)}
  `);
};

const getUserById = async (boardId: string, userId: string) => {
  let existingUser: [] = [];
  existingUser = await prisma.$queryRaw`
  SELECT * FROM view WHERE board_id=${boardId} AND user_id= ${userId}
  `;
  return existingUser;
};

const updateBoardViews = async (boardId: string, userId: string) => {
  return await prisma.$queryRaw`
  INSERT INTO view (board_id,user_id) VALUES(${boardId},${userId})
  `;
};

const readView = async (boardId: string) => {
  return await prisma.$queryRaw<{ cnt: number }[]>`
  SELECT COUNT(*) AS cnt FROM view WHERE board_id=${boardId}
  `;
};

export default {
  getBoardByBoardId,
  getBoardWithComment,
  getBoards,
  getUserById,
  updateBoardViews,
  readView,
};
