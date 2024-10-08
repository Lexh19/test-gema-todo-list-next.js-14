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

  useEffect(() => {
    const getDetailTodos = async () => {
      try {
        if (id) {
          const userId = await validateToken();
          const getTodos = await getDetailTodo(parseInt(id));
          if (
            userId != getTodos.data.user_id &&
            getTodos == null &&
            !getTodos
          ) {
            router.push("/todos");
          }
          setTodo(getTodos.data);
        }
      } catch (err) {
        router.push("/todos");
      }
    };

    getDetailTodos();
  }, [id]);

  return (
    <>
    <Head>
      <title>Detail Todo | TodosNow</title>
    </Head>
      <div className="w-full h-screen">
        <div className="absolute ml-5 mt-5">
          <p className="text-back" onClick={() => router.push("/todos")}>
            Kembali
          </p>
        </div>
        <div className="flex justify-center items-center h-screen">
          <div className="card-detail bg-gray-300 rounded-lg p-10 relative">
            {todo == null || !todo ? (
              <>
              <p className="text-center text-4xl font-bold">Loading...</p>
              </>
            ) : (
              <>
                <p className="text-4xl font-bold">{todo.todo}</p>
                <p className="text-2xl">{todo.description}</p>
                <p className="absolute top-10 right-10">{formatDateTime(todo.datetime)}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailTodo;
