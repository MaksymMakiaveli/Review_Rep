import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetOneSite } from '@Actions/site.action';
import { RootState } from '@RootStateType';
import { Loader } from '@common';
import { useToggle } from '@hooks';
import Preview from '@pages/properties/sites/EditSite/Preview';
import Edit from '@pages/properties/sites/EditSite/Edit';

type SiteParams = {
  LocationID: string;
};

interface EditSiteProps {}

const getSiteState = (state: RootState) => state.SiteReducer;

const EditSite: React.FC<EditSiteProps> = () => {
  const params = useParams<SiteParams>();
  const dispatch = useDispatch();
  const [modeEdit, setModeEdit] = useToggle();  

  const { currentSite, loadingSite } = useSelector(getSiteState);
  const siteID = params.LocationID ? params.LocationID : '';

  useEffect(() => {
    dispatch(GetOneSite(siteID));
  }, []);

  if (loadingSite || !currentSite) {
    return <Loader />;
  }

  return (
    <div>
      <div className="padding_wrapper_page">
        {modeEdit ? (
          <Edit currentSite={currentSite} backToPreview={setModeEdit} />
        ) : (
          <Preview currentSite={currentSite} openEditPage={setModeEdit} />
        )}
      </div>
    </div>
  );
};

export default EditSite;