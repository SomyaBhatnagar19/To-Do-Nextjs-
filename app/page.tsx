import { BiSearch, BiCircle, BiTrash, BiPlus, BiCheck } from "react-icons/bi";

export default function Home() {
  return (
    // background
    <div className="bg-zinc-400 min-h-screen">
    {/* header */}
      <div className="bg-slate-700 p-4 shadow-lg">
        <h1 className="text-xl font-semibold text-white italic">To-Do</h1>
      </div>
      <div className="m-auto mt-9 ml-8 mr-8 bg-slate-700 shadow-lg rounded">
        <div className="bg-slate-800 p-2 rounded flex justify-between items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="rounded bg-gray-400 pl-10 pr-2"
            />
            <BiSearch className="absolute left-3 top-1 text-gray-900" />
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <BiPlus />
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              <BiTrash />
            </button>
          </div>
        </div>
      {/* to-do card */}
        <div className="p-4">
          <div className="bg-slate-800 p-2 text-white text-sm italic font-mono shadow-md flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BiCircle />
              Your to-dos
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-purple-700 text-white text-bold px-3 py-2 rounded-lg hover:bg-purple-500">
                <BiCheck />
              </div>
              <div className="bg-pink-700 text-white text-bold px-3 py-2 rounded-lg hover:bg-pink-500">
                <BiTrash />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
