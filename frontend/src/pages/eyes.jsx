import Eyes from '../components/eyes'
import {Center} from "@chakra-ui/react";
import {NextSeo} from "next-seo";


export default function PageEyes() {
    return (
        <>
            <NextSeo title="Eyes classifier" />
            <Center>
                <Eyes/>
            </Center>
        </>
    )
}
