import React from "react";
import Router from "next/router";
import {Badge, Box, Center, Image, Stack} from "@chakra-ui/react";

export default function Card(props) {

    function handleClick() {
        Router.push(props.route).then();
    }

    return (
        <>
            <Center>
                <Box
                    maxW={'445px'}
                    w={'300px'}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}
                    onClick={handleClick}
                    _hover={{transform: 'scale(1.05)'}}
                >

                    <Box
                        h={'180px'}
                        bg={'gray.100'}
                        mt={-6}
                        mx={-6}
                        mb={6}
                        pos={'relative'}
                        backgroundImage={'https://source.unsplash.com/' + props.unsplashId}
                        backgroundSize={'cover'}
                    >

                    </Box>
                    <Stack>
                        <Box display='flex' alignItems='baseline' gap={'10px'}>
                            {props.tags.map((tag) => (
                                <Badge

                                    key={tag} borderRadius='3px' px='2' colorScheme='blue'>
                                    {tag}
                                </Badge>
                            ))}

                        </Box>
                        <Box mt='3' fontWeight='semibold' as='h2' fontSize='26px' lineHeight='tight'
                             textAlign='left'>
                            {props.title}
                        </Box>
                    </Stack>
                </Box>
            </Center>

        </>
    );

}

