import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

function App({ comment }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const handleSubmit = (event, parentComment) => {
    event.preventDefault();
    const newComment = {
      author: "Mertcan POLAT",
      time: new Date().toISOString(),
      text: text,
      votes: 0,
    };
    if (parentComment) {
      const updatedComments = comments.map((comment) => {
        if (comment.time === parentComment.time) {
          return {
            ...comment,
            replies: [...comment.replies, newComment],
          };
        } else {
          return comment;
        }
      });
      setComments(updatedComments);
    } else {
      setComments([...comments, newComment]);
    }
    setText("");
  };
  const handleChange = (event) => {
    setText(event.target.value);
  };
  return (
    <div className="comment-section border rounded-lg p-4 bg-light">
      <h1>Comment Section</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>
          <input
            value={text}
            className="form-control"
            onChange={handleChange}
          />
        </label>
        <button
          disabled={!text}
          className="btn btn-info mb-1 ms-2"
          type="submit"
        >
          Submit
        </button>
      </form>
      {comments.map((comment) => (
        <Comment key={comment.time} comment={comment} />
      ))}
    </div>
  );
}

const Comment = ({ comment, onReply }) => {
  const [votes, setVotes] = useState(comment.votes);
  const [reply, setReply] = useState([]);
  const [displayMessage, setDisplayMessage] = useState(false);

  const handleUpvote = () => {
    setVotes(votes + 1);
  };

  const handleChange = (event) => {
    setReply(event.target.value);
  };

  const handleClick = () => {
    setReply(document.getElementById("input").value);
    document.getElementById("input").value = "";
    setDisplayMessage(true);
  };

  return (
    <div className="comment border rounded-lg p-4 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="font-weight-bold">{comment.author}</span>
        <span className="text-muted small">
          {moment(comment.time).format("MMMM Do YYYY, h:mm:ss a")}{" "}
        </span>
        <span className="d-flex border rounded align-items-center ms-2 bg-light">
          Total Votes : {votes}
        </span>
      </div>
      <p className="text-dark">{comment.text}</p>

      {comment.replies &&
        comment.replies.map((reply) => (
          <Comment key={reply.time} comment={reply} onReply={onReply} />
        ))}
      <div className="row">
        <div className="col-md-6">
          <form className="mt-4" onSubmit={(event) => onReply(event, comment)}>
            <label>
              <input
                id="input"
                type="text"
                onChange={handleChange}
                value={reply}
                className="form-control"
              />
            </label>
          </form>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-dark mb-1 ms-2 d-flex"
              onClick={handleUpvote}
            >
              Upvote
            </button>
            <button
              disabled={!reply}
              className="btn btn-warning mb-1 ms-2"
              onClick={handleClick}
            >
              Reply
            </button>
          </div>
        </div>
        {displayMessage && (
          <div>
            {" "}
            <span hidden={!handleClick}>
              {" "}
              {displayMessage && <p> Your Message : {reply}</p>}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
