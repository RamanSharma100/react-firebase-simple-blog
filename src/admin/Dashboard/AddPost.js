import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { newPost } from "../../redux/actionCreators/postsActionCreator";

const AddPost = () => {
  const userId = useSelector((state) => state.auth.userId);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !description) {
      return toast.warning("Please fill in all fields!");
    }

    if (!image || image === undefined) {
      return toast.warning("Please select an image!");
    }

    if (description.length < 100) {
      return toast.info("Description should be of atleast 100");
    }
    if (title.trim().split(" ").length < 2) {
      return toast.info("Title should be of atleast 2 words");
    }
    if (image.size > 5242880) {
      return toast.info("Image should be less than or equal to 5 MB");
    }
    const data = {
      title,
      category,
      description,
      image,
    };

    dispatch(newPost(data, userId, user.displayName, setProgress));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 my-5 text-right">
          <Link to="/admin/dashboard" className="btn btn-dark mr-2">
            Go Back
          </Link>
        </div>
        <div className="col-md-12 mb-3">
          <h1 className="display-3 text-dark text-center">Add Post</h1>
        </div>
        <div className="col-md-6 mx-auto mb-5 shadow p-5">
          {progress ? (
            progress !== 100 ? (
              <div className="mx-auto p-5">
                <h1 className="text-center my-2">
                  Uploading Post - {progress}%
                </h1>
                <progress
                  className="text-center form-control"
                  max={100}
                  value={progress}
                ></progress>
              </div>
            ) : (
              <div className="mx-auto p-5   text-center ">
                <i className="fa fa-tick text-success mx-auto my-2"></i>
                <h1 className="text-center my-2">Post Uploaded successfully</h1>
                <Link
                  to={"/admin/dashboard/posts"}
                  className="my-2 mx-auto btn btn-primary"
                >
                  See Posts
                </Link>
              </div>
            )
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="category"
                  placeholder="Categories [followed with commas for multiple]"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Enter Description"
                  className="form-control"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/png, image/jpeg, image/jpg"
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-dark btn-block"
                  value="Add Post"
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPost;
