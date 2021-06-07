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

    const location = `
    https://www.google.com/maps/place/R.+Jacarta,+1078+-+Bairro+Areias,+Cambori%C3%BA+-+SC,+88345-698/@${latitude_do_indicado},${longitude_do_indicado}z/data=!3m1!4b1!4m5!3m4!1s0x94d8b5ad50f59bb7:0xf7d9d9a192b0e6b9!8m2!3d-27.0335634!4d-48.6694365
    `

    return <div className="indication">
        <p>{nome_do_indicador}</p>
        <p>{nome_do_indicado}</p>
        <p>{telefone_do_indicado}</p>
        <p>{descricao_do_indicado}</p>
        <a href={location} target="_blank">Localização</a>
        {children}
    </div>
}