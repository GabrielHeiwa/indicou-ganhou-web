
import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../connection";
export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const save_status: {status: "ok" | "fail", msg: string} = await new Promise((resolve, reject) => conn.connect(async err => {
            if (err) return console.error(err);

            try {
                await conn
                .db("engfor")
                .collection("indications")
                .insertOne(req.body);
                return resolve({
                    status: "ok",
                    msg: "Indicação inserida com sucesso!",
                });
            } catch(err) {
                return resolve({
                    status: "fail",
                    msg: "Erro ao inserir indicação!",
                });
            };

        }));

        if (save_status.status === "ok" ) {
            return res.json({
                status: 200,
                msg: save_status.msg,
            });
        } else if (save_status.status === "fail") {
            return res.json({
                status: 400,
                msg: save_status.msg,
            });
        } else {
            return res.json({
                status: 400,
                msg: "Erro na operação de salvar a indicação!",
            });
        };

    } catch (err) {
        return res.json({
            status: 400,
            msg: "Erro ao salvar no banco de dados!",
            err,
        });
    }


}