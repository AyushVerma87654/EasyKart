import React, { FC, useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import CartButton from "./CartButton";
import AlertShow from "./AlertShow";

// const theme = {
//   success: {
//     color: "text-green-500",
//     Icon: MdVerified,
//   },
//   error: {
//     color: "text-red-500",
//     Icon: GoUnverified,
//   },
// };

// type AlertListProps = { alert: alertType };

const AlertList = () => {
  // const [list, setList] = useState([
  //   { 0: { type: "success", message: "Login Successful" } },
  //   { 1: { type: "error", message: "Login Failed" } },
  // ]);
  // const [list, setList] = useState<alertType[]>([]);
  // const [id, setId] = useState(-1);

  // // useEffect(() => {
  // //   if (alert) {
  // //     const newList = { [id + 1]: alert };
  // //     const newLists = [...list, newList];
  // //     setList(newLists);
  // //     setId(id + 1);
  // //   }
  // // }, [alert]);

  // // useEffect(() => {
  // //   if (list) {
  // //     for (let i = 0; i < list.length; i++) {
  // //       const timeout = setTimeout(handleRemove(i), 10 * 1000);
  // //       return clearTimeout(timeout);
  // //     }
  // //   }
  // // }, [list]);
  // // console.log("list", list);

  // const handleRemove = (id: number) => {
  //   console.log(id);
  //   let newList = [];
  //   let j = 0;
  //   for (let i = 0; i < list.length; i++) {
  //     console.log("run", i);
  //     console.log(id);
  //     if (i == id) {
  //       console.log("Mil gaya", list[i]);
  //     } else {
  //       newList[j++] = list[i];
  //     }
  //   }
  //   console.log("Newlist", newList);
  //   // list.map((item) => {
  //   //   if (item[id] != id) {
  //   //     newList.push(item);
  //   //   }
  //   // });
  //   setList(newList);
  // };
  // if (!alert) {
  //   return;
  // }
  // console.log("Alert List page last main", list);

  return (
    <div>
      <div className="flex flex-col items-center justify-between my-4 bg-white p-4">
        {/* {list.map((item: alertType) => (
          // <AlertShow data={item} max={id} handleRemove={handleRemove} />
        ))} */}
      </div>
    </div>
  );
};

export default AlertList;
