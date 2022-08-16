import prisma from '../prisma';
interface CreateCommentDto {
  boardId: string;
  userId: string;
  comment: string;
  parent_id: string;
  cdepth: number;
}

const createComment = async (createCommentDto: CreateCommentDto) => {
  const { boardId, userId, comment, parent_id, cdepth } = createCommentDto;
  const query = `
    INSERT INTO comment (
      board_id,
      user_id,
      comment
      ${parent_id ? `, parent_id, cdepth` : ``}) 
      VALUES (
        ${boardId},
        ${userId},
        "${comment}"
        ${parent_id ? `, ${parent_id}, ${cdepth}` : ``}
    );
  `;
  await prisma.$queryRawUnsafe(query);
};

const readComment = async (parent_id: string) => {
  return await prisma.$queryRaw<
    { cdepth: number }[]
  >`SELECT cdepth FROM comment WHERE id=${parent_id}`;
};

export default { createComment, readComment };
