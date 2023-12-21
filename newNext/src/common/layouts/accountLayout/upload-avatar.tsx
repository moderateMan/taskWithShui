import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SxProps, Theme, alpha, styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import Iconify from 'src/commonOld/components/iconify';
import Image from 'src/commonOld/components/image';
import { RejectionFiles } from 'src/commonOld/components/upload';
import notify from 'src/common/utils/notify';
import { useFlatInject } from 'src/service';
import { FileType } from 'src/service/model/appStoreModel';

// ----------------------------------------------------------------------

const BoxContent = styled(Box)(({ theme }) => ({
  display: 'flex',
}));
export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export interface UploadProps extends DropzoneOptions {
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
  files?: (File | string)[];
  onUpload?: VoidFunction;
  onRemove?: (file: CustomFile | string) => void;
  onRemoveAll?: VoidFunction;
}

// ----------------------------------------------------------------------

export default function UploadAvatar({
  error,
  file,
  disabled,
  helperText,
  sx,
  ...other
}: UploadProps) {
  const { getUploadUrlAct } = useFlatInject('appStore');
  const { userInfo, userUpdateAct, loading } = useFlatInject('authStore');
  const { metadata } = userInfo || {};
  const { avatar } = metadata || {};
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections, acceptedFiles } =
    useDropzone({
      multiple: false,
      disabled,
      accept: {
        'image/*': [],
      },
      ...other,
    });
  useEffect(() => {
    let file = acceptedFiles[0];
    if (!file) return;
    if (file.size > 8000000) {
      notify.warn('File size is too big');
      return;
    }
    if (!/^image\//.test(file.type)) {
      notify.warn('File type is not supported');
      return;
    }
    getUploadUrlAct({
      content_type: file.type,
      file_name: file.name,
      file_size: file.size,
      id: 0,
      type: FileType.UserAvatar,
      file,
    }).then((res) => {
      userUpdateAct({
        id: userInfo?.id || 0,
        metadata: {
          avatar: res.payload.fileUrl,
        },
      });
    });
  }, [acceptedFiles]);

  const hasFile = !!file;

  const hasError = isDragReject || !!error;

  const imgUrl = typeof file === 'string' ? file : file?.preview;

  const renderPreview = hasFile && (
    <Image
      alt="avatar"
      src={imgUrl}
      sx={{
        width: 1,
        height: 1,
        borderRadius: '50%',
      }}
    />
  );

  const renderPlaceholder = (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={1}
      className="upload-placeholder"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        zIndex: 9,
        borderRadius: '50%',
        position: 'absolute',
        color: 'text.disabled',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
        transition: (theme) =>
          theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.shorter,
          }),
        '&:hover': {
          opacity: 0.72,
        },
        ...(hasError && {
          color: 'error.main',
          bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
        }),
        ...(hasFile && {
          zIndex: 9,
          opacity: 0,
          color: 'common.white',
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.64),
        }),
      }}
    >
      <Iconify icon="solar:camera-add-bold" width={32} />
    </Stack>
  );

  const renderContent = (
    <Box
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
        borderRadius: '50%',
        position: 'relative',
      }}
    >
      {renderPreview}
      {renderPlaceholder}
    </Box>
  );

  return (
    <BoxContent {...getRootProps()}>
      <Box>
        {avatar && <Avatar src={userInfo?.metadata?.avatar} sx={{ width: 90, height: 90 }} />}
        {!avatar && (
          <Box
            sx={{
              p: 1,
              m: 'auto',
              width: 90,
              height: 90,
              cursor: 'pointer',
              overflow: 'hidden',
              borderRadius: '50%',
              border: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
              ...(isDragActive && {
                opacity: 0.72,
              }),
              ...(disabled && {
                opacity: 0.48,
                pointerEvents: 'none',
              }),
              ...(hasError && {
                borderColor: 'error.main',
              }),
              ...(hasFile && {
                ...(hasError && {
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                }),
                '&:hover .upload-placeholder': {
                  opacity: 1,
                },
              }),
              ...sx,
            }}
          >
            <input {...getInputProps()} />
            {renderContent}
          </Box>
        )}
        <RejectionFiles fileRejections={fileRejections} />
      </Box>
      {helperText && helperText}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          typography: 'caption',
          cursor: 'pointer',
          '&:hover': { opacity: 0.72 },
          marginLeft: '20px',
        }}
      >
        <input {...getInputProps()} />
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            typography: 'caption',
            cursor: 'pointer',
            '&:hover': { opacity: 0.72 },
          }}
        >
          <Iconify icon="carbon:edit" sx={{ mr: 1 }} />
          {avatar ? 'Change avatar' : 'Upload avatar'}
        </Stack>
      </Stack>
    </BoxContent>
  );
}
