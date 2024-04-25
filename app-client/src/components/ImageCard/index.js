import React from 'react';
import {
    GridItem,
    Text,
    Card,
    CardBody,
    Image,
    Stack,
    Badge,
    Center
} from "@chakra-ui/react"

function ImageCard(imageData) {
    const image = { ...imageData.imageData }
    return (
        <div className="uploader-container">
            <GridItem w='50%' h='auto' justifySelf="center">
                <Card maxW='sm' m={10} maxH='lg' h='lg'>
                    <CardBody>
                        <Image
                            src={`data:image/jpeg;base64,${image.base64Image}`}
                            alt='AI Generated'
                            maxH='sm' h='sm'
                            borderRadius='lg'
                        />
                        <Stack mt='6' spacing='3'>
                            <Center>
                                <Text fontWeight={700}>
                                    {image.caption}
                                    {image.badge && <Badge ml='1' colorScheme='purple' fontSize='0.8em'>
                                        DALL E 2
                                    </Badge>}
                                </Text>
                            </Center>
                        </Stack>
                    </CardBody>
                </Card>
            </GridItem >
        </div>
    );
}

export default ImageCard;
