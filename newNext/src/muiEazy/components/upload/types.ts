import { DropzoneOptions } from 'react-dropzone';
// @mui
import { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export interface UploadProps extends DropzoneOptions {
  isCrop?: boolean;
  fileNameList?: string[];
  files?: (File | string)[];
  error?: boolean;
  sx?: SxProps<Theme>;
  thumbnail?: boolean;
  placeholder?: React.ReactNode;
  helperText?: React.ReactNode;
  disableMultiple?: boolean;
  validateFunc?: (file: File) => [boolean, string];
  onDelete?: VoidFunction;
  onUpload?: VoidFunction;
  onRemove?: (fileName: CustomFile | string, fileIndex?: number) => void;
  onRemoveAll?: VoidFunction;
  uploadAction?: (file: File) => Promise<string>;
  onAdd?: (url: string) => void;
  onDel?: (url: string) => void;
  onOrder?: (fileUrls: string[]) => void;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
}

export interface UploadPropsEx extends DropzoneOptions {
  fileNameList?: string[];
  error?: boolean;
  sx?: SxProps<Theme>;
  thumbnail?: boolean;
  placeholder?: React.ReactNode;
  helperText?: React.ReactNode;
  disableMultiple?: boolean;
  //
  file?: CustomFile | string | null;
  onDelete?: VoidFunction;
  //
  files?: string[];
  onUpload?: VoidFunction;
  onRemove?: (file: CustomFile | string) => void;
  onRemoveAll?: VoidFunction;
  uploadAction?: (file: File) => Promise<string>;
  onAdd?: (url: string) => void;
}
