const { PrismaClient } = require("@prisma/client");
const dateFormat = require("@/utils/timezone");

const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({
      status: "Gagal",
      message: "Method yang digunakan salah...",
    });
  }

  const { id } = req.query;
  const { status } = req.body;
  try {
    if (!id || !status || (status !== false && status !== true)) {
      throw new Error(400);
    }

    const checkTodo = await prisma.todos.findUnique({ where: { id: parseInt(id) } });
    if (!checkTodo || checkTodo == 0) {
      throw new Error(404);
    }

    await prisma.todos.update({
      where: { id: parseInt(id) },
      data: {
        is_done: status,
        updatedAt: dateFormat(),
      },
    });

    res.status(200).json({
      status: "Berhasil",
      message: "Data todo berhasil diperbarui.",
    });
  } catch (err) {
    if (err.message == 400) {
      res.status(400).json({
        status: "Gagal",
        message: "beberapa nilai kosong atau tidak sesuai format.",
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
