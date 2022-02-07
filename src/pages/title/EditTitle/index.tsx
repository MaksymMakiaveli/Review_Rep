import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetOneTitle } from '@Actions/title.action';
import { RootState } from '@RootStateType';
import { Loader } from '@common';
import { useToggle } from '@hooks';
import Preview from '@pages/title/EditTitle/Preview';
import Edit from '@pages/title/EditTitle/Edit';

type TitleParams = {
  UserTitleID: string;
};

interface EditTitleProps {}

const getTitleState = (state: RootState) => state.TitleReducer;

const EditTitle: React.FC<EditTitleProps> = () => {
  const params = useParams<TitleParams>();
  const dispatch = useDispatch();
  const [modeEdit, setModeEdit] = useToggle();

  const { currentTitle, loadingTitle } = useSelector(getTitleState);
  const userTitleId = params.UserTitleID ? params.UserTitleID : '';
  
  useEffect(() => {
    dispatch(GetOneTitle(userTitleId));
  }, []);

  if (loadingTitle || !currentTitle) {
    return <Loader />;
  }

  return (
    <div>
      <div className="padding_wrapper_page">
        {modeEdit ? (
          <Edit currentTitle={currentTitle} backToPreview={setModeEdit} />
        ) : (
          <Preview currentTitle={currentTitle} openEditPage={setModeEdit} />
        )}
      </div>
    </div>
  );
};

export default EditTitle;
