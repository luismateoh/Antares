import React, {useCallback, useState} from "react";
import {MdDelete} from 'react-icons/md';
import {
    chakra,
    Box,
    useColorModeValue,
    SimpleGrid,
    GridItem,
    Heading,
    Text,
    Stack,
    FormControl,
    FormLabel,
    Button,
    Flex,
    Icon,
    VisuallyHidden,
    Spinner,
    Img,
    useToast,
} from "@chakra-ui/react";
import {useDropzone} from 'react-dropzone'
import {eyesService} from "../../services/eyes.services";
import PredictionStatistics from "../predictionStatistics";

export default function Eyes() {
    //Toast
    const toast = useToast()

    const [imageLoading, setImageLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [objectURL, setObjectURL] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);

    const [prediction, setPrediction] = useState(null);

    const [statistics, setStatistics] = useState(null);

    function showImage(file) {
        const selectedFile = file;
        if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/jpg') {
            const fSize = selectedFile.size;
            const file = Math.round((fSize / 1024 / 1024));
            if (file >= 10) {
                toast({
                    title: 'Error',
                    description: 'File size is too big (10MB max)',
                    position: 'top-right',
                    status: 'error',
                    duration: 4500,
                    isClosable: true,
                })
            } else {
                setImageLoading(true);
                setImage(selectedFile);
                setObjectURL(URL.createObjectURL(selectedFile));
            }

        } else {
            setImageLoading(false);
            setImage(null);
            toast({
                title: 'Error',
                description: 'Please select an image file',
                status: 'error',
                position: 'top-right',
                duration: 4500,
                isClosable: true,
            })
        }
    }

    //Dropzone
    const onDrop = useCallback(acceptedFiles => {
        showImage(acceptedFiles[0])
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    function handleSubmit(e) {
        e.preventDefault();
        setButtonLoading(true);
        eyesService.classify(image).then((response) => {
            setPrediction(response);
            setButtonLoading(false);
            setStatistics(
                <PredictionStatistics
                    prediction={response}
                />
            );
        }).catch((error) => {
            setButtonLoading(false);
            toast({
                title: 'Error',
                description: 'Something went wrong',
                position: 'top-right',
                status: 'error',
                duration: 4500,
                isClosable: true,
            });
        });

    }

    function eraseImage() {
        setImageLoading(false);
        setObjectURL('');
        setImage(null);
        setStatistics(null);
    }

    return (<Box p={10} maxW={'1200px'}>
        <Box>
            <SimpleGrid
                display={{base: "initial", md: "grid"}}
                columns={{md: 3}}
                spacing={{md: 6}}
                justifyContent={{md: "space-between"}}
                alignItems={{md: "center"}}
            >
                <GridItem colSpan={{md: 1}}>
                    <Box px={[4, 0]}>
                        <Heading fontSize="32px" fontWeight="md" lineHeight="10">
                            Eyes classification
                        </Heading>
                        <Text
                            mt={1}
                            pl={'.5rem'}
                            fontSize="sm"
                            fontWeight="normal"
                            color={useColorModeValue("gray.600", "gray.400")}
                        >

                            This model seeks to determine whether a given image refers to a woman&apos;s or a
                            man&apos;s eye, and thus classify it.
                            <br/>The database contains 11525 images in total, of which 5202 refer to women&apos;s
                            eyes and 6323 to men&apos;s eyes.
                        </Text>
                        <a href="https://www.kaggle.com/datasets/pavelbiz/eyes-rtte">
                            <Button

                                variant="outline"
                                size="sm"
                                mt={4}
                                ml={'0.5rem'}
                            >
                                Download Dataset
                            </Button>
                        </a>

                    </Box>
                </GridItem>
                <GridItem mt={[5, null, 0]} colSpan={{md: 2}}>
                    <chakra.form

                        onSubmit={handleSubmit}
                        shadow="base"
                        rounded={[null, "md"]}
                        overflow={{sm: "hidden"}}
                        maxHeight={'100%'}
                    >
                        <Stack
                            px={4}
                            py={5}
                            bg={useColorModeValue("white", "gray.700")}
                            spacing={6}
                            p={{sm: 6}}
                        >
                            <div>
                                <FormControl id='file'>


                                    <FormLabel
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue("gray.700", "gray.50")}
                                    >
                                        Upload an image of a male or female eye.

                                    </FormLabel>
                                    <Flex
                                        mt={1}
                                        justify="center"
                                        px={6} pt={5}
                                        pb={6}
                                        borderWidth={2}
                                        borderColor={useColorModeValue("gray.300", "gray.500")}
                                        borderStyle="dashed"
                                        rounded="md"
                                        cursor="pointer"
                                        {...getRootProps()}
                                    >
                                        <Stack spacing={1} textAlign="center">
                                            {!image ? (<>
                                                    {!imageLoading ? (<Icon
                                                        mx="auto"
                                                        boxSize={12}
                                                        stroke="currentColor"
                                                        color={"gray.500"}
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </Icon>) : (<Spinner
                                                        mx="auto"
                                                        boxSize={10}
                                                        fill="none"
                                                        p={'1rem'}
                                                        color={"gray.500"}/>)}

                                                    <Flex
                                                        fontSize="sm"
                                                        alignItems="baseline"
                                                    >
                                                        <chakra.label
                                                            htmlFor="file-upload"
                                                            cursor="pointer"
                                                            rounded="md"
                                                            fontSize="md"
                                                            pos="relative"
                                                            color='blue.400'
                                                            _hover={{
                                                                color: "blue.600"
                                                            }}
                                                        >

                                                            <span>Upload a file</span>
                                                            <VisuallyHidden>
                                                                <input {...getInputProps()}
                                                                />
                                                            </VisuallyHidden>
                                                        </chakra.label>
                                                        <Text pl={1}>or drag and drop</Text>
                                                    </Flex>
                                                    <Text
                                                        fontSize="xs"

                                                    >
                                                        PNG or JPG up to 10MB
                                                    </Text>
                                                </>

                                            ) : (<Img
                                                src={objectURL}
                                                alt={"Image"}
                                                maxW="100%"
                                                maxH="300px"
                                            />)}
                                        </Stack>
                                    </Flex>
                                </FormControl>
                            </div>
                        </Stack>
                        <Box
                            px={{base: 4, sm: 6}}
                            py={3}
                            bg={useColorModeValue("gray.50", "gray.900")}
                            textAlign="right"

                        >
                            {image && <>
                                <Button
                                    type="button"
                                    mr={3}
                                    onClick={eraseImage}

                                >
                                    <MdDelete/>
                                </Button>
                            </>

                            }
                            <Button
                                type="submit"
                                fontWeight="md"
                                colorScheme='blue'
                                isLoading={buttonLoading}
                            >
                                Predict
                            </Button>
                        </Box>
                    </chakra.form>
                </GridItem>
            </SimpleGrid>
        </Box>
        {statistics}
    </Box>);
}