import * as yup from 'yup';

export const schemaTitle = yup.object({
  userTitleCode: yup
    .string()
    .required('This field is required')
    .max(50, 'Max length 50 characters'),
  title: yup.string().required('This field is required'),
});
