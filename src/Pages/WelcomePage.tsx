const WelcomePage = () => {
  return (
    <div className="h-full text-left pt-8">
      <article className="p-8">
        <h1 className="font-bold text-8xl uppercase">Blog App</h1>
        <h2 className="mt-8 mb-4 text-2xl font-semibold underline">
          Description
        </h2>
        <p className="my-4">
          Blog app is a full stack web app made with the MERN stack
        </p>
        <ul className="pl-8 flex flex-col gap-2">
          <li>Mongo Db</li>
          <li>Express</li>
          <li>React</li>
          <li>Node js</li>
        </ul>
      </article>
    </div>
  );
};
export default WelcomePage;
