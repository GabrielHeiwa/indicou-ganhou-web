import conn from "../../connection";

import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { indications_uuid } = req.body;
    try {
        const r = await conn("indications")
            .delete()
            .where({indications_uuid: indications_uuid});

        console.log(r);

        return res.json({
            status: 200,
            msg: "Sucesso ao deletar a indicação!",
        });

    } catch (err) {
        return res.json({
            status: 400,
            msg: "Erro ao deletar indicação!",
            err,
        })
    }
};