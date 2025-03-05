// export interface TransactionsDTO {
//   cantidadDebitada: number;
//   fechaTransaccion: Date;
//   saldoPendiente: number;
// }

export interface TransactionsDTO {
  messageId: string,
  timestamp: string,
  status: string,
  errors: [],
  errorType: string,
  path: string,
  message: string,
  operationData:{
    trxID: string,
    channel: string,
    requestId_to_reverse: string,
    reverse: boolean,
    date: Date,
    totalAmount: number,
      origin: {
          CustomerName: string,
          CustomerType: string,
          CustomerIdentification: string,
          bankID: string,
          accountType: string,
          accountNumber: string,
      },
      destination:{
          CustomerName: string,
          CustomerType: string,
          CustomerIdentification: string,
          bankID: string,
          accountType: string,
          accountNumber: string,
      }
  }
}


export interface searchParams {
  searchMessageId: string,
  searchTimestamp: string,
  searchStatus: string,
  searchErrors: [],
  searchErrorType: string,
  searchPath: string,
  searchMessage: string,
  searchOPDataTrxID: string,
  searchOPDataChannel: string,
  searchOPDataRequestId_to_reverse: string,
  searchOPDataReverse: string,
  searchOPDataDate: string,
  searchOPDataTotalAmount: string,
  searchOPDataOriginCustomerName: string,
  searchOPDataOriginCustomerType: string,
  searchOPDataOriginIdentification: string,
  searchOPDataOriginBankID: string,
  searchOPDataOriginAccountType: string,
  searchOPDataOriginAccountNumber: string,
  searchOPDataDestinationCustomerName: string,
  searchOPDataDestinationCustomerType: string,
  searchOPDataDestinationIdentification: string,
  searchOPDataDestinationBankID: string,
  searchOPDataDestinationAccountType: string,
  searchOPDataDestinationAccountNumber: string,
}
