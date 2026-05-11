import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommentCart from "./card/CommentCart";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { toast } from "react-toastify";
import useAuthStore from "../../store/AuthStore";
import { Icon } from "@iconify/react";

const CommentsSection = ({ postId, post_name }) => {
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
        console.log(data);

        setComments(
          data.filter(
            (item) =>
              item.post_id === Number(postId) &&
              item?.status === "published"
          )
        );
      } catch (error) {
        console.log("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    getComments();
  }, [postId]);

  // SEND COMMENT
  const sendcomment = async (data) => {
    setSending(true);

    try {
      const res = await axios.post(
        "https://areyablogpost.app.n8n.cloud/webhook-test/comment",
        {
          user_name: data.name,
          user_comment: data.message,
          post_id: postId,
          post_name: post_name,
        }
      );

      const check = res.data;
      console.log(check)

      if (check.status === "ok") {
        setComments((prev) => [...prev, res.data]);
        toast.success(check.response_msg);
      } else if (check.status === "error") {
        toast.error(check.response_msg);
      } else if (check.status === "pending") {
        toast.info(check.response_msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
      reset();
    }
  };

  return (
    <div className="w-full ">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#214252]">
          Comments
        </h2>

        <span className="text-sm text-slate-500">
          {comments.length} comments
        </span>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-slate-500 mb-4 animate-pulse">
          Loading comments...
        </p>
      )}

      {/* COMMENTS LIST */}
      <div className="space-y-4 mb-10">
        {comments?.map((c) => (
          <CommentCart key={c?.id} c={c} />
        ))}
      </div>

      {/* FORM (GLASS STYLE) */}
      <form
        onSubmit={handleSubmit(sendcomment)}
        className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-[28px] p-6 shadow-xl"
      >
        <h3 className="text-lg font-semibold text-[#214252] mb-4 flex items-center gap-2">
          <Icon icon="solar:chat-round-dots-bold" width="20" />
          Leave a Comment
        </h3>

        {/* NAME */}
        <input
          {...register("name", { required: true })}
          className="w-full h-12 px-4 mb-3 rounded-xl border border-slate-200 outline-none focus:border-[#214252]"
          placeholder="Your name"
        />

        {/* MESSAGE */}
        <textarea
          {...register("message", { required: true })}
          className="w-full p-4 mb-4 rounded-xl border border-slate-200 outline-none focus:border-[#214252] resize-none"
          placeholder="Write your comment..."
          rows="4"
        />

        {/* BUTTON */}
        <button
          disabled={sending}
          className={`w-full h-12 rounded-xl font-semibold text-white transition ${
            sending
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-[#214252] hover:scale-[1.02]"
          }`}
        >
          {sending ? "Sending..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentsSection;