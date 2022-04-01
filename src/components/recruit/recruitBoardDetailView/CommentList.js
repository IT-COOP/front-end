import React from "react";

import Comment from "./Comment";

function CommentList({ recruitBoard, recruitId, userId }) {
  let sortedComment = recruitBoard?.recruitComments.sort(
    (a, b) => a.commentGroup - b.commentGroup,
  );
  let commentGroupSet = new Set();
  return (
    <li>
      <ul className="border-b-[1px] border-gray2">
        {sortedComment?.map((comment, idx) => {
          if (
            !commentGroupSet.has(comment.commentGroup) &
            (comment.commentDepth === 1)
          ) {
            commentGroupSet.add(comment.commentGroup);
            return (
              <React.Fragment key={idx}>
                <li
                  key={comment.updatedAt}
                  className="py-[50px] border-t-[1px] border-gray2"
                >
                  이미 삭제된 댓글입니다.
                </li>
                <Comment
                  key={comment.recruitCommentId}
                  comment={comment}
                  recruitId={recruitId}
                  userId={userId}
                />
              </React.Fragment>
            );
          }
          commentGroupSet.add(comment.commentGroup);
          return (
            <Comment
              key={comment.recruitCommentId}
              comment={comment}
              recruitId={recruitId}
              userId={userId}
            />
          );
        })}
      </ul>
    </li>
  );
}

export default CommentList;
