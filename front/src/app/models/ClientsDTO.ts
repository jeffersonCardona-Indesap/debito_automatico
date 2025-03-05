export interface ClientsDTO {
  id: number;
  tipo_documento: string;
  documento: string;
  tipo_matricula: string;
  cuenta_origen: string;
  codigo_banco_beneficiario: string;
  cuenta_beneficiario: string;
  tipo_id_beneficiario: string;
  id_beneficiario: string;
  alias_beneficiario: string;
  nombre_beneficiario: string;
  fecha_corte_beneficiario: Date;
  tipo_cuenta_beneficiario: string;
  estado_cuenta_beneficiario: string;
}


export interface SearchClients {
  searchTipoDocumento: string;
  searchDocumento: string;
  searchTipoMatricula: string;
  searchCuentaOrigen: string;
  searchCodigoBancoBeneficiario: string;
  searchCuentaBeneficiario: string;
  searchTipoIdBeneficiario: string;
  searchIdBeneficiario: string;
  searchAliasBeneficiario: string;
  searchNombreBeneficiario: string;
  searchFechaCorteBeneficiario: string;
  searchTipoCuentaBeneficiario: string;
  searchEstadoCuentaBeneficiario: string;
}

