import React from 'react';
import {
    Box,
    Grid,
} from '@chakra-ui/react'

import ImageCard from '../ImageCard';

function ImageGrid(image) {
    const data = {
        ...image.image
    }
    return (
        <Box w="100%" display="flex" alignItems="center" justifyContent="space-between">
            <Grid w="100%" templateColumns='repeat(2, 1fr)' gap={6}>
              <ImageCard imageData={{
                base64Image: data.base64Image,
                caption: 'Original Image'
              }}></ImageCard>

              <ImageCard imageData={{
                base64Image: data.generatedImage,
                caption: 'AI Generated Image',
                badge: 'DALL-E 2',
              }}></ImageCard>
            </Grid>
          </Box>
    );
}

export default ImageGrid;
