import React from 'react';

import { PreviewFileProps } from './PreviewFile.type';
import './PreviewFile.scss';

const PreviewFile: React.FC<PreviewFileProps> = (props) => {
  const { nameFile } = props;
  return (
    <div className="previewFile">
      <p className="previewFile__name">{nameFile}</p>
    </div>
  );
};

export default PreviewFile;
