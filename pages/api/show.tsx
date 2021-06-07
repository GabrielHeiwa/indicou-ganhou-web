import conn from "../../connection";

import { NextApiRequest, NextApiResponse } from "next";

export default async function show(req: NextApiRequest, res: NextApiResponse) {
    try {
        const indications = await conn("indications")
            .select("*");

        return res.json({
            status: 200,
            indications,
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