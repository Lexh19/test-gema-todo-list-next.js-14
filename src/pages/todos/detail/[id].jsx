import { validateToken } from "@/hooks/tokenValidation";
import { getDetailTodo } from "@/modules/fetch/todos";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import formatDateTime from "@/utils/formatDateTime";
import Head from "next/head";

const DetailTodo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetailTodos = async () => {
      try {
        if (id) {
          const userId = await validateToken();
          const getTodos = await getDetailTodo(parseInt(id));
          
          // Periksa validitas user
          if (getTodos.data.user_id !== userId) {
            router.push("/todos");
            return;
          }
          
          setTodo(getTodos.data);
        }
      } catch (err) {
        router.push("/todos");
      } finally {
        setLoading(false);
      }
    };

    getDetailTodos();
  }, [id, router]);

  return (
    <>
      <Head>
        <title>Detail Todo | To do lits</title>
      </Head>
      <div className="w-full h-screen">
        <div className="absolute ml-5 mt-5">
          <p className="text-back cursor-pointer" onClick={() => router.push("/todos")}>
            Kembali
          </p>
        </div>
        <div className="flex justify-center items-center h-screen">
          <div className="card-detail bg-gray-300 rounded-lg p-10 relative">
            {loading ? (
              <p className="text-center text-4xl font-bold">Loading...</p>
            ) : (
              todo ? (
                <>
                  <p className="text-4xl font-bold">{todo.todo}</p>
                  <p className="text-2xl">{todo.description}</p>
                  <p className="absolute top-10 right-10">{formatDateTime(todo.datetime)}</p>
                </>
              ) : (
                <p className="text-center text-2xl font-semibold text-red-600">Todo tidak ditemukan.</p>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailTodo;
