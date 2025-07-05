// import React, { useEffect, useState } from "react";
// import { MdVerified } from "react-icons/md";
// import { GoUnverified } from "react-icons/go";
// import CartButton from "./CartButton";

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

// function AlertShow({ data, id, max, handleRemove }) {
//   if (!data) {
//     return;
//   }

//   console.log("Alert show page start main", data);
//   console.log("max : ", max);

//   let typee;
//   let messagee;
//   let colorr;
//   let Iconr;
//   let value;

//   for (let loop = 0; loop <= max; loop++) {
//     if (data[loop] != undefined) {
//       value = loop;
//       console.log("loop", loop);
//       const { type, message } = data[loop];
//       const { color, Icon } = theme[type];
//       typee = type;
//       messagee = message;
//       colorr = color;
//       Iconr = Icon;
//     }
//   }
//   useEffect(() => {
//     const timeout = setTimeout(handleRemove(value), 3 * 1000);
//     return clearTimeout(timeout);
//   }, []);

//   return (
//     <div>
//       <div className="flex items-center justify-center my-4 bg-white p-4">
//         <div className="flex items-center space-x-3">
//           <Iconr className={"text-6xl " + colorr} />
//           <div className="font-bold text-xl">{typee}</div>
//           <div>{messagee}</div>
//         </div>
//         <div className="w-20 h-10">
//           <CartButton data="Dismiss" onClick={() => handleRemove(value)} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AlertShow;
