import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Iconify } from '../iconify';
import CustomizedDialogs from './cropModal';
import MultiFilePreview from './preview-multi-file';
import SingleFilePreview from './preview-single-file';
import { UploadProps } from './types';
// ----------------------------------------------------------------------
function file2DataUrl(file: File, callback: (res: string | ArrayBuffer | null) => void) {
  var reader = new FileReader();
  reader.onload = function () {
    callback(reader.result);
  };
  reader.readAsDataURL(file); //FileReader对象的方法，可以读取Blob或者File对象的数据，转化为dataURL格式
}

export function UploadDragCrop({
  disabled,
  multiple = false,
  error,
  helperText,
  //
  file,
  onDel,
  onDelete,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onAdd,
  onRemoveAll,
  sx,
  uploadAction,
  ...other
}: UploadProps) {
  const [fileNameList, setFilenameList] = useState<string[]>((files as string[]) || []);
  const [fileList, setFileList] = useState<File[]>([]);
  // 截取图片
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    multiple,
    disabled,
    onDropAccepted: () => {
      document.body.focus();
    },
    onDrop: async (acceptedFiles) => {
      file2DataUrl(acceptedFiles[0], (res) => {
        setPreviewUrl(res as string);
        setFileName(acceptedFiles[0].name);
        setOpen(true);
      });
    },
    ...other,
  });
  const handleOpenChange = (value: boolean) => {
    if (open) {
      setOpen(false);
      setPreviewUrl('');
      setFileName('');
    }
  };
  useEffect(() => {
    files && setFilenameList((files as string[])!);
  }, [files]);
  const hasFile = !!file && !multiple;
  const hasFiles = !!fileList && multiple && !!fileList.length;
  const hasError = isDragReject || !!error;
  const renderPlaceholder = (
    <Stack spacing={3} alignItems="center" justifyContent="center" flexWrap="wrap">
      <Box
        component="img"
        src={'/assets/logo/airbnb_original.svg'}
        sx={{
          width: 52,
          height: 52,
          flexShrink: 0,
          ...sx,
        }}
      />
      <Stack spacing={1} sx={{ textAlign: 'center' }}>
        <Typography sx={{ color: '#919EAB', fontSize: '14px' }}>
          Drag and drop or click to choose files
        </Typography>
      </Stack>
    </Stack>
  );

  const renderSinglePreview = <SingleFilePreview imgUrl={typeof file == 'string' ? file : ''} />;
  const removeSinglePreview = hasFile && onDel && (
    <IconButton
      size="small"
      onClick={() => {
        onDel!?.(file as string);
      }}
      sx={{
        top: 16,
        right: 16,
        zIndex: 9,
        position: 'absolute',
        color: (theme) => alpha(theme.palette.common.white, 0.8),
        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
        },
      }}
    >
      <Iconify icon="mingcute:close-line" width={18} />
    </IconButton>
  );

  const renderMultiPreview = (hasFiles || fileNameList.length > 0) && (
    <>
      <Box sx={{ my: 3 }}>
        <MultiFilePreview
          onRemove={(fileName, index) => {
            if (typeof fileName == 'string') {
              onDel!?.(fileName);
              if (typeof index == 'number') {
                fileNameList.splice(index!, 1);
                fileList.splice(index, 1);
                setFilenameList([...fileNameList]);
                setFileList([...fileList]);
              }
            }
          }}
          fileNameList={fileNameList}
          files={fileList}
        />
      </Box>

      <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
        {onRemoveAll && (
          <Button color="inherit" variant="outlined" size="small" onClick={onRemoveAll}>
            Remove All
          </Button>
        )}
      </Stack>
    </>
  );

  return (
    <Box sx={{ width: 1, position: 'relative', ...sx }}>
      <Box
        {...getRootProps()}
        sx={{
          p: 5,
          outline: 'none',
          borderRadius: 1,
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
          transition: (theme) => theme.transitions.create(['opacity', 'padding']),
          '&:hover': {
            opacity: 0.72,
          },
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
          }),
          ...(hasError && {
            color: 'error.main',
            borderColor: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
          ...(hasFile && {
            padding: '24% 0',
          }),
        }}
      >
        <input {...getInputProps()} />

        {hasFile ? renderSinglePreview : renderPlaceholder}
      </Box>

      {removeSinglePreview}

      {helperText && helperText}
      {renderMultiPreview}
      <CustomizedDialogs
        name={fileName}
        onComplete={async (file) => {
          const newFile = await uploadAction?.(file);
          if (newFile!) {
            onAdd!?.(newFile);
            setFileList([...fileList, file]);
          }
        }}
        src={previewUrl}
        open={open}
        setOpen={handleOpenChange}
      ></CustomizedDialogs>
    </Box>
  );
}
