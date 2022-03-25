import {Center, Container, Wrap, WrapItem} from "@chakra-ui/react";
import {NextSeo} from "next-seo";
import modelCard from '../data/modelsCard.json'
import Card from "../components/card";

const Home = () => (
    <>
        <NextSeo title="Antares"/>
        <Container

            maxW="1200px" py={{base: '12', md: '24'}} px={{base: '0', sm: '8'}}
            h={'90vh'}
        >
            <Center>
                <Wrap
                    spacing={'40px'}
                    mx={'40px'}
                    align='center'
                    justify='center'
                    maxW='1200px'
                    verticalAlign='center'
                >
                    {modelCard.map(card => (
                        <WrapItem key={card.key}>
                            <Card
                                title={card.title}
                                unsplashId={card.unsplashId}
                                tags={card.tags}
                                route={card.route}
                            />
                        </WrapItem>
                    ))}

                </Wrap>


            </Center>
        </Container>

    </>
);

export default Home;
