import { MdDoubleArrow } from "react-icons/md";

function ParcelCard({ data, idx, oncardClickHandler }) {
    const onClickHandler = () => {
        oncardClickHandler(data._id, idx);
    };
    const { isRegisterToBranch, isOnTrevelling, isOnDelivery, isDelivered } =
        data.status;
    let imgPath = "/status/";
    switch (isRegisterToBranch) {
        case "false":switch (isOnT) {
            case value:
                
                break;
        
            default:
                break;
        }
            break;
        case "process":
            break;
        case "finish":
            break;

        default:
            break;
    }
    console.log(isRegisterToBranch, isOnTrevelling, isOnDelivery, isDelivered);
    return (
        <button onClick={onClickHandler}>
            <div className="flex flex-col items-center border p-6 h-full w-full space-y-4">
                <img
                    src="/images/Box.svg"
                    alt="box-img"
                    className="h-20 w-20"
                ></img>
                <div key={idx} className=" space-y-2">
                    <div className="flex">
                        <div className="mr-2 px-[0.457rem] text-white bg-brightRed rounded-full">
                            <div>{idx + 1}</div>
                        </div>
                        <span className="text-black font-semibold">
                            {data._id}
                        </span>
                    </div>
                    <div className="items-center flex flex-col">
                        <div className="text-black font-semibold">
                            <span className="text-slate-500">จาก:</span>{" "}
                            {`${data.sender.firstname} ${data.sender.lastname} (${data.sender.province})`}{" "}
                        </div>
                        <MdDoubleArrow className="text-brightRed inline-block mr-1 rotate-90" />{" "}
                        <div className="text-black font-semibold">
                            <span className="text-slate-500">ถึง:</span>
                            {`${data.receiver.firstname} ${data.receiver.lastname} (${data.receiver.province})`}{" "}
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
}

export default ParcelCard;
