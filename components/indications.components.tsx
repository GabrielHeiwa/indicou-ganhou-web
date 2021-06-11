import axios from "axios";

export default function Indication_Components({
    nome_do_indicador,
    nome_do_indicado,
    telefone_do_indicado,
    fatura_do_indicado,
    longitude_do_indicado,
    latitude_do_indicado,
    descricao_do_indicado,
    children
}) {

    return <div className="indication">
        <p>{nome_do_indicador}</p>
        <p>{nome_do_indicado}</p>
        <p>{telefone_do_indicado}</p>
        <p>{descricao_do_indicado}</p>
        <a href={fatura_do_indicado} target="_blank">Fatura</a>
        <a href={`https://www.google.com/maps/search/?api=1&query=${latitude_do_indicado},${longitude_do_indicado}`} target="_blank">Localização</a>
        {children}
    </div>
}