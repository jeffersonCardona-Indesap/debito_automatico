import { ClientsDTO } from "./ClientsDTO";

const documentTypes = ['cc', 'nit', 'pasaporte', 'another'];
const matriculaTypes = ['1', '2', '3', '4'];
const cuentaBeneficiarioTypes = ['1', '2'];
const estadoCuentaBeneficiarioTypes = ['0', '1', '2', '3'];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}



export const MockClients: ClientsDTO[] = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  tipo_documento: getRandomElement(documentTypes),
  documento: `${index * 1021}`,
  tipo_matricula: getRandomElement(matriculaTypes),
  cuenta_origen: `cuentaOrigen${index + 1}`,
  codigo_banco_beneficiario: `codigoBanco${index + 1}`,
  tipo_id_beneficiario: `tipoIdBeneficiario${index + 1}`,
  id_beneficiario: `idBeneficiario${index + 1}`,
  alias_beneficiario: `aliasBeneficiario${index + 1}`,
  nombre_beneficiario: `nombreBeneficiario${index + 1}`,
  fecha_corte_beneficiario: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  tipo_cuenta_beneficiario: getRandomElement(cuentaBeneficiarioTypes),
  estado_cuenta_beneficiario: getRandomElement(estadoCuentaBeneficiarioTypes),
  cuenta_beneficiario: `cuentaBeneficiario${index + 1}`,
  // Add other properties as needed
}));
