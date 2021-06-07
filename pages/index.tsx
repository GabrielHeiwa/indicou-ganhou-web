import axios from "axios";
import { useEffect, useState } from "react"
import Indication_Components from "../components/indications.components";

interface indications_data {
    indications_uuid: string;
    indications_nome_do_indicador: string;
    indications_nome_do_indicado: string;
    indications_telefone_do_indicado: string;
    indications_fatura_do_indicado: string;
    indications_longitude_do_indicado: string;
    indications_latitude_do_indicado: string;
    indications_descricao_do_indicado: string;
}

export default function Index() {
    const [indications, set_indications] = useState([] as indications_data[]);


    useEffect(() => {

        (async () => {
            const { data } = await axios({
                method: "POST",
                url: "/api/show",
            });

            alert(data.msg);

            if (data.status === 200)
                return set_indications(curr => data.indications);

            return alert("Erro ao coletar as indicações!");
        })();

    }, []);

    const handle_delete_indication = async function (indications_uuid: string) {
        const { data } = await axios({
            method: "POST",
            url: "/api/delete",
            data: { indications_uuid: indications_uuid },
        });

        if (data.status === 200)
            set_indications(curr => curr.filter(c => c.indications_uuid !== indications_uuid));

        return alert(data.msg);
    };

    return <div className="indication-container">
        {indications.map(indication => (
            <Indication_Components
                key={indication.indications_uuid}
                descricao_do_indicado={indication.indications_descricao_do_indicado}
                fatura_do_indicado={indication.indications_fatura_do_indicado}
                latitude_do_indicado={indication.indications_latitude_do_indicado}
                longitude_do_indicado={indication.indications_longitude_do_indicado}
                nome_do_indicado={indication.indications_nome_do_indicado}
                nome_do_indicador={indication.indications_nome_do_indicador}
                telefone_do_indicado={indication.indications_telefone_do_indicado}>
                <button id={indication.indications_uuid}
                    onClick={(e) => handle_delete_indication(e.target.id)}>
                    Deletar</button>
            </Indication_Components>

        ))}
    </div>
}