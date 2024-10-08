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
  const [idTodo, setIdTodo] = useState(null)
  const [todo, setTodo] = useState(null);
  const [desc, setDesc] = useState(null);
  const [dataTodos, setDataTodos] = useState(null);
  const [datetime, setDatetime] = useState("");
  const [msg, setMsg] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getId = async () => {
      const id = await validateToken();
      setId(id)
      return id;
    };

    const getDataTodos = async () => {
      try {
        const idUser = await getId();
        const getData = await getAllTodosByUserId(idUser);
        setDataTodos(getData.data);
      } catch (err) {
        const message = err.message;
        setMsg(message);
      }
    };

    getId();
    getDataTodos();
  }, [id]);

  const handleTodo = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate == true) {
        const response = await updateTodos(idTodo, {
          todo: todo,
          description: desc,
          datetime: datetime,
        });
        window.alert(response.message);
        router.reload();
      } else {
        const response = await addTodos(id, {
          todo: todo,
          description: desc,
          datetime: datetime,
        });
        window.alert(response.message);
        router.reload();
      }
    } catch (err) {
      window.alert(err.message);
    }
  };

  const deleteValue = async (e) => {
    e.preventDefault();
    setTodo("");
    setDesc("");
    setDatetime("");
  };

  const handleDatetimeChange = (e) => {
    const inputDate = new Date(e.target.value);
    const isoDate = inputDate.toISOString();
    setDatetime(isoDate);
  };

  const handleUpdateStatus = async (id) => {
    const status = true;
    const response = await updateStatusTodo(id, status);
    if (response) {
      window.alert(response.message);
      router.reload();
    }
  };

  const handleDeleteTodo = async (id) => {
    const response = await deleteTodos(id);
    if (response) {
      window.alert(response.message);
      router.reload();
    }
  };

  return (
    <>
    <Head>
      <title>Data Todo | TodosNow</title>
    </Head>
      <LayoutSecond>
        <div className="flex flex-col justify-center items-center w-full">
          <p className="text-4xl font-bold">TodosNow</p>
          <div className="mt-3 flex flex-col justify-center items-center gap-3 w-full">
            <input
              className="inp h-12 pl-3 rounded-xl"
              type="text"
              placeholder="Apa yang ingin anda lakukan?"
              value={todo}
              onChange={(e) => {
                const todo = e.target.value;
                setTodo(todo);
              }}
            />
            <input
              value={desc}
              className="inp h-12 pl-3 rounded-xl"
              type="text"
              placeholder="Deskripsikan kegiatan anda..."
              onChange={(e) => {
                const desc = e.target.value;
                setDesc(desc);
              }}
            />
            <input
              className="inp h-12 px-3 rounded-xl"
              type="datetime-local"
              value={datetime.slice(0, 16)}
              onChange={handleDatetimeChange}
            />
            <div className="flex gap-5 mt-3">
              <button
                className="text-xl font-bold text-white bg-red-600 px-5 py-1 rounded-lg hover:bg-red-500"
                onClick={deleteValue}
              >
                Hapus
              </button>
              <button
                className="text-xl font-bold text-white bg-green-600 px-5 py-1 rounded-lg hover:bg-green-500"
                onClick={handleTodo}
              >
                Upload
              </button>
            </div>
          </div>
          <div className="mt-5 w-full">
            {dataTodos == null || !dataTodos ? (
              <>
                <div className="text-center mt-10">
                  <p className="text-4xl text-red-600 font-bold">404</p>
                  <p className="text-2xl font-semibold">{msg}</p>
                </div>
              </>
            ) : (
              <>
                {dataTodos?.map((data) => {
                  return (
                    <>
                      <div className="card-todo bg-gray-300 p-5 mb-5 ml-auto mr-auto rounded-lg relative">
                        <p className="text-2xl font-bold">{data.todo}</p>
                        <div className="desc bg-gray-200 p-2 rounded-lg my-1 relative">
                          <p className="text-lg">{data.description}</p>
                          <p className="text-xs mt-1">
                            {formatDateTime(data.datetime)}
                          </p>
                        </div>
                        <div
                          className={
                            data.is_done == false
                              ? "absolute right-5 top-5 bg-red-600 text-white px-5 py-1 rounded-lg"
                              : "absolute right-5 top-5 bg-green-600 text-white px-5 py-1 rounded-lg"
                          }
                        >
                          <p className="text-xl font-semibold">
                            {data.is_done == false ? "Todo" : "Selesai"}
                          </p>
                        </div>
                        <div className="flex gap-5 justify-end mt-5">
                          <button className="text-xl font-bold text-white bg-blue-600 px-5 py-1 rounded-lg hover:bg-blue-500" onClick={() => router.push(`/todos/detail/${data.id}`)}>
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
                                  setIdTodo(data.id)
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
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </LayoutSecond>
    </>
  );
};

export default TodosPage;
