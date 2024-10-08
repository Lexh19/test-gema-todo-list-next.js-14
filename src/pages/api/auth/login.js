const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret_key = process.env.NEXT_PUBLIC_JWT_SECRET || "koderahasianegara";
const prisma = new PrismaClient();

if (prisma) {
  console.log("Connected to database");
} else {
  console.log("Could not connect to database");
}

const handler = async (req, res) => {
    if(req.method !== "POST") {
        return res.status(405).json({
            status : "Gagal",
            message : "Method yang digunakan salah..."
        })
    }
    try {
        const { email, password } = req.body
        if(!email || !password) {
            throw new Error(400)
        }
        const user = await prisma.Users.findUnique({ where : { email : email } })
        if(!user) {
            throw new Error(401)
        }

        const checkPassword = bcrypt.compareSync(password, user.password)
        if(!checkPassword) {
            throw new Error(401)
        }

        const token = jwt.sign({ id: user.id }, secret_key)
        res.status(200).json({
            status : "Berhasil",
            message : "Anda berhasil login.",
            data : token
        })
    } catch (err) {
        if(err.message == 400) {
            res.status(400).json({
                status : "Gagal",
                message : "data email atau password kosong."
            })
        } else if(err.message == 401) {
            res.status(401).json({
                status : "Gagal",
                message : "data email atau password tidak ditemukan."
            })
        } else {
            res.status(500).json({
                status : 'gagal',
                message : err.message
            })
        }
    }
}

export default handler