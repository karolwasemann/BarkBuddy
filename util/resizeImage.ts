import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const resizeImage = async (uri: string) => {
     try {
       const result = await manipulateAsync(
         uri,
         [{ resize: { width: 400, height: 400 } }],
         { compress: 0.8, format: SaveFormat.JPEG }
       );
       return result.uri;
     } catch (error) {
       console.error('Failed to resize image', error);
     }
   };