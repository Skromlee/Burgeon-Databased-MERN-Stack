import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Badge from "react-bootstrap/Badge";

import { MdDoubleArrow } from "react-icons/md";

function ParcelCard({ data, idx }) {
    console.log(data);
    return (
        <div className="flex">
            <img src="/images/Box.svg" className="h-56 w-56"></img>
            <div key={idx} className="border inline-block p-2 space-y-2">
                <div className="flex">
                    <div className=" mr-2 px-[0.457rem] text-white bg-brightRed rounded-full">
                        <div>{idx + 1}</div>
                    </div>
                    <span className="text-black font-semibold">{data._id}</span>
                </div>
                <div className="items-center">
                    <span className="text-slate-500">จาก:</span>{" "}
                    <span className="text-black font-semibold">
                        {`${data.sender.firstname} ${data.sender.lastname} (${data.sender.province})`}{" "}
                    </span>
                    <MdDoubleArrow className="text-brightRed inline-block mr-1" />
                    <span className="text-slate-500">ถึง:</span>{" "}
                    <span className="text-black font-semibold">
                        {`${data.receiver.firstname} ${data.receiver.lastname} (${data.receiver.province})`}{" "}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ParcelCard;
