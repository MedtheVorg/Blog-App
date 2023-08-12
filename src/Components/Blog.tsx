import { Link } from 'react-router-dom';
import { AppContext } from '../hooks/UseContextCustomHook';
import { useContext } from 'react';
import { formatISO9075 } from 'date-fns';

const Blog = (props) => {
  const { title, summary, content, blogImage, author, createdAt, _id } = props;
  return (
    <article className="flex  flex-col md:flex-row shadow-lg rounded-xl overflow-hidden    hover:scale-[1.01] transition-all  text-[#101113] bg-white">
      {/* blog image */}
      <div className="flex-[0.8] ">
        <img
          src={`${import.meta.env.VITE_API_URL}/uploads/${blogImage}`}
          alt=""
          className="object-cover h-full w-full aspect-video p-2"
        />
      </div>
      {/* blog header */}
      <div className=" flex-[1] p-8 ">
        <Link to={`/blog/${_id}`}>
          <h2 className="text-2xl font-semibold">{title}</h2>
        </Link>
        <div className="mt-2 mb-4 text-gray-500">
          <span className="mr-4 italic">{author.username}</span>
          <span>{formatISO9075(new Date(createdAt))}</span>
        </div>
        <p>{summary.length > 50 ? `${summary.slice(0, 50)}...` : summary}</p>
      </div>
    </article>
  );
};
export default Blog;
