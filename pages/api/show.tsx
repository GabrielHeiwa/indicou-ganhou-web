import conn from "../../connection";
import { NextApiRequest, NextApiResponse } from "next";
import { Cursor } from "mongodb";

export default async function show(req: NextApiRequest, res: NextApiResponse) {
    try {
        let data = await new Promise((resolve, reject) =>
            conn.connect(async db => {
                const d = await conn
                    .db("engfor")
                    .collection("indications")
                    .find({})
                    .toArray();

                resolve(d);
            }));


        return res.json({
            status: 200,
            indications: data,
            msg: "Dados coletados com sucesso!",
        });

    } catch (err) {
        return res.json({
            status: 400,
            msg: "Erro ao coletar os dados do banco de dados!",
            err,
        });
    };


}