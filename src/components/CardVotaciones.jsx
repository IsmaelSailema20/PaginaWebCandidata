import React from "react";

function CardVotaciones({ src, candidata, alt, hasVoted, votedFor, onVote }) {
  const handleVoteClick = () => {
    if (!hasVoted) {
      onVote(candidata);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl fade-in">
      <div className="flex flex-col items-center p-6">
        <img
          className="w-52 h-52 mb-4 rounded-full shadow-lg mt-4 transform transition duration-500 hover:scale-105"
          src={src}
          alt={alt}
        />
        <h5 className="text-2xl font-bold text-center my-4">
          <span className="text-[#40b2e6] drop-shadow-[4px_2px_0px_#dedede]">
            {candidata}
          </span>
        </h5>

        <div className="flex mt-4 md:mt-6">
          <button
            onClick={handleVoteClick}
            disabled={hasVoted}
            className={`text-lg inline-flex items-center px-6 py-3 font-bold text-center text-white rounded-lg transition-transform duration-300 focus:ring-4 focus:outline-none ${
              votedFor === candidata
                ? "bg-pink-500 cursor-not-allowed"
                : hasVoted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#FF8B9A] to-[#72D5FF] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform  disabled:opacity-50 hover:scale-105"
            }`}
          >
            {votedFor === candidata ? (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.285 2.292a1 1 0 00-1.414 0l-11.326 11.32-4.243-4.244a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l12-12a1 1 0 000-1.414z" />
                </svg>
                Apoyaste a esta candidata
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 9V5a5 5 0 00-10 0v4h-.5a1.5 1.5 0 000 3h.5v6a5 5 0 005 5h4a5 5 0 005-5v-6h.5a1.5 1.5 0 000-3H14zm-6-4a3 3 0 016 0v4H8V5zm8 13a3 3 0 01-3 3h-4a3 3 0 01-3-3v-6h10v6z" />
                </svg>
                Apoyo a esta candidata
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardVotaciones;
