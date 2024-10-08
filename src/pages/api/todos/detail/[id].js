// detail todos, delete todos, and update todos
const { PrismaClient } = require("@prisma/client");
const dateFormat = require("@/utils/timezone");

const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({
      status: "Gagal",
      message: "Method yang digunakan salah...",
    });
  }

  const { id } = req.query;
  try {
    if (!id) {
      throw new Error(400);
    }

    const getDetailTodo = await prisma.todos.findUnique({
      where: { id: parseInt(id) },
    });
    if (!getDetailTodo || getDetailTodo == 0) {
      throw new Error(404);
    }

    res.status(200).json({
      status: "Berhasil",
      message: "Data detail todo Berhasil didapatkan.",
      data: getDetailTodo,
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
};

export default handler;
