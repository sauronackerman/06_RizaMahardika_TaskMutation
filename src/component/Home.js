// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import PassengerInput from "./PassengerInput";
import ListPassenger from "./ListPassenger";
import Header from "./Header";

// const initialValue = [
//   {
//     id: "",
//     nama: "",
//     usia: "",
//     jenis_kelamin: "",
//   },
// ];
function Home() {
  // const [data, setData] = useState(initialValue);

  // const hapusPengunjung = (id) => {
  //   setData(
  //     data.filter((item) => {
  //       return item.id !== id;
  //     })
  //   );
  // };

  // const tambahPengunjung = (newUser) => {
  //   const newData = { id: uuidv4(), ...newUser };
  //   setData((oldData) => [...oldData, newData]);
  // };

  return (
    <div>
      <Header />
      {/* <ListPassenger data={data} hapusPengunjung={hapusPengunjung} /> */}
      <ListPassenger />
      {/* <PassengerInput tambahPengunjung={tambahPengunjung} /> */}
    </div>
  );
}

export default Home;
