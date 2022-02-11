import React from 'react';
import { TextField } from '@UiKitComponents';
import { Title, TUpdateTitle, TCreateTitle } from '@Types/title.types';
import { HeaderSaveAction, InputContainer } from '@components';
import { useDispatch } from 'react-redux';
import { updateTitle } from '@Actions/title.action';
import { schemaTitle } from '@schema/title';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface EditProps {
  currentTitle: Title;
  backToPreview: (modeEdit: boolean) => void;
}

const Edit: React.FC<EditProps> = (props) => {
  const { currentTitle, backToPreview } = props;
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TCreateTitle>({
    resolver: yupResolver(schemaTitle),
  });

  const onSubmit = (title: TCreateTitle) => {
    const newTitle: TUpdateTitle = {
      ...title,
      userTitleId: currentTitle.userTitleId,
    };
    dispatch(updateTitle(newTitle));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderSaveAction
        title={currentTitle.title}
        errors={errors}
        onCancelButton={backToPreview}
      />
      <div className="form_box">
        <InputContainer>
          <TextField
            errorText={errors.userTitleCode?.message}
            id="TitleCode"
            placeholder="Title Code"
            label="Title Code"
            defaultValue={currentTitle.userTitleCode}
            isActive
            required
            {...register('userTitleCode')}
          />
          <TextField
            errorText={errors.title?.message}
            id="Title"
            placeholder="Title"
            label="Title"
            defaultValue={currentTitle.title}
            isActive
            required
            {...register('title')}
          />
        </InputContainer>
      </div>
    </form>
  );
};
export default Edit;
