import * as yup from 'yup';

export const schemaContract = yup.object({
  name: yup.string().required('This field is required'),
  contractCode: yup.string().required('This field is required'),
  no: yup.string().required('This field is required'),
  price: yup.string().required('This field is required'),
  partnerId: yup.object({
    label: yup.string(),
    value: yup.number().required('This field is required'),
  }),
  currencyId: yup.object({
    label: yup.string(),
    value: yup.number().required(' '),
  }),
  startDate: yup
    .string()
    .required('This field is required')
    .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 'Date must be format 0000-00-00'),
  endDate: yup
    .string()
    .required('This field is required')
    .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 'Date must be format 0000-00-00'),
  description: yup.string().max(150, 'Max length 150 characters'),
});
