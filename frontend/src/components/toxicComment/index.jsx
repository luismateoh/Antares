import React, {useState} from "react";
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
    FormHelperText,
    Textarea,
    Button, toast,
} from "@chakra-ui/react";
import {toxicCommentService} from "../../services/tc.services";
import PredictionStatistics from "../predictionStatistics";
import {MdDelete} from "react-icons/md";

export default function ToxicComment() {

    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState('');

    const [prediction, setPrediction] = useState(null);

    const [statistics, setStatistics] = useState(null);

    const handleFormChange = (e) => setForm(e.target.value);

    function handleSubmit() {

        setIsLoading(true);

        toxicCommentService.classify(form).then(res => {
            setIsLoading(false);
            setPrediction(res);

            setStatistics(
                <PredictionStatistics
                    prediction={res}
                />
            );

        }).catch(err => {
            setIsLoading(false);
            toast({
                title: 'Error',
                description: 'Something went wrong',
                position: 'top-right',
                status: 'error',
                duration: 4500,
                isClosable: true,
            });
        });

    };


    function eraseForm() {
        setForm('');
        setPrediction(null);
        setStatistics(null);
    }

    return (<>
            <Box p={10} maxW={'1200px'}>
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
                                    Toxic Comments
                                </Heading>
                                <Text
                                    mt={1}
                                    pl={'.5rem'}
                                    fontSize="sm"
                                    fontWeight="normal"
                                    color={useColorModeValue("gray.600", "gray.400")}
                                >
                                    From a large number of Wikipedia comments that have been labeled by human evaluators
                                    for
                                    toxic behavior. A model was built to classify them in the following categories:<br/>
                                    - Toxic <br/>
                                    - Severe toxic <br/>
                                    - Obscene <br/>
                                    - Threat <br/>
                                    - Insult <br/>
                                    - Identity hate <br/>
                                    The model predicts a probability of each type of toxicity for each comment.
                                </Text>
                                <a href="https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge/data">
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
                                method="POST"
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
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color={useColorModeValue("gray.700", "gray.50")}
                                        >
                                            Test the model
                                        </FormLabel>
                                        <FormControl id="comment" mt={1}>
                                            <Textarea
                                                placeholder="This is a comment"
                                                mt={1}
                                                rows={6}
                                                shadow="sm"
                                                focusBorderColor="brand.400"
                                                fontSize={{sm: "sm"}}
                                                onChange={handleFormChange}
                                                value={form}

                                            />
                                            <FormHelperText>
                                                Write a comment to predict its toxicity.
                                            </FormHelperText>
                                        </FormControl>
                                    </div>
                                </Stack>
                                <Box
                                    px={{base: 4, sm: 6}}
                                    py={3}
                                    bg={useColorModeValue("gray.50", "gray.900")}
                                    textAlign="right"
                                >
                                    {form && <>
                                        <Button
                                            type="button"
                                            mr={3}
                                            onClick={eraseForm}

                                        >
                                            <MdDelete/>
                                        </Button>
                                    </>

                                    }

                                    <Button isLoading={isLoading}
                                            type="submit"
                                            fontWeight="md"
                                            colorScheme='blue'
                                            onClick={handleSubmit}
                                    >
                                        Predict
                                    </Button>
                                </Box>
                            </chakra.form>
                        </GridItem>
                    </SimpleGrid>
                </Box>
                {statistics}
            </Box>

        </>

    );
}