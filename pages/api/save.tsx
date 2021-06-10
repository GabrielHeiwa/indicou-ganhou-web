
import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../connection";
async function save(req: NextApiRequest, res: NextApiResponse) {
    
    try {
        const save_status: { status: "ok" | "fail", msg: string } = await new Promise((resolve, reject) => conn.connect(async err => {
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
            } catch (err) {
                return resolve({
                    status: "fail",
                    msg: "Erro ao inserir indicação!",
                });
            };

        }));

        if (save_status.status === "ok") {
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
};

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}


export default allowCors(save);