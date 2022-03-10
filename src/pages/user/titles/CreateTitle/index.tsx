import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@RootStateType';
import { TextField } from '@UiKitComponents';
import { TCreateTitle } from '@Types/title.types';
import { postNewTitle } from '@Actions/title.action';
import { Loader } from '@common';
import { HeaderSaveAction, InputContainer } from '@components';
import { useBackHistory } from '@hooks';
import { schemaTitle } from '@schema/title';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface CreateTitleProps {}

const getLoadingTitle = (state: RootState) => state.TitleReducer.loadingTitle;

const CreateTitle: React.FC<CreateTitleProps> = () => {
  const dispatch = useDispatch();
  const backHistory = useBackHistory();
  const loadingTitle = useSelector(getLoadingTitle);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TCreateTitle>({ resolver: yupResolver(schemaTitle) });

  const onSubmit = (title: TCreateTitle) => {
    const newTitle = title;
    dispatch(postNewTitle(newTitle));
  };

  if (loadingTitle) {
    return <Loader />;
  }

  return (
    <div>
      <div className="padding_wrapper_page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderSaveAction title="New Title" errors={errors} onCancelButton={backHistory} />
          <InputContainer>
            <TextField
              errorText={errors.userTitleCode?.message}
              id="TitleCode"
              placeholder="Title Code"
              label="Title Code"
              required
              {...register('userTitleCode')}
            />
            <TextField
              errorText={errors.title?.message}
              id="Title"
              placeholder="Title"
              label="Title"
              required
              {...register('title')}
            />
          </InputContainer>
        </form>
      </div>
    </div>
  );
};

export default memo(CreateTitle);
