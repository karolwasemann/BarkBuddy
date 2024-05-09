import React, { useState, useEffect } from 'react';

import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  View,
} from '@gluestack-ui/themed';
import { useAuth } from '../provider/AuthContext';
import { useImageUpload } from '../hooks/useImageUpload';
type Props = {
  onImageUpdate?: (url: string) => void;
};

export const UserPhoto: React.FC<Props> = ({ onImageUpdate }) => {
  const { currentUser } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const { requestPermissions, pickImage, checkImageUrl } = useImageUpload({
    onUploadSuccess: handleUploadSuccess,
    currentUser,
  });

  useEffect(() => {
    requestPermissions();
    checkExistingPhotoUrl();
  }, [currentUser]);

  async function checkExistingPhotoUrl() {
    if (currentUser?.photoURL) {
      const isValid = await checkImageUrl(currentUser.photoURL);
      if (isValid) setImage(currentUser.photoURL);
    }
  }

  function handleUploadSuccess(url: string) {
    setImage(url);
    onImageUpdate?.(url);
  }

  return (
    <View>
      <Avatar size="2xl" borderRadius="$full">
        {image ? (
          <AvatarImage source={{ uri: image }} alt="User image" />
        ) : (
          <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
        )}
      </Avatar>
      <Button
        onPress={() => pickImage()}
        size="md"
        variant="solid"
        action="primary"
      >
        <ButtonText>Edit image</ButtonText>
      </Button>
    </View>
  );
};

export default UserPhoto;
