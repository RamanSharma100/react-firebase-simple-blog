import React, { useState } from "react";
import { useSelector } from "react-redux";

const AddReply = ({ id, handleReply, replyBoxSet }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reply, setReply] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div key={id}>
      {!isLoggedIn && (
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control mr-1"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}
      <textarea
        className="form-control mb-2"
        placeholder="Reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      ></textarea>
      <div>
        <button
          type="button"
          className="btn text-primary mr-2"
          onClick={() => {
            handleReply({ i: id, reply: { name, email, reply } });
            replyBoxSet(false, id);
            setName("");
            setEmail("");
            setReply("");
          }}
        >
          Reply
        </button>
        <button
          type="button"
          onClick={() => replyBoxSet(false, id)}
          className="btn text-danger"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddReply;
