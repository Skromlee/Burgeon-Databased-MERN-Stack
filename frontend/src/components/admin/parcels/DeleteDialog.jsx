import { AiFillInfoCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteDialog = ({ exitHandler, confirmHandler, id }) => {
    return (
        <div className=" bg-slate-200 rounded-xl h-fit w-fit absolute top-0 left-0 right-0 bottom-0 m-auto transition">
            <div className=" p-6 flex flex-col space-y-4 transition">
                <div className=" flex justify-between transition">
                    <div className=" flex items-center space-x-2 transition">
                        <RiDeleteBin6Line size={24} />
                        <h1 className="text-xl">Confirm delete</h1>
                    </div>
                    <button
                        onClick={exitHandler}
                        className=" font-bold text-slate-500 text-lg hover:text-black transition"
                    >
                        X
                    </button>
                </div>
                <div className="border-t-2 border-slate-300"></div>
                <div className="space-y-2">
                    <p>
                        Are you sure you wish to delete the Employee following?
                    </p>
                    <p className="text-red-600">{`"${id}"`}</p>
                    <div className="bg-[#fcf8e3] p-4 flex items-center space-x-2">
                        <AiFillInfoCircle className="text-[#88683b]" />
                        <p className="text-[#88683b]">
                            Once deleted, this item will not be recoverable
                        </p>
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={exitHandler}
                        className="bg-slate-400 hover:bg-slate-300 text-white py-2 px-4"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirmHandler}
                        className="bg-red-500 hover:bg-red-300 text-white py-2 px-4"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
export default DeleteDialog;
