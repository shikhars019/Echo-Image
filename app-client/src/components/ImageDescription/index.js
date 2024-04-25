import React from 'react';
import {
    Box,
    Badge,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

function ImageDescription(imageDescription) {
    return (
        <Box m={10}>
            <Alert
                status='success'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='200px'
            >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                    Successfully Generated Image Description
                    <Badge ml='1' colorScheme='purple' fontSize='0.8em'>
                        GPT 4 Turbo
                    </Badge>
                </AlertTitle>
                <AlertDescription maxWidth='auto'>
                    {imageDescription.imageDescription}
                </AlertDescription>
            </Alert>
        </Box>
    );
}

export default ImageDescription;
