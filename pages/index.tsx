import axios from "axios";
import { useEffect, useState } from "react"
import Indication_Components from "../components/indications.components";

interface indications_data {
    _id: string;
    nome_do_indicador: string;
    nome_do_indicado: string;
    telefone_do_indicado: string;
    url_image: string;
    longitude_do_indicado: string;
    latitude_do_indicado: string;
    descricao_do_indicado: string;
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
            data: { _id: indications_uuid },
        });

        if (data.status === 200)
            set_indications(curr => curr.filter(c => c._id !== indications_uuid));

        return alert(data.msg);
    };

    return <div className="indication-container">
        {indications.map(indication => (
            <Indication_Components
                key={indication._id}
                descricao_do_indicado={indication.descricao_do_indicado}
                fatura_do_indicado={indication.url_image}
                latitude_do_indicado={indication.latitude_do_indicado}
                longitude_do_indicado={indication.longitude_do_indicado}
                nome_do_indicado={indication.nome_do_indicado}
                nome_do_indicador={indication.nome_do_indicador}
                telefone_do_indicado={indication.telefone_do_indicado}>
                <button id={indication._id}
                    onClick={(e) => handle_delete_indication(e.currentTarget.id)}>
                    Deletar</button>
            </Indication_Components>

        ))}
    </div>
}