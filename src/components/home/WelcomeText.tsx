const WelcomeText = () => {
  return (
    <div className="mt-32 w-10/12 mx-auto text-lg">
      <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:items-center md:flex-row md:space-x-4 text-sky-650 my-10">
        <hr className="w-full md:w-52 h-1 bg-sky-650" />
        <span className="text-lg md:text-3xl font-bold">
          Welcome to Gracie&apos;s Cuisine
        </span>
        <hr className="w-full md:w-52 h-1 bg-sky-650" />
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className="my-6 text-center">
          Gracie&apos;s Cuisine proudly serves delicious food to the greater
          Everett community.
        </p>
        <p className="text-center">
          Our food is made from scratch and it’s made fresh daily, therefore we
          only prepare a certain amount of order for a day, once it is gone,
          it’s gone. This is the reason why our closing hours varies depending
          on how fast our foods sell.
        </p>
        <p className="mt-3 text-center">
          I recommend to call us early and reserve if you feel dining in or
          taking out for your dinner. We are just a phone call away.
        </p>
        <p className="mt-3 text-center">
          I hope this clears out any ambiguity in our business of operation
        </p>
      </div>
    </div>
  );
};

export default WelcomeText;
