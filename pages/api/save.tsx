
import {NextApiRequest, NextApiResponse} from "next";
import conn from "../../connection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        await conn("indications")
            .insert(req.body);

        return res.json({
            status: 200,
            msg: "Indicação salva com sucesso!",
        });

    } catch(err) {
        return res.json({
            status: 400,
            msg: "Erro ao salvar no banco de dados!",
            err,
        });
    }

}