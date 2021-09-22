import "./Home.css";
const ListItem = (props) => {
  const { nama, umur, jenis_kelamin } = props.data;
  const { hapusPengunjung, editAnggota } = props;

  return (
    <tbody>
      <tr>
        <td>{nama}</td>
        <td>{umur}</td>
        <td>{jenis_kelamin}</td>
        <td className="removeBorder" onClick={editAnggota}>
          <button>edit nama</button>
        </td>
        <td className="removeBorder" onClick={hapusPengunjung}>
          <button>Hapus</button>
        </td>
      </tr>
    </tbody>
  );
};

export default ListItem;
