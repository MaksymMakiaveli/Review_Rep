import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import './FileInput.scss';
import { FileInputProps } from './FileInput.type';

const FileInput = <FieldType,>(props: FileInputProps<FieldType>) => {
  const { ...rest } = props;
  const [files, setFiles] = useState<FileList>();
  console.log('fileState', files);

  return (
    <div className="custom_file_input">
      <label htmlFor="uploadFile">Upload a contract</label>
      <Controller
        {...rest}
        render={({ field: { ref, onChange } }) => (
          <input
            multiple
            type="file"
            id="uploadFile"
            ref={ref}
            onChange={(value) => {
              setFiles(value.target.files as FileList);
              onChange(value);
            }}
          />
        )}
      />
    </div>
  );
};

export default FileInput;
