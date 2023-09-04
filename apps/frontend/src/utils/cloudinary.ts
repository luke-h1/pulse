import getConfig from 'next/config';

interface IUploadImageResponse {
  // eslint-disable-next-line camelcase
  secure_url: string;
}

export default async function uploadImage(
  image: File,
  signature: string,
  timestamp: number,
): Promise<IUploadImageResponse> {
  const { publicRuntimeConfig } = getConfig();
  const url = `https://api.cloudinary.com/v1_1/${publicRuntimeConfig.PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  const formData = new FormData();
  formData.append('file', image);
  formData.append('signature', signature);
  formData.append('timestamp', timestamp.toString());
  formData.append('api_key', publicRuntimeConfig.PUBLIC_CLOUDINARY_KEY);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  return response.json();
}
