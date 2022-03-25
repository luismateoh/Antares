import NextLink from "next/link";

import { chakra, HStack, Img} from "@chakra-ui/react";

const Logo = () => (
    <NextLink href="/" passHref>
            <HStack spacing={2}>
                <Img
                    h={"2rem"}
                    src={`/icons/sun.svg`}
                    alt="Sun"
                    maxW="2rem"
                    maxH="2rem"
                />
                <chakra.a userSelect="none" fontSize="2rem" fontWeight="700">
                    ANTARES
                </chakra.a>
            </HStack>
    </NextLink>
);

export default Logo;
