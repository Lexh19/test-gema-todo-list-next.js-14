import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LayoutSecond from "@/components/layouts/layout.second";
import { validateToken } from "@/hooks/tokenValidation";
import {
  addTodos,
  deleteTodos,
  getAllTodosByUserId,
  updateStatusTodo,
  updateTodos,
} from "@/modules/fetch/todos";
import formatDateTime from "@/utils/formatDateTime";
import Head from "next/head";

const TodosPage = () => {
  const [id, setId] = useState(null);
  const [idTodo, setIdTodo] = useState(null);
  const [todo, setTodo] = useState("");
  const [desc, setDesc] = useState("");
  const [dataTodos, setDataTodos] = useState([]);
  const [datetime, setDatetime] = useState("");
  const [msg, setMsg] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getId = async () => {
      const id = await validateToken();
      setId(id);
      return id;
    };

    const getDataTodos = async () => {
      try {
        const idUser = await getId();
        const getData = await getAllTodosByUserId(idUser);
        setDataTodos(getData.data);
      } catch (err) {
        setMsg(err.message);
      }
    };

    getDataTodos();
  }, []);

  const handleTodo = async (e) => {
    e.preventDefault();
    try {
      const payload = { todo, description: desc, datetime };
      if (isUpdate) {
        await updateTodos(idTodo, payload);
      } else {
        await addTodos(id, payload);
      }
      window.alert("Operasi berhasil!");
      router.reload();
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodos(id);
      window.alert("Todo berhasil dihapus!");
      router.reload();
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      await updateStatusTodo(id, true);
      window.alert("Status berhasil diperbarui!");
      router.reload();
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleDatetimeChange = (e) => {
    const inputDate = new Date(e.target.value);
    const isoDate = inputDate.toISOString();
    setDatetime(isoDate);
  };

  return (
    <>
      <Head>
        <title>Data Todo | To do lits</title>
      </Head>
      <LayoutSecond>
        <div className="flex flex-col justify-center items-center w-full">
          <p className="text-4xl font-bold">To do lits</p>
          <div className="mt-3 flex flex-col justify-center items-center gap-3 w-full">
            <input
              className="inp h-12 pl-3 rounded-xl"
              type="text"
              placeholder="Apa yang ingin anda lakukan?"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              required
            />
            <input
              value={desc}
              className="inp h-12 pl-3 rounded-xl"
              type="text"
              placeholder="Deskripsikan kegiatan anda..."
              onChange={(e) => setDesc(e.target.value)}
              required
            />
            <input
              className="inp h-12 px-3 rounded-xl"
              type="datetime-local"
              value={datetime.slice(0, 16)}
              onChange={handleDatetimeChange}
              required
            />
            <div className="flex gap-5 mt-3">
              <button
                className="text-xl font-bold text-white bg-red-600 px-5 py-1 rounded-lg hover:bg-red-500"
                onClick={() => {
                  setTodo("");
                  setDesc("");
                  setDatetime("");
                }}
              >
                Hapus
              </button>
              <button
                className="text-xl font-bold text-white bg-green-600 px-5 py-1 rounded-lg hover:bg-green-500"
                onClick={handleTodo}
              >
                {isUpdate ? "Update" : "Upload"}
              </button>
            </div>
          </div>
          <div className="mt-5 flex flex-col justify-center items-center gap-3 w-full">
            {dataTodos.length === 0 ? (
              <div className="text-center mt-10">
                <p className="text-4xl text-red-600 font-bold">404</p>
                <p className="text-2xl font-semibold">{msg || "Tidak ada Todo ditemukan."}</p>
              </div>
            ) : (
              dataTodos.map((data) => (
                <div key={data.id} className="card-todo bg-gray-300 p-5 mb-5 rounded-lg relative">
                  <p className="text-2xl font-bold">{data.todo}</p>
                  <div className="desc bg-gray-200 p-2 rounded-lg my-1">
                    <p className="text-lg">{data.description}</p>
                    <p className="text-xs mt-1">{formatDateTime(data.datetime)}</p>
                  </div>
                  <div
                    className={`absolute right-5 top-5 text-white px-5 py-1 rounded-lg ${data.is_done ? "bg-green-600" : "bg-red-600"}`}
                  >
                    <p className="text-xl font-semibold">{data.is_done ? "Selesai" : "Todo"}</p>
                  </div>
                  <div className="flex gap-5 justify-end mt-5">
                    <button
                      className="text-xl font-bold text-white bg-blue-600 px-5 py-1 rounded-lg hover:bg-blue-500"
                      onClick={() => router.push(`/todos/detail/${data.id}`)}
                    >
                      Detail
                    </button>
                    <button
                      className="text-xl font-bold text-white bg-red-600 px-5 py-1 rounded-lg hover:bg-red-500"
                      onClick={() => handleDeleteTodo(data.id)}
                    >
                      Delete
                    </button>
                    {!data.is_done && (
                      <>
                        <button
                          className="text-xl font-bold text-white bg-yellow-600 px-5 py-1 rounded-lg hover:bg-yellow-500"
                          onClick={() => {
                            setIdTodo(data.id);
                            setIsUpdate(true);
                            setTodo(data.todo);
                            setDesc(data.description);
                            setDatetime(data.datetime);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="text-xl font-bold text-white bg-green-600 px-5 py-1 rounded-lg hover:bg-green-500"
                          onClick={() => handleUpdateStatus(data.id)}
                        >
                          Update Status
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </LayoutSecond>
    </>
  );
};

export default TodosPage;
