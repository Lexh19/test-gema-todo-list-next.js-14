// get all todos
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({
      status: "Gagal",
      message: "Method yang digunakan salah...",
    });
  }
  try {
    const getTodos = await prisma.Todos.findMany();
    if (!getTodos || getTodos == 0) {
      throw new Error(404);
    }

    res.status(200).json({
      status: "Berhasil",
      message: "Berikut semua data todos",
      data: getTodos,
    });
  } catch (err) {
    if (err.message == 404) {
      res.status(404).json({
        status: "Gagal",
        message: "Data Todos Kosong.",
      });
    } else {
      res.status(500).json({
        status: "gagal",
        message: err.message,
      });
    }
  }
};

export default handler;
