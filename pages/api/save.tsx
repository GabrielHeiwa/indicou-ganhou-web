
import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../connection";
export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        conn.connect(async err => {
            if (err) return console.error(err);

            await conn
                .db("engfor")
                .collection("indications")
                .insertOne(req.body);

            await conn.close();

            return res.json({
                status: 200,
                msg: "Indicação salva com sucesso!",
            });
        });

    } catch (err) {
        return res.json({
            status: 400,
            msg: "Erro ao salvar no banco de dados!",
            err,
        });
    }


}