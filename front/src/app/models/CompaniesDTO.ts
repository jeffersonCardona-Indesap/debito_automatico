export interface CompaniesDTO {
  nombreEmpresa: string,
  nit: number,
  codGrupo: string,
  fechaCorte: Date
}

export interface SearchCompanies{
  searchNombreEmpresa: string,
  searchNit: string,
  searchCodGrupo: string,
  searchFechaCorte: string
}
