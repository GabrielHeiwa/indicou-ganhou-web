import conn from "../../connection";
import { ObjectId } from "mongodb";

import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { _id } = req.body;
    try {
        const delete_status: { status: "ok" | "fail", msg: string } = await new Promise((resolve, reject) => conn.connect(async err => {
            if (err) return console.error(err);

            try {
                await conn.db("engfor").collection("indications").deleteOne({ _id: new ObjectId(_id) });
                return resolve({
                    status: "ok",
                    msg: "Sucesso ao deletar indicação!",
                });
            } catch (err) {
                return resolve({
                    status: "fail",
                    msg: "Erro ao deletar indicação!",
                });
            };

        }));

        if (delete_status.status === "ok") {
            return res.json({
                status: 200,
                msg: delete_status.msg,
            });
        } else if (delete_status.status === "fail"){
            return res.json({
                status: 400,
                msg: delete_status.msg,
            });
        } else {
            return res.json({
                status: 400,
                msg: "Erro na operação de deletar a indicação!",
            });
        };
    } catch (err) {
        return res.json({
            status: 400,
            msg: "Erro ao deletar indicação!",
            err,
        })
    }
};