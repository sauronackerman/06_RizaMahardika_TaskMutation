import { useState } from "react";
import ListItem from "./ListItem";

import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import PassengerInput from "./PassengerInput";

const getDataListById = gql`
  query MyQuery($id: Int!) {
    anggota(where: { id: { _eq: $id } }) {
      nama
      umur
      jenis_kelamin
      id
    }
  }
`;

const getAnggota = gql`
  query MyQuery {
    anggota {
      nama
      umur
      jenis_kelamin
      id
    }
  }
`;

const DeleteUser = gql`
  mutation MyMutation($id: Int!) {
    delete_anggota_by_pk(id: $id) {
      id
    }
  }
`;

const InsertUser = gql`
  mutation MyMutation($object: anggota_insert_input!) {
    insert_anggota_one(object: $object) {
      id
    }
  }
`;

const UpdateAnggota = gql`
  mutation MyMutation($id: Int!, $nama: String!) {
    update_anggota_by_pk(pk_columns: { id: $id }, _set: { nama: $nama }) {
      id
    }
  }
`;

// MyQuery($jenis_kelamin: String!) {
//     anggota(where: {jenis_kelamin: {_eq: $jenis_kelamin}}) {
//       nama
//       umur
//       jenis_kelamin
//     }
//   }
//   MyQuery($nama: String!) {
//     anggota(where: {nama: {_eq: $nama}}) {
//       nama
//       umur
//       jenis_kelamin
//     }
//   }
//   MyQuery($umur: Int!) {
//     anggota(where: {umur: {_eq: $umur}}) {
//       nama
//       umur
//       jenis_kelamin
//     }
//   }

const ListPassenger = () => {
  const { data, loading, error } = useQuery(getAnggota);

  // === parsing ke passengerInput 1====
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [editing, setEditing] = useState(true);
  // const [stateAnggota, setAnggota] = useState({
  //   nama: "",
  //   umur: "",
  //   jenis_kelamin: "Laki-laki",
  //   editing: true,
  // });
  const onChangeNama = (e) => {
    if (e.target) {
      setNama(e.target.value);
    }
    // setAnggota({
    //   ...stateAnggota,
    //   [e.target.name]: e.target.value,
    // });
  };
  const onChangeUmur = (e) => {
    if (e.target) {
      setUmur(e.target.value);
    }
  };
  const onChangeGender = (e) => {
    if (e.target) {
      setJenisKelamin(e.target.value);
    }
  };
  const [insertUser, { loading: loadingInsert }] = useMutation(InsertUser, {
    // refetchQueries: [getDataListById],
    refetchQueries: [getAnggota],
  });
  // === akhir parsing ke passengerInput 1====

  const [deleteUser, { loading: loadingDelete }] = useMutation(DeleteUser, {
    // refetchQueries: [getDataListById],
    refetchQueries: [getAnggota],
  });
  const [updateAnggota, { loading: loadingUpdate }] = useMutation(
    UpdateAnggota,
    {
      refetchQueries: [getAnggota],
    }
  );
  // const [getName] = useLazyQuery(getDataListById);
  const [userId, setUserId] = useState(0);

  // const [option, setOption] = useState('')
  const onChangeUserId = (e) => {
    if (e.target) {
      setUserId(e.target.value);
    }
  };

  if (error) {
    return <h3>Terjadi kesalahan</h3>;
  }

  // const onGetData = () => {
  //   getName({
  //     variables: {
  //       id: userId,
  //     },
  //   });
  //   setState(data?.anggota);
  // };

  const hapusPengunjung = (xxxx) => {
    deleteUser({
      variables: {
        id: xxxx,
      },
    });
    setTimeout(() => {
      alert("data berhasil dihapus");
    }, 1500);
  };
  // === parsing ke passengerInput ====
  const tambahPengunjung = (e) => {
    insertUser({
      variables: {
        object: {
          nama: nama,
          umur: umur,
          jenis_kelamin: jenis_kelamin,
        },
      },
    });
    // setJenisKelamin("Laki-laki");
    // setNama("");
    // setUmur("");
  };
  const editAnggota = async (idx) => {
    const item = data?.anggota.find((v) => v.id === idx);
    const gantinama = prompt("masukan nama", item.nama);
    if (gantinama) {
      updateAnggota({
        variables: {
          id: idx,
          nama: gantinama,
        },
      });

      setTimeout(() => {
        alert("nama berhasil diubah");
      }, 3000);
    }
  };

  const handleSubmit = (e) => {
    if (nama.trim() && umur && jenis_kelamin) {
      if (umur >= 75 || umur <= 12) {
        alert("Umur tidak sesuai");
      } else {
        const newData = {
          nama: nama,
          umur: umur,
          jenisKelamin: jenis_kelamin,
          id: userId,
        };
        tambahPengunjung(newData);

        setNama("");
        setUmur("");
        setJenisKelamin("");
        setTimeout(() => {
          alert("data berhasil diinput");
        }, 3000);
        // setAnggota({
        //   ...stateAnggota,
        //   nama: "",
        //   umur: "",
        //   jenis_kelamin: "Laki-laki",
        // });
      }
    } else {
      alert("Data masih ada yang kosong");
    }
  };
  if (loading || loadingDelete || loadingInsert || loadingUpdate) {
    return <h3>Loading...</h3>;
  }

  const handleBukaInput = () => {
    // setJenisKelamin(...jenis_kelamin);
    // setNama(...nama);
    // setUmur(...umur);
    setEditing(false);
    // setAnggota({
    //   ...stateAnggota,
    //   editing: false,
    // });
  };
  const handleTutupInput = () => {
    // setNama(...nama);
    // setJenisKelamin(...jenis_kelamin);
    // setUmur(...umur);
    setEditing(true);
    // setAnggota({
    //   ...stateAnggota,
    //   editing: true,
    // });
  };
  let viewMode = {};
  let editMode = {};

  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }
  // === akhir parsing ke passengerInput 2====

  return (
    <>
      <div>
        {/* <input value={userId} onChange={onChangeUserId} />
        <button onClick={onGetData}>Get Data</button> */}

        {data?.anggota.length === 0 ? (
          <h3>Data tidak ditemukan</h3>
        ) : (
          <table cellPadding="5px" cellSpacing="0" style={{ margin: "auto" }}>
            <thead bgcolor="red">
              <tr>
                <td>Nama</td>
                <td>Umur</td>
                <td>Jenis Kelamin</td>
                <td bgcolor="white" className="removeBorder"></td>
              </tr>
            </thead>
            {data?.anggota.map((item) => (
              <ListItem
                key={item.id}
                id={item.id}
                data={item}
                editAnggota={() => editAnggota(item.id)}
                hapusPengunjung={() => hapusPengunjung(item.id)}
              />
            ))}
          </table>
        )}
      </div>
      <PassengerInput
        style={{ textTransform: "capitalizes" }}
        onChangeNama={onChangeNama}
        onChangeUmur={onChangeUmur}
        onChangeGender={onChangeGender}
        handleBukaInput={handleBukaInput}
        handleSubmit={handleSubmit}
        handleTutupInput={handleTutupInput}
        tambahPengunjung={tambahPengunjung}
        nama={nama}
        umur={umur}
        jenis_kelamin={jenis_kelamin}
        viewMode={viewMode}
        editMode={editMode}
      />
    </>
  );
};

export default ListPassenger;
