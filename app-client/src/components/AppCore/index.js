import React, { useState } from 'react';
import {
  Input,
  Button,
  VStack,
  Skeleton,
  Box,
  Text,
  Divider,
  Center
} from '@chakra-ui/react'

import './AppCore.css';
import ImageDescription from '../ImageDescription';
import ImageGrid from '../ImageGrid';
import config from '../../config';
import { getDescriptionFromVision, getImageFromDescription } from '../../service';

function AppCore() {
  const [base64Image, setBase64Image] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchDataRequested, setFetchDataRequested] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result.replace('data:', '').replace(/^.+,/, '');
        setBase64Image(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendImageToAPI = async () => {
    const payload = {
      image: `data:image/jpeg;base64,${base64Image}`,
    };
    setFetchDataRequested(true);
    setLoading(true);
    getDescriptionFromVision(payload, {
      success: function(response) {
        setDescription(response.data.description.message.content);
        sendDescriptionToDALLE(response.data.description.message.content)
        setLoading(false);
      },
      failure: function(error) {
        console.error('API request failed:', error);
        setLoading(false);
      },
    })
  };

  const sendDescriptionToDALLE = async (description) => {
    const payload = { description: description };
    setLoading(true);
    getImageFromDescription(payload, {
      success: function(response) {
        setGeneratedImage(response.data.image.data[0].b64_json);
        setLoading(false);
      },
      failure: function(error) {
        console.error('API request failed:', error);
        setLoading(false);
      },
    })
  };

  const reset = () => {
    setBase64Image('');
    setDescription('');
    setGeneratedImage('');
    setFetchDataRequested(false);
  };

  return (
    <Box className="uploader-container">
      <Text p={30}> {config.APP_DESCRIPTION} </Text>
      <Divider mb={30} />
      {!base64Image && (
        <Box>
          <Input m={30} size='lg' variant='filled' h={300} w={600} placeholder='Basic usage' type="file" accept="image/*" onChange={handleFileChange} />
        </Box>
      )}

      {base64Image && !loading && (
        <VStack>
          <img src={`data:image/jpeg;base64,${base64Image}`} alt="Preview" className="image-preview" />
          <Center>
            <Button m={30} colorScheme='blue' onClick={sendImageToAPI}>Upload Image</Button>
            <Button colorScheme='red' onClick={reset}>Try Again</Button>
          </Center>
        </VStack>
      )}

      {fetchDataRequested && (<>
        <Skeleton m={30} startColor='gray.50' endColor='gray.200' fadeDuration={1} w="90%" isLoaded={!loading}>
          <ImageDescription imageDescription={description}></ImageDescription>
        </Skeleton>

        <Divider />

        <Skeleton m={30} startColor='gray.50' endColor='gray.200' fadeDuration={1} w="90%" isLoaded={generatedImage}>
          <ImageGrid image={{
            base64Image: base64Image,
            generatedImage: generatedImage
          }}></ImageGrid>
        </Skeleton>
      </>)}

    </Box>
  );
}

export default AppCore;
