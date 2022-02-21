import { ApplicationActions } from '@Types/application.types';
import { CompanyActions } from '@Types/company.types';
import { DefinitionActions } from '@Types/definition.types';
import { VendorActions } from '@Types/vendor.types';
import { ContractActions } from '@Types/contract.types';
import { CurrencyActions } from '@Types/currency.type';
import { CostCenterActions } from '@Types/costCenters.type';
import { CheckFactorActions } from '@Types/checkFactors.type';

export type ActionsTypes =
  | ApplicationActions
  | CompanyActions
  | DefinitionActions
  | VendorActions
  | ContractActions
  | CurrencyActions
  | CostCenterActions
  | CheckFactorActions;
