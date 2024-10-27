import React from "react";

function CardVotaciones({ src, candidata, alt, hasVoted, votedFor, onVote }) {
  const handleVoteClick = () => {
    if (!hasVoted) {
      onVote(candidata);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-64 h-60 mb-3 rounded-lg shadow-lg mt-8"
          src={src}
          alt={alt}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{candidata}</h5>
        <div className="flex mt-4 md:mt-6">
          <button
            onClick={handleVoteClick}
            disabled={hasVoted}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none ${
              votedFor === candidata
                ? "bg-gray-400 cursor-not-allowed"
                : hasVoted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300"
            }`}
          >
            {votedFor === candidata
              ? "Apoyaste a esta candidata"
              : "Apoyo a esta candidata"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardVotaciones;
