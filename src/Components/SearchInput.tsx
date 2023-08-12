const SearchInput = ({ value, setValue }) => {
  return (
    <div className="">
      <input
        className="p-2 rounded-sm outline-[#2B75EC] border-2 text-black font-normal w-full"
        placeholder="search..."
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
export default SearchInput;
