import React from "react";
import { useQueryClient } from "react-query";

import classNames from "classnames";
import Comment from "./Comment";

function CommentList({ recruitBoard, recruitId }) {
  let sortedComment = recruitBoard?.recruitComments.sort(
    (a, b) => a.commentGroup - b.commentGroup,
  );
  let commentGroupSet = new Set();
  return (
    <li>
      <ul className="border-b-[1px] border-gray2">
        {sortedComment?.map(comment => {
          if (
            !commentGroupSet.has(comment.commentGroup) &
            (comment.commentDepth === 1)
          ) {
            commentGroupSet.add(comment.commentGroup);
            return (
              <>
                <li key="0" className="py-[50px] border-t-[1px] border-gray2">
                  이미 삭제된 댓글입니다.
                </li>
                <Comment
                  key={comment.recruitCommentId}
                  comment={comment}
                  recruitId={recruitId}
                />
              </>
            );
          }
          commentGroupSet.add(comment.commentGroup);
          return (
            <Comment
              key={comment.recruitCommentId}
              comment={comment}
              recruitId={recruitId}
            />
          );
        })}
      </ul>
    </li>
  );
}

export default CommentList;
