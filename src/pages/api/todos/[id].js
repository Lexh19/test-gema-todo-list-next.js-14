// get all todos by user_id and add todos
const { PrismaClient } = require("@prisma/client");
const dateFormat = require("@/utils/timezone");

const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (
    req.method !== "GET" &&
    req.method !== "POST" &&
    req.method !== "PUT" &&
    req.method !== "DELETE"
  ) {
    return res.status(405).json({
      status: "Gagal",
      message: "Method yang digunakan salah...",
    });
  }

  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        if (!id) {
          throw new Error(400);
        }
        const getAllTodos = await prisma.Todos.findMany({
          where: {
            user_id: parseInt(id),
          },
          orderBy: [
            {
              is_done: "asc",
            },
            {
              updatedAt: "desc", 
            },
          ],
        });

        if (!getAllTodos || getAllTodos == 0) {
          throw new Error(404);
        }

        res.status(200).json({
          status: "Berhasil",
          message: "Data Todo berhasil didapatkan.",
          data: getAllTodos,
        });
      } catch (err) {
        if (err.message == 400) {
          res.status(400).json({
            status: "Gagal.",
            message: "id kosong.",
          });
        } else if (err.message == 404) {
          res.status(404).json({
            status: "Gagal.",
            message: "data todo tidak ditemukan.",
          });
        } else {
          res.status(500).json({
            status: "Gagal.",
            message: err.message,
          });
        }
      }
      break;

    case "POST":
      try {
        const checkUser = await prisma.Users.findUnique({
          where: { id: parseInt(id) },
        });
        if (!checkUser || checkUser == null) {
          throw new Error(401);
        }
        const { todo, description, datetime } = req.body;
        const time = datetime || dateFormat();
        if (!todo || !description || !id) {
          throw new Error(400);
        }

        await prisma.Todos.create({
          data: {
            user_id: parseInt(id),
            todo: todo,
            description: description,
            datetime: time,
            createdAt: dateFormat(),
            updatedAt: dateFormat(),
          },
        });

        res.status(200).json({
          status: "Berhasil",
          message: "Data todo berhasil ditambahkan.",
        });
      } catch (err) {
        if (err.message == 400) {
          res.status(400).json({
            status: "Gagal.",
            message: "beberapa data kosong.",
          });
        } else if (err.message == 401) {
          res.status(401).json({
            status: "Gagal.",
            message: "Data user tidak ditemukan.",
          });
        } else {
          res.status(500).json({
            status: "Gagal.",
            message: err.message,
          });
        }
      }
      break;

    case "PUT":
      try {
        if (!id) {
          throw new Error(400);
        }

        const checkTodo = await prisma.todos.findUnique({ where: { id: parseInt(id) } });
        if (!checkTodo || checkTodo == 0) {
          throw new Error(404);
        }

        const { todo, description, datetime } = req.body;
        const time = datetime || dateFormat();
        if (!todo || !description) {
          throw new Error(400);
        }

        await prisma.todos.update({
          where: {
            id: parseInt(id),
          },
          data: {
            todo: todo,
            description: description,
            datetime: time,
            updatedAt: dateFormat(),
          },
        });

        res.status(200).json({
          status: "Berhasil",
          message: "data todo berhasil diperbarui.",
        });
      } catch (err) {
        if (err.message == 400) {
          res.status(400).json({
            status: "Gagal",
            message: "beberapa nilai kosong.",
          });
        } else if (err.message == 404) {
          res.status(404).json({
            status: "Gagal",
            message: "Data todos tidak ditemukan.",
          });
        } else {
          res.status(500).json({
            status: "Gagal",
            message: err.message,
          });
        }
      }
      break;

    case "DELETE":
      try {
        if (!id) {
          throw new Error(400);
        }

        const deleleTodo = await prisma.todos.delete({ where: { id: parseInt(id) } });
        if (!deleleTodo || deleleTodo == 0) {
          throw new Error(404);
        }

        res.status(200).json({
          status: "Berhasil",
          message: "Data todo berhasil dihapus.",
        });
      } catch (err) {
        if (err.message == 400) {
          res.status(400).json({
            status: "Gagal",
            message: "id kosong.",
          });
        } else if (err.message == 404) {
          res.status(404).json({
            status: "Gagal",
            message: "Data todos tidak ditemukan.",
          });
        } else {
          res.status(500).json({
            status: "Gagal",
            message: err.message,
          });
        }
      }
      break;
  }
};

export default handler;
