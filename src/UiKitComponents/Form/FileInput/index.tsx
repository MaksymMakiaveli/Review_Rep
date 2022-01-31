import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { FileInputProps } from './FileInput.type';
import './FileInput.scss';

const FileInput = <FieldType,>(props: FileInputProps<FieldType>) => {
  const { getFiles, ...rest } = props;

  const [files, setFiles] = useState<File[]>();

  const fileListToArray = (files: FileList) => {
    const arrayFiles: File[] = Object.values(files);
    setFiles(arrayFiles);
    return arrayFiles;
  };

  useEffect(() => {
    if (files) {
      getFiles(files);
    }
  }, [files]);

  return (
    <div className="custom_file_input">
      <label htmlFor="uploadFile">Upload</label>
      <Controller
        {...rest}
        render={({ field: { ref, onChange } }) => (
          <input
            multiple
            type="file"
            id="uploadFile"
            ref={ref}
            onChange={(value) => {
              if(value.target.files) {
                onChange(fileListToArray(value.target.files));
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default FileInput;
