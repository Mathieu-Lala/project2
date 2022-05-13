use std::io::Write;

#[derive(Debug, serde::Deserialize, serde::Serialize)]
struct Record {
    code_insee: i64,
    nom_commune: String,
    code_departement: i64,
    dose_rayonnements_telluriques: i64,
    dose_rayonnements_cosmiques: i64,
    dose_radon_maison_individuelle: i64,
    dose_radon_habitat_collectif: i64,
    dose_depots_essais_atmospheriques_et_tchernobyl: i64,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut rdr = csv::ReaderBuilder::new()
        .delimiter(b';')
        .has_headers(false)
        .from_reader(include_str!("../data/communes.csv").as_bytes());

    let data = rdr.deserialize();

    let mut output = vec![];

    for result in data {
        let record: Record = match result {
            Ok(r) => r,
            _ => continue,
        };
        output.push(record);
    }

    let mut file = std::fs::OpenOptions::new()
        .create(true)
        .truncate(true)
        .write(true)
        .open("./communes.json")?;

    file.write_all(serde_json::to_string_pretty(&output)?.as_bytes())?;

    Ok(())
}
