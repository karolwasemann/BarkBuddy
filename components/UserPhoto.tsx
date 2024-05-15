import React, { useState, useEffect } from 'react';

import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Button,
  ButtonText,
  View,
} from '@gluestack-ui/themed';
import { useImageUpload } from '../hooks/useImageUpload';
import { User } from 'firebase/auth';
type Props = {
  user: User | null;
  onImageUpdate?: (url: string) => void;
};

export const UserPhoto: React.FC<Props> = ({ user, onImageUpdate }) => {
  const [image, setImage] = useState<string | null>(null);
  const { requestPermissions, pickImage, checkImageUrl } = useImageUpload({
    onUploadSuccess: handleUploadSuccess,
    user,
  });

  useEffect(() => {
    requestPermissions();
    checkExistingPhotoUrl();
  }, [user]);

  async function checkExistingPhotoUrl() {
    if (user?.photoURL) {
      const isValid = await checkImageUrl(user.photoURL);
      if (isValid) setImage(user.photoURL);
    }
  }

  function handleUploadSuccess(url: string) {
    setImage(url);
    onImageUpdate?.(url);
  }

  return (
    <View>
      <Box>
        <Avatar size="xl" borderRadius="$full" mb="$1">
          {image ? (
            <AvatarImage source={{ uri: image }} alt="User image" />
          ) : (
            <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
          )}
        </Avatar>
        <Button
          onPress={() => pickImage()}
          size="md"
          variant="link"
          action="primary"
        >
          <ButtonText>Edit image</ButtonText>
        </Button>
      </Box>
    </View>
  );
};

export default UserPhoto;
