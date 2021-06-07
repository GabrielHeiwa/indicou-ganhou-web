const Knex = require("knex");

exports.up = async function (knex) {
    return knex.schema.createTable("indications", table => {
        table.uuid("indications_uuid");
        table.string("indications_nome_do_indicador");
        table.string("indications_nome_do_indicado");
        table.string("indications_telefone_do_indicado");
        table.text("indications_fatura_do_indicado");
        table.string("indications_longitude_do_indicado");
        table.string("indications_latitude_do_indicado");
        table.string("indications_descricao_do_indicado");
    });
}


exports.down = async function(knex) {
    return knex.schema.dropTable("indications");
}

