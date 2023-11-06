const Reviews = () => {
  const reviews = [
    {
      name: "Rita W.",
      description:
        "update: attention! Gracie's is open for take-out and her food is prepared and served with all the care and love as before the pandemic. quick heads up:...",
    },
    {
      name: "Brian B.",
      description:
        "Gracie is still plugging away making the best Filipino food around. They are doing take out. They make amazing food. I have been here several times and...",
    },
    {
      name: "Marlene D. ",
      description:
        "Whenever I'm feeling homesick, Gracie's is the place to call for delicious Filipino food. While I'm capable of making pancit and lumpia myself, it just...",
    },
    {
      name: "Shawn Conway",
      description: "Good food. Great service. Family owned.",
    },

    {
      name: "Vicky",
      description:
        "The food is authentic straight from Manila! Outstanding flavors and variety. This is a must try Filipino restaurant in Everett.",
    },
    {
      name: "Mr. Fowl",
      description:
        "Excellent food with high quality. We ordered the Sisig, Tosilog, and the Lumpiang Shanghai as an appetizer. It was fantastic! Pretty quick, and decent price as well. Also, very generous portions. Will definitely return.",
    },
  ];
  return (
    <div className="mt-32 w-10/12 mx-auto text-lg">
      <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:items-center md:flex-row md:space-x-4 text-sky-650 my-10">
        <hr className="w-full md:w-52 h-1 bg-sky-650" />
        <span className="text-lg md:text-3xl font-bold">Reviews</span>
        <hr className="w-full md:w-52 h-1 bg-sky-650" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-sky-150 ">
              {review.name}
            </h5>
            <p className="font-normal text-black-950">{review.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
