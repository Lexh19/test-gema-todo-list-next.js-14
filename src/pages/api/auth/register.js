const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const dateFormat = require("@/utils/timezone");

const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: "Gagal",
      message: "Method yang digunakan salah...",
    });
  }
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error(400);
    }

    const checkEmail = await prisma.Users.findUnique({ where: { email } });
    if (checkEmail) {
      throw new Error(401);
    }

    console.log(email);
    const hashPassword = bcrypt.hashSync(password, 10);

    await prisma.Users.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        createdAt: dateFormat(),
        updatedAt: dateFormat(),
      },
    });

    res.status(200).json({
      status: "Berhasil",
      message: "Register berhasil.",
    });
  } catch (err) {
    if (err.message == 401) {
      res.status(401).json({
        status: "Gagal",
        message: "Email sudah terdaftar.",
      });
    } else if (err.message == 400) {
      res.status(400).json({
        status: "Gagal",
        message: "beberapa data masukan kosong.",
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
