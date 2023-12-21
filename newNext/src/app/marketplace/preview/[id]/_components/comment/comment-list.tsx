import Box from '@mui/material/Box';
import ReviewItem from './commnet-item';
import { ICommentWithReplies } from 'src/service/stores/commentStore/model';

// ----------------------------------------------------------------------

type Props = {
  comments: ICommentWithReplies[];
};

export default function Reviews({ comments }: Props) {
  return (
    <>
      {comments.map((comment) => {
        const { id, likes, user_id, deal_id, content, created_at, user_name, deal_name, avatar } =
          comment.comment;
        const replies = comment.replies;
        const hasReply = !!replies;

        return (
          <Box key={id}>
            <ReviewItem
              id={id}
              deal_id={deal_id}
              user_name={user_name}
              avatar={avatar}
              created_at={created_at}
              content={content}
              likes={likes}
            />
            {hasReply &&
              replies.map((reply) => {
                // const userReply = reply.user_name;
                return (
                  <ReviewItem
                    key={reply.id}
                    created_at={reply.created_at}
                    content={reply.content}
                    user_name={reply.user_name}
                    avatar={reply.avatar}
                    parent_id={id}
                    hasReply
                  />
                );
              })}
          </Box>
        );
      })}
    </>
  );
}
