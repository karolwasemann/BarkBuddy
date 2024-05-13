import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MediaTypeOptions, ImagePickerResult } from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { User } from 'firebase/auth'; // Assuming User is imported correctly from firebase/auth
import { resizeImage } from '../util/resizeImage';
import { updateUserData } from '../services/user';

type UseImageUploadProps = {
  onUploadSuccess: (url: string) => void;
  user: User | null;
};

export function useImageUpload({ onUploadSuccess, user }: UseImageUploadProps) {
  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Camera roll access is required to pick images.');
      }
    }
  };

  const pickImage = async () => {
    // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (status !== 'granted') {
    //   Alert.alert('Permission denied', 'Camera roll permission is required to pick images.');
    //   return;
    // }

    const result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      await processImage(result.assets[0].uri);
    }
  };

  const processImage = async (uri: string) => {
    try {
      const resizedUri = await resizeImage(uri);
      if (!resizedUri) throw new Error('Failed to resize image');
      await uploadImage(resizedUri);
    } catch (error:any) {
      console.error('Failed to resize image', error);
      Alert.alert('Failed to resize image', error.message);
    }
  };

  const uploadImage = async (uri: string) => {
    if (!user) {
      Alert.alert('Authentication error', 'User not authenticated');
      return;
    }

    try {
      const blob = await uriToBlob(uri);
      const storageRef = ref(storage, `profileImages/${user.uid}.jpg`);
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await updateProfile(user, { photoURL: downloadURL });
      onUploadSuccess(downloadURL);
    } catch (error: any) {
      console.error('Upload failed', error);
      Alert.alert('Upload failed', error.message);
    }
  };

  const uriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    return response.blob();
  };

  const checkImageUrl = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return (
        response.ok && !!response.headers.get('content-type')?.includes('image')
      );
    } catch (error) {
      console.error('Error checking image URL:', error);
      return false;
    }
  };

  return { requestPermissions, pickImage, checkImageUrl };
}
