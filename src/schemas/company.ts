import * as yup from 'yup';

export const schemaCompany = yup.object({
  name: yup.string().required('This field is required'),
  companyCode: yup
    .string()
    .required('This field is required')
    .min(1, 'OneCompany code must be max 4 characters')
    .max(4, 'OneCompany code must be max 4 characters'),
  taxOffice: yup.string(),
  taxNumber: yup
    .string()
    .matches(/^[0-9]*$/, 'TXN must be a number')
    .required('This field is required'),
  cityId: yup.number().required('This field is required'),
  countryId: yup.number().required('This field is required'),
  address: yup.string().required('This field is required'),
  contactName: yup.string().email('Email is not valid'),
  phone: yup.string().max(11, 'Phone must be max 11 characters').required('This field is required'),
});
