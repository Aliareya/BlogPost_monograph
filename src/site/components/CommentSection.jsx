import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommentCart from "./card/CommentCart";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { toast } from "react-toastify";
import useAuthStore from "../../store/AuthStore";

const CommentsSection = ({ postId , post_name }) => {
  const { register, handleSubmit, reset } = useForm();
  const user = useAuthStore((state) => state.user);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  // FETCH COMMENTS
  useEffect(() => {
    const getComments = async () => {
      setLoading(true);

      try {
        const q = query(collection(db, "comments"));

        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setComments(
          data.filter((item) => item.post_id === Number(postId) && item?.status === "published")
        );

        return data;
      } catch (error) {
        console.log("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };
    getComments();

  }, []);

  // SEND COMMENT
  const sendcomment = async (data) => {
    setSending(true);

    try {
      const res = await axios.post(
        "https://areyatest.app.n8n.cloud/webhook-test/comment",
        {
          user_name: data.name,
          user_comment: data.message,
          post_id : postId,
          post_name : post_name,

        }
      );

      const check = res.data;
      console.log(check)

      if(check.status === "ok"){
        const newComment = res.data;
        setComments((prev) => [...prev, newComment]);
        toast.success(check.response_msg)

      }else if(check.status === "error"){
        toast.error(check.response_msg)
      }else if(check.status === "pending"){
        toast.info(check.response_msg)
      }

      // add to UI
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
      reset();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <h2 className="text-2xl font-bold mb-6">Comments</h2>

      {/* LOADING COMMENTS */}
      {loading && (
        <p className="text-gray-500 mb-4 animate-pulse">
          Loading comments...
        </p>
      )}

      {/* COMMENTS LIST */}
      <div className="space-y-4 mb-6">
        {comments?.map((c) => (
          <CommentCart key={c?.id} c={c} />
        ))}
      </div>

      {/* AI TYPING INDICATOR */}
      {sending && (
        <p className="text-sm text-gray-500 mb-3 animate-pulse">
          Checking your comment....
        </p>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit(sendcomment)}
        className="bg-gray-50 p-4 rounded-xl"
      >
        <input
          {...register("name", { required: true })}
          className="w-full p-2 mb-2 border rounded"
          placeholder="Your name"
        />

        <textarea
          {...register("message", { required: true })}
          className="w-full p-2 mb-2 border rounded"
          placeholder="Write a comment..."
          rows="3"
        />

        <button
          disabled={sending}
          className={`px-4 py-2 rounded-full text-white ${sending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500"
            }`}
        >
          {sending ? "Sending..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentsSection;