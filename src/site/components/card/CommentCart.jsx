const CommentCard = ({ c }) => {
  const getInitial = (name) => name?.charAt(0).toUpperCase();
  console.log(c)

  return (
    <div className="bg-[linear-gradient(-85deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)] shadow rounded-xl p-4 mb-4 border">

      {/* USER COMMENT */}
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
          {getInitial(c?.name)}
        </div>

        <div>
          <p className="font-semibold text-gray-800">
            {c?.name}
          </p>
          <p className="text-gray-50 mt-1">
            {c?.message}
          </p>
        </div>
      </div>

      {/* REPLIES */}
      {c.replays && (
        <div className="ml-10 border-l pl-4 space-y-3">
          {/* {c.replays.map((reply) => ( */}
            <div
              // key={replays.id}
              className={`flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200"`}
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700">
                A
              </div>

              <div>
                <p className="font-semibold text-sm text-gray-700">
                  {c?.replays?.name}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {c?.replays?.message}
                </p>
              </div>
            </div>
          {/* ))} */}
        </div>
      )}
    </div>
  );
};

export default CommentCard;