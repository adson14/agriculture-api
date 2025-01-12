import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidDocument(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidDocument',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const docType = (args.object as any)?.doc_type;
          // Valida se doc_type existe e é válido antes de verificar o documento
          if (!['CPF', 'CNPJ'].includes(docType)) {
            return false;
          }

          return DocumentValidator.isValidDocument(value, docType);
        },
        defaultMessage(args: ValidationArguments) {
          const docType = (args.object as any)?.doc_type || 'Tipo desconhecido';
          return `${docType} inválido`;
        },
      },
    });
  };
}

export class DocumentValidator {
  static isValidCPF(cpf: string): boolean {
    // Verifica se o CPF tem exatamente 11 dígitos e é composto apenas por números
    if (!cpf || cpf.length !== 11 || !/^\d+$/.test(cpf)) return false;

    // Verifica se todos os dígitos são iguais (ex.: 11111111111 não é válido)
    if (/^(\d)\1+$/.test(cpf)) return false;

    const digits = cpf.split('').map(Number);

    // Cálculo do primeiro dígito verificador
    const verifier1 = digits
      .slice(0, 9)
      .reduce((sum, digit, index) => sum + digit * (10 - index), 0);
    const calculatedVerifier1 = verifier1 % 11 < 2 ? 0 : 11 - (verifier1 % 11);

    // Verifica o primeiro dígito
    if (calculatedVerifier1 !== digits[9]) return false;

    // Cálculo do segundo dígito verificador
    const verifier2 = digits
      .slice(0, 10)
      .reduce((sum, digit, index) => sum + digit * (11 - index), 0);
    const calculatedVerifier2 = verifier2 % 11 < 2 ? 0 : 11 - (verifier2 % 11);

    // Verifica o segundo dígito
    return calculatedVerifier2 === digits[10];
  }

  static isValidCNPJ(cnpj: string): boolean {
    // Verifica se o CNPJ tem exatamente 14 dígitos e é composto apenas por números
    if (!cnpj || cnpj.length !== 14 || !/^\d+$/.test(cnpj)) return false;

    // Verifica se todos os dígitos são iguais (ex.: 11111111111111 não é válido)
    if (/^(\d)\1+$/.test(cnpj)) return false;

    const digits = cnpj.split('').map(Number);

    // Cálculo do primeiro dígito verificador
    const verifier1 = digits
      .slice(0, 12)
      .reduce(
        (sum, digit, index) =>
          sum + digit * (index < 4 ? 5 - index : 9 - (index - 4)),
        0,
      );
    const calculatedVerifier1 = verifier1 % 11 < 2 ? 0 : 11 - (verifier1 % 11);

    // Verifica o primeiro dígito
    if (calculatedVerifier1 !== digits[12]) return false;

    // Cálculo do segundo dígito verificador
    const verifier2 = digits
      .slice(0, 13)
      .reduce(
        (sum, digit, index) =>
          sum + digit * (index < 5 ? 6 - index : 9 - (index - 5)),
        0,
      );
    const calculatedVerifier2 = verifier2 % 11 < 2 ? 0 : 11 - (verifier2 % 11);

    // Verifica o segundo dígito
    return calculatedVerifier2 === digits[13];
  }

  static isValidDocument(document: string, type: 'CPF' | 'CNPJ'): boolean {
    if (type === 'CPF') {
      return this.isValidCPF(document);
    } else if (type === 'CNPJ') {
      return this.isValidCNPJ(document);
    }
    return false;
  }
}
